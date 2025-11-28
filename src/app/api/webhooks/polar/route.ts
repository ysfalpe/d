import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Missing POLAR_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let event;
  try {
    // Webhook signature verification using Polar SDK
    event = validateEvent(
      bodyText,
      Object.fromEntries(req.headers.entries()),
      webhookSecret
    );
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }
    console.error('Webhook parsing error:', err);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { type, data } = event;
  console.log('Polar Webhook Event:', type);

  try {
    // Helper: metadata'dan userId'yi güvenli şekilde al
    const getUserIdFromMetadata = (metadata: Record<string, unknown> | undefined): string | null => {
      if (!metadata) return null;
      const userId = metadata.userId;
      if (typeof userId === 'string') return userId;
      return null;
    };

    // --- Subscription Events ---
    if (type === 'subscription.created' || type === 'subscription.active') {
        const userId = getUserIdFromMetadata(data.metadata as Record<string, unknown>);
        
        if (userId) {
            console.log(`Upgrading user ${userId} to Pro`);
            await db.user.update({
                where: { id: userId },
                data: { 
                    isPro: true,
                    polarSubscriptionId: data.id,
                    polarCustomerId: data.customerId
                }
            });
        } else {
            console.warn('No userId found in webhook metadata');
        }
    }

    // --- Revocation Events ---
    if (type === 'subscription.revoked' || type === 'subscription.canceled') {
        // Note: 'canceled' usually means "will end at period end".
        // 'revoked' means access should stop NOW (e.g. refund or payment fail).
        
        if (type === 'subscription.revoked') {
             const userId = getUserIdFromMetadata(data.metadata as Record<string, unknown>);
             if (userId) {
                console.log(`Downgrading user ${userId}`);
                await db.user.update({
                    where: { id: userId },
                    data: { isPro: false }
                });
             }
        }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

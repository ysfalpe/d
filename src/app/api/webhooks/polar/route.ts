import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  // Production'da minimal loglama
  const isDev = process.env.NODE_ENV === 'development';
  if (isDev) {
    console.log('=== POLAR WEBHOOK RECEIVED ===');
  }

  if (!webhookSecret) {
    console.error('Missing POLAR_WEBHOOK_SECRET');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  let event;
  try {
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
  
  // Production'da sadece event type logla
  if (isDev) {
    console.log('Webhook Event Type:', type);
    console.log('Webhook Data:', JSON.stringify(data, null, 2));
  } else {
    console.log('Webhook:', type);
  }

  try {
    // Helper: metadata'dan userId'yi güvenli şekilde al
    const getUserIdFromMetadata = (obj: any): string | null => {
      // Farklı yerlerde olabilir
      const metadata = obj?.metadata || obj?.checkout?.metadata || obj?.order?.metadata;
      if (!metadata) {
        console.log('No metadata found in:', Object.keys(obj || {}));
        return null;
      }
      const userId = metadata.userId || metadata.user_id;
      if (isDev) console.log('Found userId:', userId);
      return typeof userId === 'string' ? userId : null;
    };

    // Helper: Kullanıcıyı Pro yap
    const upgradeUser = async (userId: string, subscriptionId?: string, customerId?: string) => {
      if (isDev) console.log(`Upgrading user ${userId} to Pro`);
      
      // Önce kullanıcı var mı kontrol et
      const existingUser = await db.user.findUnique({ where: { id: userId } });
      
      if (existingUser) {
        await db.user.update({
          where: { id: userId },
          data: { 
            isPro: true,
            polarSubscriptionId: subscriptionId || existingUser.polarSubscriptionId,
            polarCustomerId: customerId || existingUser.polarCustomerId
          }
        });
        if (isDev) console.log(`User ${userId} upgraded successfully`);
      } else {
        // Kullanıcı yoksa oluştur
        await db.user.create({
          data: {
            id: userId,
            email: `${userId}@polar-webhook.com`,
            isPro: true,
            credits: 0,
            polarSubscriptionId: subscriptionId,
            polarCustomerId: customerId
          }
        });
        if (isDev) console.log(`User ${userId} created and upgraded`);
      }
    };

    // === SUBSCRIPTION EVENTS ===
    if (type === 'subscription.created' || type === 'subscription.active' || type === 'subscription.updated') {
      const userId = getUserIdFromMetadata(data);
      if (userId) {
        await upgradeUser(userId, data.id, data.customerId);
      } else {
        console.warn('subscription event: No userId in metadata');
      }
    }

    // === CHECKOUT EVENTS ===
    if (type === 'checkout.created' || type === 'checkout.updated') {
      if (isDev) console.log('Checkout event - waiting for completion');
    }

    // === ORDER EVENTS (One-time payments) ===
    if (type === 'order.created') {
      const userId = getUserIdFromMetadata(data);
      const orderData = data as any;
      if (userId) {
        await upgradeUser(userId, orderData.id, orderData.customerId || orderData.customer_id);
      } else {
        console.warn('order event: No userId in metadata');
      }
    }


    // === REVOCATION EVENTS ===
    if (type === 'subscription.revoked' || type === 'subscription.canceled') {
      if (type === 'subscription.revoked') {
        const userId = getUserIdFromMetadata(data);
        if (userId) {
          if (isDev) console.log(`Downgrading user ${userId}`);
          await db.user.update({
            where: { id: userId },
            data: { isPro: false }
          });
        }
      }
    }

    if (isDev) console.log('=== WEBHOOK PROCESSED SUCCESSFULLY ===');
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

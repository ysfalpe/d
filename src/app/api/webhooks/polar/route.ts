import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  console.log('=== POLAR WEBHOOK RECEIVED ===');
  console.log('Body:', bodyText.substring(0, 500)); // İlk 500 karakter

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
  
  // DETAYLI LOGLAMA
  console.log('=== WEBHOOK EVENT ===');
  console.log('Type:', type);
  console.log('Data:', JSON.stringify(data, null, 2));

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
      console.log('Found userId:', userId);
      return typeof userId === 'string' ? userId : null;
    };

    // Helper: Kullanıcıyı Pro yap
    const upgradeUser = async (userId: string, subscriptionId?: string, customerId?: string) => {
      console.log(`Upgrading user ${userId} to Pro`);
      
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
        console.log(`User ${userId} upgraded successfully`);
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
        console.log(`User ${userId} created and upgraded`);
      }
    };

    // === SUBSCRIPTION EVENTS ===
    if (type === 'subscription.created' || type === 'subscription.active' || type === 'subscription.updated') {
      const userId = getUserIdFromMetadata(data);
      if (userId) {
        await upgradeUser(userId, data.id, data.customerId || data.customer_id);
      } else {
        console.warn('subscription event: No userId in metadata');
      }
    }

    // === CHECKOUT EVENTS ===
    if (type === 'checkout.created' || type === 'checkout.updated') {
      console.log('Checkout event - waiting for completion');
    }

    // === ORDER EVENTS (One-time payments) ===
    if (type === 'order.created' || type === 'order.paid') {
      const userId = getUserIdFromMetadata(data);
      if (userId) {
        await upgradeUser(userId, data.id, data.customerId || data.customer_id);
      } else {
        console.warn('order event: No userId in metadata');
      }
    }

    // === PAYMENT EVENTS ===
    if (type === 'payment.created' || type === 'payment.updated') {
      console.log('Payment event received');
      const userId = getUserIdFromMetadata(data);
      if (userId && data.status === 'succeeded') {
        await upgradeUser(userId);
      }
    }

    // === REVOCATION EVENTS ===
    if (type === 'subscription.revoked' || type === 'subscription.canceled') {
      if (type === 'subscription.revoked') {
        const userId = getUserIdFromMetadata(data);
        if (userId) {
          console.log(`Downgrading user ${userId}`);
          await db.user.update({
            where: { id: userId },
            data: { isPro: false }
          });
        }
      }
    }

    console.log('=== WEBHOOK PROCESSED SUCCESSFULLY ===');
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

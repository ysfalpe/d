'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_API_URL = process.env.POLAR_SERVER === 'sandbox' 
    ? 'https://sandbox-api.polar.sh/v1' 
    : 'https://api.polar.sh/v1';

export interface SubscriptionInfo {
  isPro: boolean;
  subscriptionId: string | null;
  customerId: string | null;
  credits: number;
}

// Abonelik bilgilerini getir
export async function getSubscriptionInfo(): Promise<SubscriptionInfo | null> {
  const { userId } = await auth();

  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      isPro: true,
      polarSubscriptionId: true,
      polarCustomerId: true,
      credits: true
    }
  });

  if (!user) return null;

  return {
    isPro: user.isPro,
    subscriptionId: user.polarSubscriptionId,
    customerId: user.polarCustomerId,
    credits: user.credits
  };
}

// Üyeliği iptal et
export async function cancelSubscription(): Promise<{ success: boolean; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      isPro: true,
      polarSubscriptionId: true
    }
  });

  if (!user) {
    return { success: false, error: 'User not found' };
  }

  if (!user.isPro || !user.polarSubscriptionId) {
    return { success: false, error: 'No active subscription' };
  }

  if (!POLAR_ACCESS_TOKEN) {
    return { success: false, error: 'Server configuration error' };
  }

  try {
    // Polar API ile subscription iptal et
    // DELETE /v1/subscriptions/{id} veya POST /v1/subscriptions/{id}/cancel
    const response = await fetch(
      `${POLAR_API_URL}/subscriptions/${user.polarSubscriptionId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // Bazı API'ler 204 No Content döner
      if (response.status !== 204) {
        const errorText = await response.text();
        console.error('Polar Cancel Error:', errorText);
        
        // Alternatif endpoint dene
        const altResponse = await fetch(
          `${POLAR_API_URL}/subscriptions/${user.polarSubscriptionId}/cancel`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!altResponse.ok && altResponse.status !== 204) {
          return { success: false, error: 'Failed to cancel subscription' };
        }
      }
    }

    // Veritabanında Pro durumunu kaldır
    // Not: Genellikle bu webhook ile yapılır, ama immediate feedback için burada da yapıyoruz
    await db.user.update({
      where: { id: userId },
      data: {
        isPro: false,
        // Subscription ID'yi tutuyoruz çünkü geçmiş kayıt olarak kalabilir
      }
    });

    return { success: true };

  } catch (error) {
    console.error('Cancel Subscription Error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

// Polar Customer Portal URL'i al (kullanıcı kendi aboneliğini yönetebilir)
export async function getCustomerPortalUrl(): Promise<{ url: string | null; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { url: null, error: 'Not authenticated' };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      polarCustomerId: true
    }
  });

  if (!user?.polarCustomerId) {
    return { url: null, error: 'No customer record found' };
  }

  // Polar'ın customer portal URL'i
  // Not: Bu URL Polar dashboard'dan alınmalı veya API ile oluşturulmalı
  const portalUrl = `https://polar.sh/purchases/subscriptions`;
  
  return { url: portalUrl };
}


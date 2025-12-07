'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

export async function getUserSubscription() {
  noStore(); // Disable caching - always fetch fresh data
  
  const { userId } = await auth();

  if (!userId) return null;

  // Veritabanından kullanıcıyı bul
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { 
        isPro: true,
        credits: true
    }
  });

  // Eğer kullanıcı veritabanında yoksa (ilk giriş), oluşturalım
  if (!user) {
    // Clerk'ten gerçek email al
    const clerkUser = await currentUser();
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress || `${userId}@placeholder.com`;

    await db.user.create({
        data: {
            id: userId,
            email,
            isPro: false,
            credits: 0
        }
    });
    return { isPro: false, credits: 0 };
  }

  return user;
}

// Kredi kullan (AI generation için)
export async function useCredit(): Promise<{ success: boolean; remaining: number; error?: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, remaining: 0, error: 'Not authenticated' };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isPro: true, credits: true }
  });

  if (!user) {
    return { success: false, remaining: 0, error: 'User not found' };
  }

  // Pro kullanıcılar sınırsız
  if (user.isPro) {
    return { success: true, remaining: -1 }; // -1 = unlimited
  }

  // Kredi kontrolü
  if (user.credits <= 0) {
    return { success: false, remaining: 0, error: 'No credits remaining' };
  }

  // Krediyi düşür
  const updated = await db.user.update({
    where: { id: userId },
    data: { credits: { decrement: 1 } },
    select: { credits: true }
  });

  return { success: true, remaining: updated.credits };
}

// Kredi durumunu kontrol et (UI için)
export async function checkCredits(): Promise<{ canGenerate: boolean; credits: number; isPro: boolean }> {
  noStore(); // Disable caching - always fetch fresh data
  
  const { userId } = await auth();

  if (!userId) {
    return { canGenerate: false, credits: 0, isPro: false };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { isPro: true, credits: true }
  });

  if (!user) {
    return { canGenerate: false, credits: 0, isPro: false };
  }

  return {
    canGenerate: user.isPro || user.credits > 0,
    credits: user.credits,
    isPro: user.isPro
  };
}


'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_PRODUCT_ID = process.env.POLAR_PRODUCT_ID;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://d-sigma-five.vercel.app';
const POLAR_API_URL = process.env.POLAR_SERVER === 'sandbox' 
    ? 'https://sandbox-api.polar.sh/v1' 
    : 'https://api.polar.sh/v1';

export async function createCheckoutAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  if (!POLAR_ACCESS_TOKEN || !POLAR_PRODUCT_ID) {
    throw new Error('Missing Polar configuration');
  }

  let checkoutUrl: string | null = null;

  try {
    const response = await fetch(`${POLAR_API_URL}/checkouts/custom/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: POLAR_PRODUCT_ID,
        success_url: `${APP_URL}/editor?success=true`,
        metadata: {
          userId: userId,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Polar API Error:', errorText);
      throw new Error(`Polar API Error: ${response.statusText}`);
    }

    const data = await response.json();
    checkoutUrl = data.url;

  } catch (error) {
    // Re-throw redirect errors (Next.js internal)
    if (isRedirectError(error)) {
      throw error;
    }
    
    console.error('Checkout Creation Failed:', error);
    throw error;
  }

  // Redirect OUTSIDE try-catch to avoid catching the redirect error
  if (checkoutUrl) {
    redirect(checkoutUrl);
  } else {
    throw new Error('No checkout URL returned');
  }
}

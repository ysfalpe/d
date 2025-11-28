'use server';

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;
const POLAR_API_URL = process.env.POLAR_SERVER === 'sandbox' 
    ? 'https://sandbox-api.polar.sh/v1' 
    : 'https://api.polar.sh/v1';

export async function createCheckoutAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  if (!POLAR_ACCESS_TOKEN) {
    throw new Error('Missing Polar Access Token');
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
        product_id: '60c91b2c-daad-42be-83ec-8951215db507',
        success_url: 'https://d-sigma-five.vercel.app/editor?success=true',
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

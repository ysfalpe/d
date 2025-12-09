import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import { CookieConsent } from "@/components/ui/CookieConsent";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shotsy - Create Stunning App Store Screenshots",
  description: "Generate professional App Store and Play Store screenshots in seconds with AI. Upload your screenshots, let AI create marketing captions, and download in all required sizes.",
  keywords: ["app store screenshots", "play store screenshots", "ASO", "app marketing", "AI screenshot generator"],
  authors: [{ name: "Shotsy" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Shotsy - Create Stunning App Store Screenshots",
    description: "Generate professional App Store and Play Store screenshots in seconds with AI.",
    url: "https://shotsy.org",
    siteName: "Shotsy",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://shotsy.org/twitterimage.png",
        width: 1200,
        height: 628,
        alt: "Shotsy - AI App Store Screenshot Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shotsy - Create Stunning App Store Screenshots",
    description: "Generate professional App Store and Play Store screenshots in seconds with AI.",
    images: ["https://shotsy.org/twitterimage.png"],
    creator: "@shotsy",
    site: "@shotsy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/#pricing"
      signUpFallbackRedirectUrl="/#pricing"
    >
      <html lang="en">
        <body className={outfit.variable}>
          {children}
          <CookieConsent />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
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
  openGraph: {
    title: "Shotsy - Create Stunning App Store Screenshots",
    description: "Generate professional App Store and Play Store screenshots in seconds with AI.",
    url: "https://d-sigma-five.vercel.app",
    siteName: "Shotsy",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shotsy - Create Stunning App Store Screenshots",
    description: "Generate professional App Store and Play Store screenshots in seconds with AI.",
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
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.variable}>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

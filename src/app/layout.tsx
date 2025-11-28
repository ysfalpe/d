import type { Metadata } from "next";
import { Outfit } from "next/font/google"; 
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AppShot AI - Create Stunning App Store Screenshots",
  description: "Generate professional App Store and Play Store screenshots in seconds with AI.",
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
        </body>
      </html>
    </ClerkProvider>
  );
}

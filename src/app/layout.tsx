import { ReactNode } from 'react';

import { QueryWrapper } from '@/components/QueryWrapper';

import type { Viewport } from 'next';

import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserContextProvider } from '@/context/UserContext/UserContext';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import { GoogleAnalytics } from '@next/third-parties/google';

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-white overflow-x-hidden">
          <UserProvider>
            <QueryWrapper>
              <UserContextProvider>{children}</UserContextProvider>
            </QueryWrapper>
          </UserProvider>
          <Script
            src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"
            strategy="afterInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js"
            strategy="afterInteractive"
          />
        </body>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
      </html>
    </ClerkProvider>
  );
}

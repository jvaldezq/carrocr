import { ReactNode } from 'react';

import { QueryWrapper } from '@/components/QueryWrapper';
import ServiceWorkerRegistration from '@/components/PWA/ServiceWorkerRegistration';

import type { Viewport, Metadata } from 'next';

import '@/styles/globals.css';
import Script from 'next/script';
import { ClerkProvider } from '@clerk/nextjs';
import { GoogleAnalytics } from '@next/third-parties/google';
import { esES } from '@clerk/localizations';

export const metadata: Metadata = {
  title: 'CarroCR',
  description: 'Tu catálogo de vehículos',
  manifest: '/manifest.json',
  themeColor: '#FFFFFF', // This is for the theme color in general
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'CarroCR',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-192x192.png',
  }
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
  themeColor: '#FFFFFF', // This sets the Android status bar color
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <head>
          <meta name="application-name" content="CarroCR" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="CarroCR" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </head>
        <body className="bg-white overflow-x-hidden">
          <ServiceWorkerRegistration />
          <QueryWrapper>
            {children}
          </QueryWrapper>
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

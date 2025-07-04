import { ReactNode } from 'react';

import type { Viewport } from 'next';

import '@/styles/globals.css';
import { Footer } from '@/components/Layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ClientProviders } from '@/context/ClientProviders';
import { Filters } from '@/sections/filters/Filters';
import { Navigation } from '@/sections/navigation/Navigation';
import { Header } from '@/components/Layout/Header';
import { HeaderAnimations } from '@/components/animations/HeaderAnimations';

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClientProviders>
      <Header />
      <HeaderAnimations />
      <Navigation />
      {children}
      <Toaster />
      <Footer />
      <Filters />
    </ClientProviders>
  );
}

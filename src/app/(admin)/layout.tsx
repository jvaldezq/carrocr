import { ReactNode } from 'react';

import type { Viewport } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { Footer } from '@/components/Layout/Footer';

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: 'device-width',
  userScalable: false,
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster />
      <Footer />
    </>
  );
}

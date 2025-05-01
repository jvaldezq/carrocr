import { ReactNode } from 'react';

import { QueryWrapper } from '@/components/QueryWrapper';

import type { Viewport } from 'next';

import '@/styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { UserWrapper } from '@/components/UserWrapper';

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
    <html lang="en">
      <body className="bg-quaternary">
        <UserProvider>
          <QueryWrapper>
            <UserWrapper>{children}</UserWrapper>
          </QueryWrapper>
        </UserProvider>
      </body>
    </html>
  );
}

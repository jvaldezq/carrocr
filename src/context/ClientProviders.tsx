'use client';

import { ReactNode, Suspense } from 'react';
import { CarEntryContextProvider } from '@/context/CarEntryContext/CarEntryContext';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';
import { UserProvider } from '@/context/UserContext';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NuqsAdapter>
        <CarEntryContextProvider>
          <UserProvider>{children}</UserProvider>
        </CarEntryContextProvider>
      </NuqsAdapter>
    </Suspense>
  );
}

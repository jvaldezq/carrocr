'use client';

import { ReactNode, Suspense } from 'react';
import { CarEntryContextProvider } from '@/context/CarEntryContext/CarEntryContext';
import { FavoritesProvider } from '@/context/FavoritesContext/FavoritesContext';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NuqsAdapter>
        <CarEntryContextProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </CarEntryContextProvider>
      </NuqsAdapter>
    </Suspense>
  );
}

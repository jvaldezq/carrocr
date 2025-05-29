'use client';

import { ReactNode, Suspense } from 'react';
import { PreviewContextProvider } from '@/context/PreviewContext/PreviewContext';
import { CarEntryContextProvider } from '@/context/CarEntryContext/CarEntryContext';
import { NuqsAdapter } from 'nuqs/adapters/next/pages';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <NuqsAdapter>
        <PreviewContextProvider>
          <PreviewContextProvider>
            <CarEntryContextProvider>{children}</CarEntryContextProvider>
          </PreviewContextProvider>
        </PreviewContextProvider>
      </NuqsAdapter>
    </Suspense>
  );
}

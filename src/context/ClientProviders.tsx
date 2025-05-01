'use client';

import { ReactNode, Suspense } from 'react';
import { PreviewContextProvider } from '@/context/PreviewContext/PreviewContext';
import { CarEntryContextProvider } from '@/context/CarEntryContext/CarEntryContext';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <PreviewContextProvider>
        <PreviewContextProvider>
          <CarEntryContextProvider>{children}</CarEntryContextProvider>
        </PreviewContextProvider>
      </PreviewContextProvider>
    </Suspense>
  );
}

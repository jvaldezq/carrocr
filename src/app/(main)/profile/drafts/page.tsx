import MyListings from '@/components/MyListings/MyListings';
import { CarsGridSkeleton } from '@/components/Skeletons';
import React, { Suspense } from 'react';

export default function Drafts() {
  return (
    <main className="max-w-screen-xl min-h-[calc(100dvh-450px)] mx-auto px-4 flex flex-col my-8">
      <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
        <h2 className="text-lg font-semibold">
          Mis Anuncios
        </h2>
      </div>
      <Suspense fallback={<CarsGridSkeleton />}>
        <MyListings />
      </Suspense>
    </main>
  );
}

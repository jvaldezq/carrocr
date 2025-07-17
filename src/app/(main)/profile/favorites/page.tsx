import MyFavorites from '@/components/MyFavorites/MyFavorites';
import { CarsGridSkeleton } from '@/components/Skeletons';
import React, { Suspense } from 'react';

export default function Favorites() {
  return (
    <main className="max-w-screen-xl min-h-[calc(100dvh-450px)] mx-auto px-4 flex flex-col my-8">
      <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
          <h2 className="text-lg font-semibold">
            Favoritos
          </h2>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <MyFavorites />
        </Suspense>
    </main>
  );
}

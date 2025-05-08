import { Suspense } from 'react';
import SellerDetails from '@/app/(main)/seller/[id]/SellerDetails';
import { SellerDetailsSkeleton } from '@/app/(main)/seller/[id]/SellerDetailsSkeleton';
import SellerCars from '@/app/(main)/seller/[id]/SellerCars';
import { CarsGridSkeleton } from '@/components/Skeletons';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Seller({ params }: Props) {
  const id = (await params).id;

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <Suspense fallback={<SellerDetailsSkeleton />}>
        <SellerDetails sellerId={id} />
      </Suspense>
      <Suspense fallback={<CarsGridSkeleton />}>
        <SellerCars sellerId={id} />
      </Suspense>
    </main>
  );
}

import { Suspense } from 'react';
import SellerDetails from '@/app/seller/[id]/SellerDetails';
import { CarDetailsSkeleton } from '@/app/car/[id]/CarDetailsSkeleton';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Seller({ params }: Props) {
  const id = (await params).id;
  console.log(id);

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <Suspense fallback={<CarDetailsSkeleton />}>
        <SellerDetails />
      </Suspense>
    </main>
  );
}

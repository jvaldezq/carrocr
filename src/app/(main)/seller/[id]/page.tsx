import { Suspense } from 'react';
import SellerDetails from '@/app/(main)/seller/[id]/SellerDetails';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { SellerDetailsSkeleton } from '@/app/(main)/seller/[id]/SellerDetailsSkeleton';
import SellerCars from '@/app/(main)/seller/[id]/SellerCars';
import { CarsGridSkeleton } from '@/components/Skeletons';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Seller({ params }: Props) {
  const id = (await params).id;

  let accessToken = null;
  try {
    accessToken = await getAccessToken({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      audience: process.env.AUTH0_AUDIENCE || '',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <Suspense fallback={<SellerDetailsSkeleton />}>
        <SellerDetails sellerId={id} token={accessToken?.accessToken || ''} />
      </Suspense>
      <Suspense fallback={<CarsGridSkeleton />}>
        <SellerCars sellerId={id} token={accessToken?.accessToken || ''} />
      </Suspense>
    </main>
  );
}

import { Suspense } from 'react';
import SellerDetails from '@/app/seller/[id]/SellerDetails';
import { CarDetailsSkeleton } from '@/app/car/[id]/CarDetailsSkeleton';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { getUserInfo } from '@/app/seller/service/getUserInfo';

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
  const userInformation = await getUserInfo(accessToken?.accessToken || '', id);
  console.log('userInformation', userInformation);

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <Suspense fallback={<CarDetailsSkeleton />}>
        <SellerDetails />
      </Suspense>
    </main>
  );
}

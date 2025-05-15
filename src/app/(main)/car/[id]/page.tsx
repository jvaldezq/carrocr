import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CarDetailsSkeleton } from './CarDetailsSkeleton';
import CarDetails from '@/app/(main)/car/[id]/CarDetails';
import { fetchCarById } from '@/app/(main)/car/[id]/service/fetchCarById';

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const data = await fetchCarById(id);

  const {
    year,
    make,
    model,
    trim,
    transType,
    condition,
    thumbnail,
    state,
    price,
    mileage,
    mileageType,
  } = data;

  const title = `${year} ${make} ${model} ${trim} en ${state}`;
  const description = `Compra este ${year} ${make} ${model} ${trim}, ${condition}, ${transType}, ${mileage} ${mileageType}, por $${price.toLocaleString()} en ${state}. ¡Haz clic para más detalles!`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://carrocr.com/car/${id}`,
      images: [
        {
          url: thumbnail,
          width: 1200,
          height: 630,
          alt: `${year} ${make} ${model} ${trim}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [thumbnail],
    },
    alternates: {
      canonical: `https://carrocr.com/car/${id}`,
    },
  };
}

export default async function Car({ params }: Props) {
  const id = (await params).id;

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <Suspense fallback={<CarDetailsSkeleton />}>
        <CarDetails id={id} />
      </Suspense>
    </main>
  );
}

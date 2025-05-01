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

  const { year, make, model, trim, transType, condition } = data;
  const title = `${year} ${make} ${model} ${trim} - Transmisión ${transType}, Condición ${condition}`;
  const description = `Descubre este impecable`;

  return { title, description };
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

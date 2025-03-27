import type { Metadata } from 'next';
import { TopCarsSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import ListingCars from '@/app/autos/ListingCars';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title:
    'CarroCR - Compra y Venta de Carros Usados en Costa Rica | Encuentra tu Auto Ideal',
  description:
    'En CarroCR, encuentra la mejor selección de carros usados en Costa Rica. Compra y vende autos de manera fácil, rápida y segura. Filtra por marca, modelo, año, precio y más. ¡Tu próximo auto está a solo un clic de distancia!',
};

const Autos = async (props: Props) => {
  const { searchParams } = props;
  const filters = (await searchParams).filters;
  return (
    <main className="min-h-dvh pt-[60px]">
      <section className="max-w-screen-3xl mx-auto px-2 mt-8">
        <Suspense fallback={<TopCarsSkeleton />}>
          <ListingCars
            filters={JSON.parse(atob(filters as string)) as AutoFiltersType}
          />
        </Suspense>
      </section>
    </main>
  );
};

export default Autos;

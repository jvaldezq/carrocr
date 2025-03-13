'use client';
import Card from '@/components/Card';
import { ArchiveX } from 'lucide-react';
import { useGetUserTempListing } from '@/app/profile/service/getUserTempListings';
import { TopCarsSkeleton } from '@/components/Skeletons';

export const MyCars = () => {
  const { data, isLoading } = useGetUserTempListing([1, 2, 3, 4]);
  console.log(data);

  if (isLoading) {
    return <TopCarsSkeleton />;
  }

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <ArchiveX />
        <h2 className="text-base font-light text-tertiary">
          No tengo anuncios
        </h2>
      </div>
    );

  return (
    <>
      <h2 className="text-2xl font-bold text-tertiary my-8">
        Anuncios del vendedor
      </h2>

      <section className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8 my-5">
        {data?.map((car) => <Card key={car.id} {...car} isTemp={true} />)}
      </section>
    </>
  );
};

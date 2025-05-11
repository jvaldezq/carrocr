'use client';
import Card from '@/components/Card';
import {
  ArchiveX,
  CircleAlert,
  CircleCheck,
  CircleEllipsis,
  CircleX,
} from 'lucide-react';
import { useGetUserTempListing } from '@/app/(main)/profile/service/getUserTempListings';
import { CarsGridSkeleton } from '@/components/Skeletons';
import { APPROVAL_TRANSLATIONS, ListingCounters } from '@/lib/definitions';
import { ReactNode, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

const classNames: { [key: string]: { active: string; inactive: string } } = {
  '1': {
    active:
      'bg-gray-600 text-white shadow-xl font-medium border border-solid border-gray-600',
    inactive: 'border border-solid border-gray-600 text-gray-600 font-light',
  },
  '2': {
    active:
      'bg-warning text-white shadow-xl font-medium border border-solid border-warning',
    inactive: 'border border-solid border-warning text-warning font-light',
  },
  '3': {
    active:
      'bg-error text-white shadow-xl font-medium border border-solid border-error',
    inactive: 'border border-solid border-error text-error font-light',
  },
  '4': {
    active:
      'bg-success text-white shadow-xl font-medium border border-solid border-success',
    inactive: 'border border-solid border-success text-success font-light',
  },
};

const icons: { [key: string]: ReactNode } = {
  '1': <CircleEllipsis className="h-6 w-6" />,
  '2': <CircleAlert className="h-6 w-6" />,
  '3': <CircleX className="h-6 w-6" />,
  '4': <CircleCheck className="h-6 w-6" />,
};

export const MyCars = ({
  listingCounters,
}: {
  listingCounters: ListingCounters;
}) => {
  const [filters, setFilters] = useState([1, 2, 4]);
  const { data, isLoading } = useGetUserTempListing(filters);

  const onClick = useCallback((item: number) => {
    setFilters((prevFilters) =>
      prevFilters.includes(item)
        ? prevFilters.filter((f) => f !== item)
        : [...prevFilters, item],
    );
  }, []);

  return (
    <>
      <div
        className={cn(
          'bg-white',
          'rounded-lg',
          'shadow-md',
          'p-4',
          'gap-4',
          'flex',
          'flex-col',
        )}
      >
        <h2 className="text-2xl font-bold text-tertiary">Mis anuncios</h2>

        <div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-start items-center">
          {APPROVAL_TRANSLATIONS.map((item) => {
            const className = filters.includes(item.id)
              ? classNames[`${item.id}`].active
              : classNames[`${item.id}`].inactive;
            return (
              <div
                key={`listing-status-${item.label}`}
                onClick={() => onClick(item.id)}
                className={cn(
                  className,
                  'sm:w-fit',
                  'w-full',
                  'py-2',
                  'px-4',
                  'min-w-44',
                  'flex',
                  'gap-2',
                  'justify-between',
                  'items-center',
                  'rounded-xl',
                  'cursor-pointer',
                  'transition-all',
                  'duration-300',
                  'hover:shadow-2xl',
                  'hover:scale-105',
                )}
              >
                <div className="flex flex-row gap-2">
                  {icons[item.id]}
                  {item.label}
                </div>
                <p>{listingCounters?.[item.key as keyof ListingCounters]}</p>
              </div>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <CarsGridSkeleton />
      ) : !data || data?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-3 text-tertiary/[0.9] my-6">
          <ArchiveX />
          <h2 className="text-base font-light">No tengo anuncios</h2>
        </div>
      ) : (
        <section className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8 my-5">
          {data?.map((car) => <Card key={car.id} {...car} isTemp={true} />)}
        </section>
      )}
    </>
  );
};

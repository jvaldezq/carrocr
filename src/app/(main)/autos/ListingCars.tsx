import Card from '@/components/Card/Card';
import { getListings } from '@/app/(main)/autos/service/getListings';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';

interface Props {
  filters: AutoFiltersType;
}

export default async function ListingCars(props: Props) {
  const { filters } = props;
  const { data, status } = await getListings(filters);
  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
      {data?.listings?.map((car) => <Card key={car.id} {...car} />)}
    </div>
  );
}

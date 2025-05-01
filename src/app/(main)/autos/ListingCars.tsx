import Card from '@/components/Card';
import { getListings } from '@/app/(main)/autos/service/getListings';
import { AutoFiltersType } from '@/components/Layout/AutoFilters/AutoFilters';

interface Props {
  filters: AutoFiltersType;
}

export default async function ListingCars(props: Props) {
  const { filters } = props;
  const data = await getListings(filters);
  return (
    <div className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
      {data?.listings?.map((car) => <Card key={car.id} {...car} />)}
    </div>
  );
}

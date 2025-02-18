import { fetchTopCars } from '@/components/TopCars/services/getTopCars';
import Card from '@/components/Card';

export default async function TopCars() {
  const data = await fetchTopCars();
  return (
    <div className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
      {data?.map((car) => <Card key={car.id} {...car} />)}
    </div>
  );
}

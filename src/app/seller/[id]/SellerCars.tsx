import { fetchTopCars } from '@/components/TopCars/services/getTopCars';
import Card from '@/components/Card';

export default async function SellerCars() {
  const data = await fetchTopCars();
  return (
    <section className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3">
      {data?.map((car) => <Card key={car.id} {...car} />)}
    </section>
  );
}

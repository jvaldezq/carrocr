import Card from '@/components/Card';
import { getSession } from '@auth0/nextjs-auth0';
import { fetchRecentCars } from '@/components/RecentCars/services/getRecentCars';

export default async function RecentCars() {
  const data = await fetchRecentCars();
  const session = await getSession();

  return (
    <div className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
      {data?.map((car) => (
        <Card key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))}
    </div>
  );
}

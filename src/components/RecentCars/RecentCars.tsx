import { fetchRecentCars } from '@/components/RecentCars/services/getRecentCars';
import { TinyCard } from '@/components/new/TinyCard';
import { auth } from '@clerk/nextjs/server'

export default async function RecentCars() {
  const { data } = await fetchRecentCars();
  const { userId } = await auth()

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {data?.map((car) => (
        <TinyCard key={car.id} isAuth={Boolean(userId)} {...car} />
      ))}
    </div>
  );
}

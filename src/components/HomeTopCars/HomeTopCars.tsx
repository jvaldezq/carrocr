import { fetchRecentCars } from '@/components/RecentCars/services/getRecentCars';
import { BigCard } from '@/components/new/BigCard';
import type { SmallCard } from '@/types/Catalog';
import { auth } from '@clerk/nextjs/server'

export default async function HomeTopCars() {
  const { data } = await fetchRecentCars();
  const { userId } = await auth()

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* {data?.map((car) => (
        <BigCard key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))} */}
      <BigCard isAuth={Boolean(userId)} {...data?.[0] as SmallCard} />
      <BigCard isAuth={Boolean(userId)} {...data?.[1] as SmallCard} />
    </div>
  );
}

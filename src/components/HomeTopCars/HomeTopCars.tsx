import { fetchRecentCars } from '@/components/RecentCars/services/getRecentCars';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';
import { BigCard } from '@/components/new/BigCard';
import type { SmallCard } from '@/types/Catalog';

export default async function HomeTopCars() {
  const { data, status } = await fetchRecentCars();
  // TODO: update with clerk
  // const session = await getSession();
  const session = {
    user: '1',
  };

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
      {/* {data?.map((car) => (
        <BigCard key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))} */}
      <BigCard isAuth={Boolean(session?.user)} {...data?.[0] as SmallCard} />
      <BigCard isAuth={Boolean(session?.user)} {...data?.[1] as SmallCard} />
    </div>
  );
}

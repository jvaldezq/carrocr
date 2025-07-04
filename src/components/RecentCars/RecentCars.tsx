import { fetchRecentCars } from '@/components/RecentCars/services/getRecentCars';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';
import { TinyCard } from '@/components/new/TinyCard';

export default async function RecentCars() {
  const { data, status } = await fetchRecentCars();
  // TODO: update with clerk
  // const session = await getSession();
  const session = {
    user: '1',
  };

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {data?.map((car) => (
        <TinyCard key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))}
    </div>
  );
}

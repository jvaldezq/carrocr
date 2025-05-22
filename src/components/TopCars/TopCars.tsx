import { fetchTopCars } from '@/components/TopCars/services/getTopCars';
import Card from '@/components/Card/Card';
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';

export default async function TopCars() {
  const { data, status } = await fetchTopCars();
  const session = await getSession();

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <div className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8">
      {data?.map((car) => (
        <Card key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))}
    </div>
  );
}

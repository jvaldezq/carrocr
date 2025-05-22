import Card from '@/components/Card/Card';
import { getSession } from '@auth0/nextjs-auth0';
import { fetchVerifiedCarsCars } from '@/components/VerifiedCars/services/getRandomCars';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';

export default async function VerifiedCars() {
  const { data, status } = await fetchVerifiedCarsCars();
  const session = await getSession();

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {data?.map((car) => (
        <Card key={car.id} isAuth={Boolean(session?.user)} {...car} />
      ))}
    </div>
  );
}

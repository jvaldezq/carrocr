import { getSession } from '@auth0/nextjs-auth0';
import { fetchVerifiedCarsCars } from '@/components/VerifiedCars/services/getVerifiedCars';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';
import { MidCard } from '@/components/new/MidCard';
import VerifiedSlider from './VerifiedSlider';
import type { SmallCard } from '@/types/Catalog';

export default async function VerifiedCars() {
  const session = await getSession();
  const { data, status } = await fetchVerifiedCarsCars();

  if (status) redirect(getRedirectPathFromErrorCode(status));


  return (
    <>
      <div className="gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 hidden md:grid">
        {data?.map((car) => (
          <MidCard key={car.id} isAuth={Boolean(session?.user)} {...car} />
        ))}
      </div>
      <VerifiedSlider data={data as SmallCard[]} isAuth={Boolean(session?.user)} />
    </>
  );
}

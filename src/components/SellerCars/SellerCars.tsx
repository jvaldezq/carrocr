import { MidCard } from '@/components/new/MidCard';
import { fetchSellerCars } from './services/getSellerCars';

export default async function SellerCars({ id }: { id: string }) {
  // TODO: update with clerk
  // const session = await getSession();
  const session = {
    user: '1',
  };
  const { data } = await fetchSellerCars(id);

  return (
    <>
      <div className="gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 grid">
        {data?.map((car) => (
          <MidCard key={car.id} isAuth={Boolean(session?.user)} {...car} />
        ))}
      </div>
    </>
  );
}

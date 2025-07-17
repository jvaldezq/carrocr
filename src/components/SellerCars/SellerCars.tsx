import { MidCard } from '@/components/new/MidCard';
import { fetchSellerCars } from './services/getSellerCars';
import { auth } from '@clerk/nextjs/server'

export default async function SellerCars({ id }: { id: string }) {
  const { userId } = await auth()
  const { data } = await fetchSellerCars(id);

  return (
    <>
      <div className="gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 grid">
        {data?.map((car) => (
          <MidCard key={car.id} isAuth={Boolean(userId)} {...car} />
        ))}
      </div>
    </>
  );
}

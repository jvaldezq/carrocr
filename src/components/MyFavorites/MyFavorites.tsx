import { fetchMyFavorites } from '@/components/MyFavorites/services/getMyFavorites';
import { auth } from '@clerk/nextjs/server'
import { MidCard } from '@/components/new/MidCard';

export default async function MyFavorites() {
  const { data } = await fetchMyFavorites();
  const { userId } = await auth()

  return (
    <div className="gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 hidden md:grid">
      {data?.map((car) => (
        <MidCard key={car.id} isAuth={Boolean(userId)} {...car} />
      ))}
    </div>
  );
}

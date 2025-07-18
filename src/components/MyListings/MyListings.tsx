import { getMyListings } from '@/components/MyListings/services/getMyListings';
import { auth } from '@clerk/nextjs/server'
import { MyListingCard } from '../new/MyListingCard';

export default async function MyListings() {
  const { data } = await getMyListings();
  const { userId } = await auth()

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data?.map((car) => (
        <MyListingCard key={car.id} isAuth={Boolean(userId)} {...car} />
      ))}
    </div>
  );
}

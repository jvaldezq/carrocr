import Card from '@/components/Card';
import { getUserListings } from '@/app/(main)/seller/service/getUserListings';
import { ArchiveX } from 'lucide-react';
import { getSession } from '@auth0/nextjs-auth0';

interface Props {
  sellerId: string;
  token: string;
}
export default async function SellerCars(props: Props) {
  const { sellerId, token } = props;
  const session = await getSession();
  const data = await getUserListings(token, sellerId);

  if (!data)
    return (
      <div className="flex flex-col justify-center items-center gap-3 mt-6">
        <ArchiveX />
        <h2 className="text-base font-light text-tertiary">
          El vendedor no tiene anuncios activos
        </h2>
      </div>
    );

  return (
    <>
      <h2 className="text-2xl font-bold text-tertiary my-8">
        Anuncios del vendedor
      </h2>

      <section className="grid gap-y-6 sm:gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grod-cols-8 my-5">
        {data?.map((car) => (
          <Card key={car.id} {...car} isAuth={Boolean(session?.user)} />
        ))}
      </section>
    </>
  );
}

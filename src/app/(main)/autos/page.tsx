import type { Metadata } from 'next';
import { getListings } from './service/getListings';
import { SpecialCard } from '@/components/new/SpecialCard';
import { MidCard } from '@/components/new/MidCard';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title:
    'CarroCR - Compra y Venta de Carros Usados en Costa Rica | Encuentra tu Auto Ideal',
  description:
    'En CarroCR, encuentra la mejor selección de carros usados en Costa Rica. Compra y vende autos de manera fácil, rápida y segura. Filtra por marca, modelo, año, precio y más. ¡Tu próximo auto está a solo un clic de distancia!',
};

const Autos = async (props: Props) => {
  const { searchParams } = props;
  const filters = (await searchParams).filters;
  const { data } = await getListings(filters as unknown);

  return (
    <main className="min-h-dvh pb-8">
      <section className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-4">
        {
          data?.listings?.map((car) => (
            car.premium ? <MidCard key={car.id} {...car} /> : <SpecialCard key={car.id} {...car} />
          ))
        }
      </section>
    </main>
  );
};

export default Autos;

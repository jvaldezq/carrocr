import type { Metadata } from 'next';
import { CarsGridSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import Benefits from '@/components/Benefits';
import Link from 'next/link';
import RecentCars from '@/components/RecentCars/RecentCars';
import VerifiedCars from '@/components/VerifiedCars/VerifiedCars';
import { ArrowRight } from 'lucide-react';
import HomeTopCars from '@/components/HomeTopCars/HomeTopCars';

export const metadata: Metadata = {
  title: 'Carro CR',
  description:
    'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
};

const Home = async () => {
  return (
    <main className="min-h-dvh">
      <section className="max-w-screen-3xl mx-auto px-4 mt-8 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
          <h2 className="text-lg font-semibold">
            Promocionados
          </h2>
          <Link
            href={{
              pathname: '/autos',
              query: { homePromoted: true },
            }}
            className="rounded-lg bg-black p-2 flex items-center gap-2"
          >
            <ArrowRight className='text-white w-5 h-5' />
          </Link>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <HomeTopCars />
        </Suspense>
      </section>

      <section className="max-w-screen-3xl mx-auto px-4 mt-8 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
          <h2 className="text-lg font-semibold">
            Verificados
          </h2>
          <Link
            href={{
              pathname: '/autos',
              query: { acctVerified: true },
            }}
            className="rounded-lg bg-black p-2 flex items-center gap-2"
          >
            <ArrowRight className='text-white w-5 h-5' />
          </Link>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <VerifiedCars />
        </Suspense>
      </section>

      <section className="max-w-screen-3xl mx-auto px-4 mt-8 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
          <h2 className="text-lg font-semibold">
            Recientes
          </h2>
          <Link
            href={{
              pathname: '/autos',
              query: { recent: true },
            }}
            className="rounded-lg bg-black p-2 flex items-center gap-2"
          >
            <ArrowRight className='text-white w-5 h-5' />
          </Link>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <RecentCars />
        </Suspense>
      </section>

      <Benefits />
    </main>
  );
};

export default Home;

import type { Metadata } from 'next';
import { CarsGridSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import Link from 'next/link';
import RecentCars from '@/components/RecentCars/RecentCars';
import VerifiedCars from '@/components/VerifiedCars/VerifiedCars';

export const metadata: Metadata = {
  title: 'Carro CR',
  description:
    'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
};

const Home = async () => {
  return (
    <main className="min-h-dvh pt-[60px]">
      <Hero />
      <section className="max-w-screen-3xl mx-auto px-2 mt-8 flex flex-col">
        <div className="flex justify-between items-center mb-2 w-full">
          <h2 className="text-sm leading-loose font-bold text-tertiary tracking-wide animate-fade-left animate-once animate-duration-500 animate-delay-500 animate-ease-in">
            Recientes
          </h2>
          <Link
            href={{
              pathname: '/autos',
              query: { recent: true },
            }}
            className="text-sm font-bold tracking-widest text-blue-700"
          >
            ver mas
          </Link>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <RecentCars />
        </Suspense>
      </section>

      <section className="max-w-screen-3xl mx-auto px-2 mt-8 flex flex-col">
        <div className="flex justify-between items-center mb-2 w-full">
          <h2
            className="text-
          sm leading-loose font-bold text-tertiary tracking-wide animate-fade-left animate-once animate-duration-500 animate-delay-500 animate-ease-in"
          >
            Verificados
          </h2>
          <Link
            href={{
              pathname: '/autos',
              query: { acctVerified: true },
            }}
            className="text-sm font-bold tracking-widest text-blue-700"
          >
            ver mas
          </Link>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <VerifiedCars />
        </Suspense>
      </section>
      <Benefits />
    </main>
  );
};

export default Home;

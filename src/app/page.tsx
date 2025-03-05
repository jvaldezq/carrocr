import type { Metadata } from 'next';
import { TopCarsSkeleton } from '@/components/Skeletons';
import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Benefits from '@/components/Benefits';
import TopCars from '@/components/TopCars/TopCars';

export const metadata: Metadata = {
  title: 'Carro CR',
  description:
    'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
};

export const revalidate = 0;

const Home = async () => {
  return (
    <main className="min-h-dvh pt-[60px]">
      <Hero />
      <section className="max-w-screen-3xl mx-auto px-2 mt-8">
        <h2 className="text-2xl font-bold text-tertiary mb-8">
          Listados destacados
        </h2>
        <Suspense fallback={<TopCarsSkeleton />}>
          <TopCars />
        </Suspense>
      </section>
      <Benefits />
    </main>
  );
};

export default Home;

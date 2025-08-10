import type { Metadata } from 'next';
import { getListings } from './service/getListings';
import { SpecialCard } from '@/components/new/SpecialCard';
import { MidCard } from '@/components/new/MidCard';
import { Pagination } from '@/components/ui/pagination';

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
  const sp = await props.searchParams;

  // Normalize incoming URL params to API params
  const pageSize = 20;
  const page = Number(sp.page ?? '1') || 1;
  const params: Record<string, unknown> = {
    page,
    pageSize,
  };
  const copyIf = (key: string, targetKey = key) => {
    const val = sp[key];
    if (val !== undefined)
      params[targetKey] = Array.isArray(val) ? val[0] : val;
  };
  // Price and years
  copyIf('minPrice');
  copyIf('maxPrice');
  copyIf('minYear');
  copyIf('maxYear');
  // IDs
  copyIf('makeID');
  copyIf('modelID');
  copyIf('trimID');
  // Strings (comma-separated accepted by backend)
  copyIf('bodyName');
  copyIf('fuelType');
  copyIf('transType');
  copyIf('stateName');
  // Flags
  copyIf('recentListingsOnlyTF');
  copyIf('verifiedAcctsOnlyTF');

  const { data } = await getListings(params);

  return (
    <main className="min-h-dvh pb-8">
      <section className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-4">
        {data?.listings?.map((car) =>
          car.premium ? (
            <MidCard key={car.id} {...car} />
          ) : (
            <SpecialCard key={car.id} {...car} />
          ),
        )}
      </section>
      <section className="max-w-screen-xl mx-auto px-4 mt-8">
        <Pagination
          totalPages={Math.max(
            1,
            Math.ceil((data?.pages?.listings ?? 0) / pageSize),
          )}
          currentPage={page}
          basePath="/autos"
          baseQuery={Object.fromEntries(
            Object.entries(sp)
              .filter(([k]) => k !== 'page')
              .map(([k, v]) => [
                k,
                Array.isArray(v) ? (v[0] ?? '') : (v ?? ''),
              ]),
          )}
        />
      </section>
    </main>
  );
};

export default Autos;

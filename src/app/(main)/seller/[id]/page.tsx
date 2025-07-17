import Image from 'next/image';
import { getUserDataById } from "@/lib/getUserById";
import { tw } from '@/lib/utils';
import { Contact, Mail, Phone } from 'lucide-react';
import { Suspense } from 'react';
import { CarsGridSkeleton } from '@/components/Skeletons';
import SellerCars from '@/components/SellerCars/SellerCars';
import { getUserExternalId } from '../service/getUserExternalId';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Seller({ params }: Props) {
  const id = (await params).id;
  const externalId = await getUserExternalId(id);
  const user = await getUserDataById(externalId?.data ?? '');

  return (
    <main className="max-w-screen-xl mx-auto px-2 mb-8">
      <Image
        src={user?.imageUrl || ''}
        width={80}
        height={80}
        alt={`${user?.firstName} ${user?.lastName}`}
        className={
          tw(
            'my-8',
            'justify-self-center',
            'drop-shadow-2xl',
            'drop-shadow-white',
            'w-[80px]',
            'h-[80px]',
            'rounded-full',
            'object-cover'
          )
        }
      />

      <div className={tw(
        'justify-center',
        'items-center',
        'md:justify-items-center',
        'mt-4',
        'mb-16',
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      )}>

        <div className="flex items-center gap-3">
          <div className="bg-black/5 rounded-xl p-3">
            <Contact className="h-6 w-6 text-black" />
          </div>
          <div>
            <p className="text-sm text-black font-bold">{`${user?.firstName || 'Sin nombre'} ${user?.lastName || 'Sin apellido'}`}</p>
            <p className="text-sm text-black/50">Nombre</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/5 rounded-xl p-3">
            <Mail className="h-6 w-6 text-black" />
          </div>
          <div>
            <p className="text-sm text-black font-bold">{user?.email || 'Sin correo'}</p>
            <p className="text-sm text-black/50">Correo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-black/5 rounded-xl p-3">
            <Phone className="h-6 w-6 text-black" />
          </div>
          <div>
            <p className="text-sm text-black font-bold">{user?.phone || 'Sin telefono'}</p>
            <p className="text-sm text-black/50">Telefono</p>
          </div>
        </div>
      </div>

      <section className="max-w-screen-xl mx-auto px-4 flex flex-col">
        <div className="flex justify-between items-center gap-2 mb-4 py-2 w-full border-b border-dashed border-black/[0.06]">
          <h2 className="text-lg font-semibold">
            Anuncios
          </h2>
        </div>
        <Suspense fallback={<CarsGridSkeleton />}>
          <SellerCars id={id} />
        </Suspense>
      </section>
    </main>
  );
}

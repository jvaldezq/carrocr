'use client';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Details from '@/app/(main)/draft/[id]/Details';
import { useGetDraftById } from '@/app/(main)/draft/[id]/service/useGetDraftById';
import { APPROVAL_STAGE } from '@/lib/definitions';
import { toast } from 'sonner';
import Image from 'next/image';
import DefaultImage from '@/assets/placeholder.webp';

export default function Draft() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useGetDraftById(id);

  // Show toast if approval stage is REVIEW
  useEffect(() => {
    if (data?.approvalStageId === APPROVAL_STAGE.REVIEW) {
      toast.info(
        'El anuncio está en revisión, si realiza cambios automáticamente el anuncio pasara a borrador.',
        {
          duration: Infinity,
          position: 'bottom-center',
          closeButton: true,
        },
      );
    }
  }, [data?.approvalStageId]);

  if (isLoading) {
    return (
      <main className="bg-white">
        <section className="max-w-screen-xl mx-auto px-4 flex flex-col">
          <div className="flex flex-col gap-4 md:flex-row justify-between md:justify-start items-start md:items-center mb-8">
            <div className="animate-pulse bg-gray-200 rounded-lg h-40 w-full md:w-80"></div>
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-white">
        <section className="max-w-screen-xl mx-auto px-4 flex flex-col">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error al cargar el borrador
            </h1>
            <p className="text-gray-600">
              No se pudo cargar la información del vehículo.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const { make, model, trim, year, license, images } = data ?? {};
  const image = images?.imgBodyFL ? images?.imgBodyFL : DefaultImage;

  return (
    <main className="bg-white">
      <section className="max-w-screen-xl mx-auto px-4 flex flex-col">
        <div className="flex flex-col gap-4 md:flex-row justify-between md:justify-start items-start md:items-center mb-8">
          <Image
            src={image}
            alt="Thumbnail"
            width={620}
            height={350}
            className="justify-self-center self-center object-cover rounded-lg h-full w-full md:h-40 md:w-80"
            priority={true}
          />
          <div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-black">
                {make} {model}
              </h1>
              <h1 className="text-2xl font-bold text-black">{trim}</h1>
            </div>
            <p className="text-xl text-black mt-2">{license}</p>
            <p className="text-xl text-black mt-2 font-semibold">{year}</p>
          </div>
        </div>
        <Details car={data} />
      </section>
    </main>
  );
}

'use client';
import { ArrowLeft } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/assets/placeholder.webp';
import { Button } from '@/components/ui/button';
import { useGetListingReviewById } from '@/app/(admin)/admin/approvals/service/useGetListingReviewById';
import { usePutListingSetPublishMutation } from '@/app/(admin)/admin/approvals/service/usePutListingSetPublishMutation';
import { usePutListingSetDenyMutation } from '@/app/(admin)/admin/approvals/service/usePutListingSetDenyMutation';
import { CarImages } from '@/types/User';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

const IMAGE_SECTIONS = {
  exterior: [
    { key: 'imgBodyFL', label: 'Frente Izquierdo' },
    { key: 'imgBodyFC', label: 'Frente Centro' },
    { key: 'imgBodyFR', label: 'Frente Derecho' },
    { key: 'imgBodyRL', label: 'Trasero Izquierdo' },
    { key: 'imgBodyRC', label: 'Trasero Centro' },
    { key: 'imgBodyRR', label: 'Trasero Derecho' },
    { key: 'imgBodySL', label: 'Lateral Izquierdo' },
    { key: 'imgBodySR', label: 'Lateral Derecho' },
  ],
  interior: [
    { key: 'imgInteriorDash', label: 'Tablero' },
    {
      key: 'imgInteriorCluster',
      label: 'Panel de Instrumentos',
      required: false,
    },
    {
      key: 'imgInteriorRadio',
      label: 'Sistema de Infoentretenimiento',
      required: false,
    },
    { key: 'imgInteriorSeatF', label: 'Asientos Delanteros' },
    { key: 'imgInteriorSeatR', label: 'Asientos Traseros' },
    { key: 'imgInteriorTrunk', label: 'Cajuela / Maletero' },
  ],
  mechanical: [{ key: 'imgEngine', label: 'Motor' }],
};

export default function ListingApprovalPage({ params }: Props) {
  const [id, setId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  const { data } = useGetListingReviewById(id);
  const { mutateAsync: handlePublish } = usePutListingSetPublishMutation();
  const { mutateAsync: handleDeny } = usePutListingSetDenyMutation();

  const {
    license,
    year,
    make,
    model,
    trim,
    body,
    state,
    condition,
    inspectionYear,
    currency,
    taxesPaidTF,
    price,
    allowTradeTF,
    negotiableTF,
    mileage,
    mileageType,
    transType,
    transGearCount,
    fuelType,
    driveType,
    engineModifiedTF,
    lP_ConversionTF,
    sellerComment,
    images,
    hasFactoryData,
  } = data || {};

  const handlePublishClick = useCallback(async () => {
    await handlePublish(id);
    router.push('/admin/approvals');
  }, [handlePublish, id, router]);

  const handleDenyClick = useCallback(async () => {
    await handleDeny({ id });
    router.push('/admin/approvals');
  }, [handleDeny, id, router]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <Link
            href="/admin/approvals"
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Volver a aprobaciones</span>
          </Link>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDenyClick}
              className="cursor-pointer"
            >
              Rechazar
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handlePublishClick}
              className="cursor-pointer"
              disabled={!hasFactoryData}
            >
              Aprobar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {!hasFactoryData && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 rounded-lg text-red-700">
            <strong>Atención:</strong> Este listado necesita datos de fábrica
            antes de ser aprobado.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2">
            Información Básica
          </h1>
          <div>
            <p className="text-sm text-gray-600">Placa</p>
            <p className="text-sm text-primary font-bold">{license}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Año</p>
            <p className="text-sm text-primary font-bold">{year}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Marca</p>
            <p className="text-sm text-primary font-bold">{make}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Modelo</p>
            <p className="text-sm text-primary font-bold">{model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Edición</p>
            <p className="text-sm text-primary font-bold">{trim}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Estilo</p>
            <p className="text-sm text-primary font-bold">{body}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Provincia</p>
            <p className="text-sm text-primary font-bold">{state}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Condición</p>
            <p className="text-sm text-primary font-bold">{condition}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Año de próxima revisión técnica
            </p>
            <p className="text-sm text-primary font-bold">{inspectionYear}</p>
          </div>

          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2 mt-8">
            Precio | Intercambio
          </h1>
          <div>
            <p className="text-sm text-gray-600">Moneda</p>
            <p className="text-sm text-primary font-bold">{currency}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Precio</p>
            <p className="text-sm text-primary font-bold">{price}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Está al día</p>
            <p className="text-sm text-primary font-bold">
              {taxesPaidTF ? 'Sí' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Negociable</p>
            <p className="text-sm text-primary font-bold">
              {negotiableTF ? 'Sí' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Recibe o intercambia</p>
            <p className="text-sm text-primary font-bold">
              {allowTradeTF ? 'Sí' : 'No'}
            </p>
          </div>

          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2 mt-8">
            Detalles del Vehículo
          </h1>
          <div>
            <p className="text-sm text-gray-600">Tipo (Km, Millas)</p>
            <p className="text-sm text-primary font-bold">{mileageType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kilometraje</p>
            <p className="text-sm text-primary font-bold">{mileage}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Transmisión</p>
            <p className="text-sm text-primary font-bold">{transType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Número de Marchas</p>
            <p className="text-sm text-primary font-bold">{transGearCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo de combustible</p>
            <p className="text-sm text-primary font-bold">{fuelType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tipo de Tracción</p>
            <p className="text-sm text-primary font-bold">{driveType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Motor Modificado</p>
            <p className="text-sm text-primary font-bold">
              {engineModifiedTF ? 'Sí' : 'No'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Conversión a Gas LP</p>
            <p className="text-sm text-primary font-bold">
              {lP_ConversionTF ? 'Sí' : 'No'}
            </p>
          </div>

          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2 mt-8">
            Comentario del vendedor
          </h1>
          <div className="col-span-full">
            <p className="text-sm text-gray-600">Comentario</p>
            <p className="text-sm text-primary font-bold">{sellerComment}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2">
            Imágenes Exteriores
          </h1>
          {IMAGE_SECTIONS.exterior.map((section) => {
            const key = section.key;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : PlaceholderImage;

            return (
              <div key={section.label} className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {section.label}
                </p>
                {src && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={src}
                      alt={section.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2 mt-8">
            Imágenes Interiores
          </h1>
          {IMAGE_SECTIONS.interior.map((section) => {
            const key = section.key;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : PlaceholderImage;

            return (
              <div key={section.label} className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {section.label}
                </p>
                {src && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={src}
                      alt={section.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}

          <h1 className="font-light tracking-widest text-xl col-span-full border-b border-primary pb-2 mt-8">
            Imágenes Mecánicas
          </h1>
          {IMAGE_SECTIONS.mechanical.map((section) => {
            const key = section.key;
            const src = images?.[key as keyof CarImages]
              ? images?.[key as keyof CarImages]
              : PlaceholderImage;

            return (
              <div key={section.label} className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {section.label}
                </p>
                {src && (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={src}
                      alt={section.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="destructive"
            onClick={handleDenyClick}
            className="cursor-pointer h-12"
          >
            Rechazar
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handlePublishClick}
            className="cursor-pointer h-12"
            disabled={!hasFactoryData}
          >
            Aprobar
          </Button>
        </div>
      </div>
    </div>
  );
}

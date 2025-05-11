'use client';
import { Drawer } from 'vaul';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import React, { CSSProperties, useCallback } from 'react';
import Image from 'next/image';
import PlaceholderImage from '@/assets/placeholder.webp';
import { Button } from '@/components/ui/button';
import { useFetPendingReviewById } from '@/app/(admin)/admin/approvals/service/getPendingReviewById';
import { CarImages } from '@/lib/definitions';
import { useSetPublishMutation } from '@/app/(admin)/admin/approvals/service/setPublish';
import { useSetDenyMutation } from '@/app/(admin)/admin/approvals/service/setDeny';

interface Props {
  id: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

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

export const PendingListingDrawer = (props: Props) => {
  const { drawerOpen, setDrawerOpen, id } = props;
  const { data } = useFetPendingReviewById(id);
  const { mutateAsync: handlePublish } = useSetPublishMutation();
  const { mutateAsync: handleDeny } = useSetDenyMutation();

  const {
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
  } = data || {};

  const handlePublishClick = useCallback(() => {
    handlePublish(id);
  }, [handlePublish, id]);

  const handleDenyClick = useCallback(() => {
    handleDeny(id);
  }, [handleDeny, id]);

  return (
    <Drawer.Root direction="top" open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/35 z-10" />
        <Drawer.Content
          className={cn(
            'top-0',
            'sm:top-1',
            'left-0',
            'right-0',
            'fixed',
            'z-40',
            'outline-none',
            'w-full',
            'md:w-[95%]',
            'h-full',
            'sm:h-[99%]',
            'mx-auto',
            'flex',
          )}
          style={{ '--initial-transform': 'calc(100% + 8px)' } as CSSProperties}
        >
          <div
            className={cn(
              'bg-white',
              'w-full',
              'h-full',
              'sm:h-[99%]',
              'grow',
              'flex',
              'flex-col',
              'sm:rounded-2xl',
              'relative',
              'py-20',
              'overflow-y-scroll',
            )}
          >
            <Drawer.Title
              className={cn(
                'bg-white',
                'flex',
                'items-center',
                'justify-end',
                'gap-2',
                'absolute',
                'w-full',
                'top-0',
                'left-0',
                'px-4',
                'py-3',
                'sm:rounded-t-2xl',
                'text-tertiary',
                'font-light',
                'tracking-wider',
              )}
            >
              <Drawer.Close>
                <CircleX className="h-6 w-6 hover:scale-110 transition duration-300 text-gray-700" />
              </Drawer.Close>
            </Drawer.Title>
            <div className="px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Información Básica
              </h1>
              <div>
                <p className="text-sm">Provincia</p>
                <p className="text-sm text-primary font-bold">{state}</p>
              </div>
              <div>
                <p className="text-sm">Condición</p>
                <p className="text-sm text-primary font-bold">{condition}</p>
              </div>
              <div>
                <p className="text-sm">Año de próxima revisión técnica</p>
                <p className="text-sm text-primary font-bold">
                  {inspectionYear}
                </p>
              </div>
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Precio | Intercambio
              </h1>
              <div>
                <p className="text-sm">Moneda</p>
                <p className="text-sm text-primary font-bold">{currency}</p>
              </div>
              <div>
                <p className="text-sm">Precio</p>
                <p className="text-sm text-primary font-bold">{price}</p>
              </div>
              <div>
                <p className="text-sm">Está al día</p>
                <p className="text-sm text-primary font-bold">{taxesPaidTF}</p>
              </div>
              <div>
                <p className="text-sm">Negociable</p>
                <p className="text-sm text-primary font-bold">{negotiableTF}</p>
              </div>
              <div>
                <p className="text-sm">Recibe o intercambia</p>
                <p className="text-sm text-primary font-bold">{allowTradeTF}</p>
              </div>
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Detalles del Vehículo
              </h1>
              <div>
                <p className="text-sm">Tipo (Km, Millas)</p>
                <p className="text-sm text-primary font-bold">{mileageType}</p>
              </div>
              <div>
                <p className="text-sm">Kilometraje</p>
                <p className="text-sm text-primary font-bold">{mileage}</p>
              </div>
              <div>
                <p className="text-sm">Transmisión</p>
                <p className="text-sm text-primary font-bold">{transType}</p>
              </div>
              <div>
                <p className="text-sm">Número de Marchas</p>
                <p className="text-sm text-primary font-bold">
                  {transGearCount}
                </p>
              </div>
              <div>
                <p className="text-sm">Tipo de combustible</p>
                <p className="text-sm text-primary font-bold">{fuelType}</p>
              </div>
              <div>
                <p className="text-sm">Tipo de Tracción</p>
                <p className="text-sm text-primary font-bold">{driveType}</p>
              </div>
              <div>
                <p className="text-sm">Motor Modificado</p>
                <p className="text-sm text-primary font-bold">
                  {engineModifiedTF}
                </p>
              </div>
              <div>
                <p className="text-sm">Conversión a Gas LP</p>
                <p className="text-sm text-primary font-bold">
                  {lP_ConversionTF}
                </p>
              </div>
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Comentario del vendedor
              </h1>
              <div>
                <p className="text-sm">Comentario</p>
                <p className="text-sm text-primary font-bold">
                  {sellerComment}
                </p>
              </div>
            </div>
            <div className="px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Exterior Images
              </h1>
              {IMAGE_SECTIONS.exterior.map((section) => {
                const key = section.key;
                const src = images?.[key as keyof CarImages]
                  ? images?.[key as keyof CarImages]
                  : PlaceholderImage;

                return (
                  <div key={section.label}>
                    <p className="text-sm text-tertiary self-start">
                      {section.label}
                    </p>
                    {src && (
                      <Image
                        src={src}
                        alt="Uploader"
                        height={500}
                        width={500}
                      />
                    )}
                  </div>
                );
              })}

              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Interior Images
              </h1>
              {IMAGE_SECTIONS.interior.map((section) => {
                const key = section.key;
                const src = images?.[key as keyof CarImages]
                  ? images?.[key as keyof CarImages]
                  : PlaceholderImage;

                return (
                  <div key={section.label}>
                    <p className="text-sm text-tertiary self-start">
                      {section.label}
                    </p>
                    {src && (
                      <Image
                        src={src}
                        alt="Uploader"
                        height={500}
                        width={500}
                      />
                    )}
                  </div>
                );
              })}

              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Mechanical Images
              </h1>

              {IMAGE_SECTIONS.mechanical.map((section) => {
                const key = section.key;
                const src = images?.[key as keyof CarImages]
                  ? images?.[key as keyof CarImages]
                  : PlaceholderImage;

                return (
                  <div key={section.label}>
                    <p className="text-sm text-tertiary self-start">
                      {section.label}
                    </p>
                    {src && (
                      <Image
                        src={src}
                        alt="Uploader"
                        height={500}
                        width={500}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-2 gap-6 px-4">
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
              >
                Aprobar
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

'use client';
import { Carousel } from '@/components/Carousel';
import {
  Activity,
  CircleDollarSign,
  ReceiptText,
  Settings,
} from 'lucide-react';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import Link from 'next/link';
import { usePreview } from '@/context/PreviewContext/PreviewContext';
import type { Preview } from '@/types/Catalog';

export default function CarDialogDetails(props: Preview) {
  const {
    make,
    model,
    thumbnail,
    images,
    year,
    price,
    currency,
    id,
    transType,
    trim,
    condition,
    mileage,
  } = props;
  const { clearId } = usePreview();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const shareUrl = `${window.location.origin}/car/${id}`;
        await navigator.share({
          title: `${make} ${model} ${year}`, // Improved title for sharing
          text: `¡Mira este ${year} - ${make} ${model} que encontré!`,
          url: shareUrl,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col p-4 border-b">
        <h2 className="text-2xl font-bold text-tertiary">
          {make} {model}
          <span className="text-sm font-light ml-1">{year}</span>
        </h2>
        <p className="text-lg text-primary flex gap-2 items-center">{trim}</p>
      </div>

      <Carousel
        images={[thumbnail, ...images]}
        model={model}
        rounded={false}
        showArrows={true}
      />

      {/* Car Details */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-tertiary">
            Detalles del vehículo
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7">
                <ReceiptText className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm">Condición</p>
                <p className="text-sm text-primary font-bold">{condition}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-7">
                <Activity className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm">Kilometraje</p>
                <p className="text-sm text-primary font-bold">
                  {NumberFormatter(mileage)}km
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-7">
                <Settings className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm">Transmisión</p>
                <p className="text-sm text-primary font-bold">{transType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-7 w-7">
                <CircleDollarSign className="h-7 w-7 text-primary" />
              </div>
              <div>
                <p className="text-sm">Precio</p>
                <p className="text-sm text-primary font-bold">
                  {MoneyFormatter(price, currency)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-end justify-end flex-col gap-2">
          <button
            onClick={handleShare}
            className="h-fit w-full border-primary border-solid border text-primary flex gap-2 items-center
                   p-3 rounded-sm text-sm font-bold justify-center justify-self-end self-end"
          >
            Compartir
          </button>
          <Link
            key={id}
            href={`/car/${id}`}
            onClick={clearId}
            className="h-fit w-full border-primary border-solid border text-primary flex gap-2 items-center
                   p-3 rounded-sm text-sm font-bold justify-center justify-self-end self-end"
          >
            Conoce más
          </Link>
        </div>
      </div>
    </div>
  );
}

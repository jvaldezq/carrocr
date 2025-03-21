'use client';
import { Car } from '@/lib/definitions';
import { Carousel } from '@/components/Carousel';
import {
  Activity,
  ArrowRight,
  CircleDollarSign,
  ReceiptText,
  Settings,
} from 'lucide-react';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import Link from 'next/link';
import { usePreview } from '@/context/PreviewContext';

export default function CarDialogDetails(props: Car) {
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

  return (
    <div className="overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col p-4 border-b">
        <h2 className="text-2xl font-bold text-tertiary">
          {make} {model}
          <span className="text-sm font-light">{year}</span>
        </h2>
        <p className="text-lg text-primary flex gap-2 items-center">{trim}</p>
      </div>

      <Carousel
        images={[thumbnail, ...images]}
        model={model}
        rounded={false}
        showDots={true}
      />

      {/* Car Details */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-tertiary">
            Detalles del vehículo
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Condición</p>
                <p className="font-medium">{condition}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Kilometraje</p>
                <p className="font-medium">{NumberFormatter(mileage)} km</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Transmisión</p>
                <p className="font-medium">{transType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-tertiary">Precio</p>
                <p className="font-medium">{MoneyFormatter(price, currency)}</p>
              </div>
            </div>
          </div>
        </div>

        <Link
          key={id}
          href={`/car/${id}`}
          onClick={clearId}
          className="md:w-fit w-full h-fit border-primary border-solid border text-primary flex gap-2 items-center
                   p-3 rounded-lg font-medium justify-center justify-self-end self-end"
        >
          Más detalles
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

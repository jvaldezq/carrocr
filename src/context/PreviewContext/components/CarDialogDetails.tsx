'use client';
import { Car } from '@/types/Car';
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
import { usePreview } from '@/context/PreviewContext/PreviewContext';

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
                  {NumberFormatter(mileage)} km
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

        <Link
          key={id}
          href={`/car/${id}`}
          onClick={clearId}
          className="md:w-fit w-full h-fit border-primary border-solid border text-primary flex gap-2 items-center
                   p-3 rounded-lg text-sm text-primary font-bold justify-center justify-self-end self-end"
        >
          Más detalles
          <ArrowRight className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}

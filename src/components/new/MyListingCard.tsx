import type { SmallCard } from '@/types/Catalog';
import Image from 'next/image';
import DefaultImage from '@/assets/placeholder.webp';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import Link from 'next/link';
import { tw } from '@/lib/utils';
import { Eye, Pencil, Trash } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';

type Props = SmallCard & {
  isTemp?: boolean;
  isAuth?: boolean;
};

export const MyListingCard = (props: Props) => {
  const {
    thumbnail,
    make,
    model,
    price,
    currency,
    year,
    transType = '',
    id,
    trim,
    mileage,
  } = props;
  console.log('Mis Anuncios', props);
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <div className="flex gap-4 p-4 border border-solid border-black/[0.06] rounded-xl items-center card">
      <div className="relative">
        <Image
          src={image}
          alt={`${make} ${model} ${trim}`}
          className={tw(
            'md:min-h-[120px]',
            'min-h-[105px]',
            'md:min-w-[200px]',
            'min-w-[105px]',
            'md:max-h-[120px]',
            'max-h-[105px]',
            'md:max-w-[200px]',
            'max-w-[105px]',
            'object-cover',
            'rounded-xl',
          )}
          width={200}
          height={120}
        />
      </div>
      <div>
        <h3 className="text-md md:text-lg font-semibold text-black text-pretty">
          {`${make} ${model} ${trim}`}
        </h3>
        <p className="text-black/50 text-sm md:text-md">
          {`${transType} · ${year} · ${NumberFormatter(mileage)}km`}
        </p>
        <h2 className="text-md md:text-lg font-bold text-black mt-2">
          {MoneyFormatter(price, currency)}
        </h2>
        <div className="flex gap-2 items-center justify-start col-span-full mt-4">
          <Tooltip tooltipContent={'Ver anuncio'}>
            <Link
              key={`view-${id}`}
              href={`/car/${id}`}
              className="rounded-lg p-2 border border-solid border-black/40 flex items-center"
            >
              <Eye className="w-5 h-5 text-black" />
            </Link>
          </Tooltip>
          <Tooltip tooltipContent={'Editar anuncio'}>
            <Link
              key={`edit-${id}`}
              href={`/draft/${id}`}
              className="rounded-lg p-2 border border-solid border-green-700/40 flex items-center"
            >
              <Pencil className="w-5 h-5 text-green-700" />
            </Link>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

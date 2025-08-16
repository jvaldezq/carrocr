import type { SmallCard } from '@/types/Catalog';
import Image from 'next/image';
import DefaultImage from '@/assets/placeholder.webp';
import { MoneyFormatter, NumberFormatter } from '@/lib/NumberFormats';
import { FavoritesHeart } from '@/components/FavoritesHeart/FavoritesHeart';
import Link from 'next/link';

type Props = SmallCard & {
  isTemp?: boolean;
  isAuth?: boolean;
};

export const BigCard = (props: Props) => {
  const {
    thumbnail,
    make,
    model,
    price,
    currency,
    year,
    transType = '',
    isTemp = false,
    isAuth = false,
    id,
    trim,
    mileage,
    fuelType,
  } = props;
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <Link
      key={`view-${id}`}
      href={`/car/${id}`}
      className="flex flex-col gap-4 p-4 border border-solid border-black/[0.06] rounded-xl card"
    >
      <div>
        <h3 className="text-2xl font-semibold text-black">
          {`${make} ${model} ${trim}`}
        </h3>
        <p className="text-black/50">{`${transType}`}</p>
      </div>
      <div className="relative">
        <Image
          src={image}
          alt={`${make} ${model} ${trim}`}
          className="w-full h-[350px] max-h-[350px] object-cover rounded-xl"
          width={400}
          height={350}
        />
        <p className="absolute top-2 right-2 text-black bg-white p-2 rounded-full text-sm flex items-center drop-shadow-lg z-10 font-semibold">
          {MoneyFormatter(price, currency)}
        </p>
        {!isTemp && isAuth && <FavoritesHeart id={id} />}
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-2">
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-base font-semibold text-black">{year}</h3>
          <p className="text-black/50">Año</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-base font-semibold text-black">{`${NumberFormatter(mileage)}km`}</h3>
          <p className="text-black/50">Kilometraje</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-base font-semibold text-black">
            {fuelType || '-'}
          </h3>
          <p className="text-black/50">Combustible</p>
        </div>
      </div>
    </Link>
  );
};

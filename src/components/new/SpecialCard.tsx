import type { SmallCard } from "@/types/Catalog"
import Image from "next/image"
import DefaultImage from "@/assets/placeholder.webp"
import { MoneyFormatter, NumberFormatter } from "@/lib/NumberFormats"
import { FavoritesHeart } from "@/components/FavoritesHeart/FavoritesHeart";
import Link from 'next/link';
import { tw } from "@/lib/utils";

type Props = SmallCard & {
  isTemp?: boolean;
  isAuth?: boolean;
};

export const SpecialCard = (props: Props) => {
  const { thumbnail, make, model, price, currency, year, transType = '', isTemp = false, isAuth = false, id, trim, mileage } = props
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <Link
      key={`view-${id}`}
      href={`/car/${id}`}
      className="flex gap-4 p-4 border border-solid border-black/[0.06] rounded-xl items-center card">
      <div className="relative">
        <Image
          src={image}
          alt={`${make} ${model} ${trim}`}
          className={tw(
            'md:min-h-[120px]',
            'min-h-[100px]',
            'md:min-w-[200px]',
            'min-w-[100px]',
            'md:max-h-[120px]',
            'max-h-[100px]',
            'md:max-w-[200px]',
            'max-w-[100px]',
            'object-cover',
            'rounded-xl'
          )}
          width={200}
          height={120}
        />
        {!isTemp && isAuth && <FavoritesHeart id={id} />}
      </div>
      <div>
        <h3 className="text-md md:text-lg font-semibold text-black text-pretty">
          {`${make} ${model} ${trim}`}
        </h3>
        <p className="text-black/50 text-sm md:text-md">
          {`${transType} · ${year} · ${NumberFormatter(mileage)}km`}
        </p>
        <h2 className='text-md md:text-lg font-bold text-black mt-2'>{MoneyFormatter(price, currency)}</h2>
      </div>
    </Link>
  )
}
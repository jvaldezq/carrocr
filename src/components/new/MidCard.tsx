import type { SmallCard } from "@/types/Catalog"
import Image from "next/image"
import DefaultImage from "@/assets/placeholder.webp"
import { MoneyFormatter, NumberFormatter } from "@/lib/NumberFormats"
import { FavoritesHeart } from "@/components/FavoritesHeart/FavoritesHeart";
import Link from 'next/link';

type Props = SmallCard & {
  isTemp?: boolean;
  isAuth?: boolean;
};

export const MidCard = (props: Props) => {
  const { thumbnail, make, model, price, currency, year, transType = '', mileage = 0, isTemp = false, isAuth = false, id, trim } = props
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <Link
    key={`view-${id}`}
    href={`/car/${id}`} className="flex flex-col gap-2 p-4 border border-solid border-black/[0.06] rounded-xl">
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
      <div className="p-4 flex flex-col justify-center items-center">
        <h3 className="text-xl font-semibold text-black">
          {`${make} ${model} ${trim}`}
        </h3>
        <p className="text-sm text-black/50">
          {`${transType} · ${year} · ${NumberFormatter(mileage)} km`}
        </p>
      </div>
    </Link>
  )
}
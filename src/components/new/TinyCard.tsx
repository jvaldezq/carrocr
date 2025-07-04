import type { SmallCard } from "@/types/Catalog"
import Image from "next/image"
import DefaultImage from "@/assets/placeholder.webp"
import { MoneyFormatter } from "@/lib/NumberFormats"
import { FavoritesHeart } from "@/components/FavoritesHeart/FavoritesHeart";
import Link from 'next/link';

type Props = SmallCard & {
  isTemp?: boolean;
  isAuth?: boolean;
};

export const TinyCard = (props: Props) => {
  const { thumbnail, make, model, price, currency, year, transType = '', isTemp = false, isAuth = false, id } = props
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <Link
      key={`view-${id}`}
      href={`/car/${id}`} className="relative card">
      <p className="absolute top-2 right-2 text-black bg-white p-2 rounded-full text-sm flex items-center drop-shadow-lg z-10 font-semibold">
        {MoneyFormatter(price, currency)}
      </p>
      <Image
        src={image}
        alt={`${make} ${model}`}
        className="w-full h-[250px] max-h-[250px] object-cover rounded-xl brightness-[0.90]"
        width={400}
        height={250}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold text-white">
          {`${make} ${model}`}
        </h3>
        <p className="text-sm text-white">
          {`${transType} · ${year}`}
        </p>
      </div>
      {!isTemp && isAuth && <FavoritesHeart id={id} />}
    </Link>
  )
}
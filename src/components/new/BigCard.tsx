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

export const BigCard = (props: Props) => {
  const { thumbnail, make, model, price, currency, year, transType = '', isTemp = false, isAuth = false, id, trim, mileage } = props
  const image = thumbnail ? thumbnail : DefaultImage;

  return (
    <Link
      key={`view-${id}`}
      href={`/car/${id}`} className="flex flex-col gap-4 p-4 border border-solid border-black/[0.06] rounded-xl">
      <div>
        <h3 className="text-2xl font-semibold text-black">
          {`${make} ${model} ${trim}`}
        </h3>
        <p className="text-black/50">
          {`${transType} · ${year} · ${NumberFormatter(mileage)} km`}
        </p>
      </div>
      <div className="relative">
        <Image
          src={image}
          alt={`${make} ${model} ${trim}`}
          className="w-full h-[350px] max-h-[350px] object-cover rounded-xl"
          width={400}
          height={350}
        />
        {!isTemp && isAuth && <FavoritesHeart id={id} />}
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-2">
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-xl font-semibold text-black">
            AWD
          </h3>
          <p className="text-black/50">
            Drivetrain
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-xl font-semibold text-black">
            AWD
          </h3>
          <p className="text-black/50">
            Drivetrain
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-black/[0.06] p-4 w-full rounded-lg">
          <h3 className="text-xl font-semibold text-black">
            AWD
          </h3>
          <p className="text-black/50">
            Drivetrain
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <div className="flex justify-between items-center py-2 border-b border-black/[0.06] w-full">
          <span className="text-black/90">Body type</span>
          <span className="font-semibold text-black">Sedan</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-black/[0.06] w-full">
          <span className="text-gray-600">Engine</span>
          <span className="font-semibold text-gray-900">4.0L V8 Mild hybrid</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-black/[0.06] w-full">
          <span className="text-gray-600">Transmission</span>
          <span className="font-semibold text-gray-900">8-Speed Automatic</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b border-black/[0.06] w-full">
          <span className="text-gray-600">Avg. MPG</span>
          <span className="font-semibold text-gray-900">12-18 Mpg</span>
        </div>

        <div className="flex justify-between items-center py-2 border-b w-full">
          <span className="text-gray-600">Seats</span>
          <span className="font-semibold text-gray-900">5</span>
        </div>
      </div>

      <h2 className="text-black text-xl font-bold">
        {MoneyFormatter(price, currency)}
      </h2>
    </Link>
  )
}
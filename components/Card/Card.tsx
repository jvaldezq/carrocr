import type {Car} from "@/lib/definitions";
import {Carousel} from "@/components/Carousel";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import CardTrigger from "@/components/Card/CardTrigger";
import CarPlaceholderImage from '@/assets/car-placeholder.webp';
import {VerifiedIcon} from "@/icons/VerifiedIcon";

export default function Card(props: Car) {
    const {
        id,
        model,
        trim,
        images = [],
        thumbnail = CarPlaceholderImage.src,
        make,
        year,
        priceDollars,
        mileage,
        transType,
        acctVerified,
    } = props;

    return (
        <article
            className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer relative"
            id={`car-${id}`}
        >
            <Carousel images={[thumbnail, ...images]} model={model} id={+id} showIcon={true}/>
            <div className="mt-2 grid grid-cols-2 text-tertiary relative">
                <p className="text-sm opacity-95 flex col-span-full">{make} {model} <strong
                    className='ml-1'>{year}</strong> {acctVerified &&
                    <VerifiedIcon/>}</p>
                {trim &&
                    <h1 className="text-sm font-medium opacity-95 text-balance col-span-full">{trim}</h1>}
                {transType && <p className="text-sm opacity-95 col-span-full">{transType}</p>}
                {mileage > 0 && <p className="text-sm opacity-95">{NumberFormatter(mileage)}km</p>}
                {priceDollars && <h1 className="text-base font-semibold text-right">{USDFormatter(priceDollars)}</h1>}
                <CardTrigger id={+id}/>
            </div>
        </article>
    );
};

import type {Car} from "@/lib/definitions";
import {Carousel} from "@/components/Carousel";
import {VerifiedIcon} from "@/icons/VerifiedIcon";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import CardTrigger from "@/components/Card/CardTrigger";

export default function Card(props: Car) {
    const {
        id,
        model,
        images = [],
        thumbnail,
        brand,
        year,
        price,
        km,
        transmission,
        verified,
    } = props;

    return (
        <article
            className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer"
        >
            <Carousel images={[thumbnail, ...images]} model={model}/>
            {verified && <VerifiedIcon className="absolute top-1 left-1"/>}
            <div className="mt-2 grid grid-cols-2 text-tertiary relative">
                <h1 className="text-base font-semibold col-span-2 opacity-95 text-balance">
                    {model}
                </h1>
                <p className="text-sm opacity-95">{brand}</p>
                <p className="text-sm text-right opacity-95">{year}</p>
                <p className="text-sm opacity-95">{transmission}</p>
                <p className="text-sm text-right opacity-95">{NumberFormatter(km)}km</p>
                <h1 className="text-sm font-semibold pt-1.5 text-end col-span-2">{USDFormatter(price)}</h1>
                <CardTrigger id={+id}/>
            </div>
        </article>
    );
};

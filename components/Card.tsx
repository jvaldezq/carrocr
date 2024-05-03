import {useCallback, useMemo} from "react";
import type {Car} from "@/lib/Models";
import {NumberFormatter, USDFormatter} from "@/lib/NumberFormats";
import {Carousel} from "@/components/Carousel";
import {VerifiedIcon} from "@/icons/VerifiedIcon";

interface Props extends Car {
    handleCardClick: (uuid: string) => void;
}

export const Card = (props: Props) => {
    const {
        uuid,
        model,
        images = [],
        thumbnail,
        brand,
        year,
        price,
        km,
        transmission,
        handleCardClick,
    } = props;

    const handleClick = useCallback(() => {
        handleCardClick(uuid);
    }, []);

    const isVerified = useMemo(() => {
        if (Math.random() <= 0.33) return true;
    }, []);

    return (
        <article
            className="animate-fade animate-once animate-duration-700 animate-delay-0 cursor-pointer relative"
            onClick={handleClick}
        >
            <Carousel images={[thumbnail, ...images]} model={model}/>
            {isVerified && <VerifiedIcon className="absolute top-1 left-1"/>}
            <div className="mt-2 grid grid-cols-2 text-tertiary">
                <h1 className="text-base font-semibold col-span-2 opacity-95 text-balance">
                    {model}
                </h1>
                <p className="text-sm opacity-95">{brand}</p>
                <p className="text-sm text-right opacity-95">{year}</p>
                <p className="text-sm opacity-95">{transmission}</p>
                <p className="text-sm text-right opacity-95">{NumberFormatter(km)}km</p>
                <h1 className="text-sm font-semibold pt-1.5 text-end col-span-2">{USDFormatter(price)}</h1>
            </div>
        </article>
    );
};

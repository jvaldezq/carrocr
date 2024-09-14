"use client"

import {HTMLAttributes, useEffect, useState} from "react";
import {Carousel as CarouselShad, CarouselApi, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import CardTrigger from "@/components/Card/CardTrigger";
import Image from 'next/image'
import {SwipeIcon} from "@/icons/SwipeIcon";

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
    images: string[];
    model: string;
    id?: number;
    showDots?: boolean;
    showIcon?: boolean;
}

export const Carousel = (props: Props) => {
    const {images, model, id, showDots = false, showIcon = false, ...rest} = props;
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    const data = images.filter(item => item !== null);
    return (<CarouselShad className="w-full h-fit basis-full group" setApi={setApi} {...rest}>
        <CarouselContent>
            {data?.map((image, index) => {
                return (<CarouselItem key={index} className='relative'>
                    <Image
                        className="rounded-2xl aspect-video object-cover w-full h-full"
                        src={image}
                        width={800}
                        height={450}
                        alt={model}
                        loading="lazy"
                    />
                    {id && <CardTrigger id={id}/>}
                </CarouselItem>)
            })}
        </CarouselContent>

        {showDots && (<div className="absolute m-auto bottom-2 right-0 left-0 flex justify-center gap-2">
            {Array.from({length: count}).map((_, index) => {
                const item = index + 1;
                const activeClass = current === item ? 'bg-secondary/[0.4] scale-150' : ''
                return <span key={`dot-${item}`}
                             className={`transition-all rounded-full border border-secondary h-2 w-2 ${activeClass}`}/>
            })}

        </div>)}


        {(showIcon && data.length > 1) && (<SwipeIcon
            className="absolute m-auto bottom-2 right-0 left-0 group-hover:animate-shake group-hover:animate-once group-hover:animate-duration-1000 group-hover:animate-delay-0 group-hover:animate-ease-linear"/>)}
    </CarouselShad>);
};

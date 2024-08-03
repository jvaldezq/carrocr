import * as React from "react";
import {Carousel as CarouselShad, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {SwipeIcon} from "@/icons/SwipeIcon";
import CardTrigger from "@/components/Card/CardTrigger";
import Image from 'next/image'

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
    images: string[];
    model: string;
    id?: number;
}

export const Carousel = (props: Props) => {
    const {images, model, id, ...rest} = props;
    const data = images.filter(item => item !== null);
    return (
        <CarouselShad className="w-full basis-full group" {...rest}>
            <CarouselContent>
                {data?.map((image, index) => {
                    return (
                        <CarouselItem key={index} className='relative'>
                            <Image
                                className="rounded-2xl aspect-video object-cover w-full h-full"
                                src={image}
                                width={800}
                                height={450}
                                alt={model}
                            />
                            {id && <CardTrigger id={id}/>}
                        </CarouselItem>
                    )
                })}
            </CarouselContent>
            {data.length > 1 && (
                <SwipeIcon
                    className="absolute m-auto bottom-1 right-1 group-hover:animate-wiggle group-hover:animate-once group-hover:animate-duration-500 group-hover:animate-delay-0 group-hover:animate-ease-linear"/>
            )}
        </CarouselShad>
    );
};

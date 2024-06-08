import * as React from "react";
import {Carousel as CarouselShad, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {SwipeIcon} from "@/icons/SwipeIcon";
import CardTrigger from "@/components/Card/CardTrigger";
import Image from 'next/image'

interface Props {
    images: string[];
    model: string;
    id?: number;
}

export const Carousel = (props: Props) => {
    const {images, model, id} = props;
    return (
        <CarouselShad className="w-full basis-full">
            <CarouselContent>
                {images?.map((image, index) => (
                    <CarouselItem key={index} className='relative'>
                        <Image
                            className="rounded-2xl aspect-square object-cover w-full h-full"
                            src={image}
                            width={640}
                            height={360}
                            alt={model}
                        />
                        {id && <CardTrigger id={id}/>}
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <SwipeIcon className="absolute m-auto bottom-1 left-0 right-0 opacity-50"/>
            )}
        </CarouselShad>
    );
};

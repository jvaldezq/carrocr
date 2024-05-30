import * as React from "react";
import {Carousel as CarouselShad, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {SwipeIcon} from "@/icons/SwipeIcon";
import CardTrigger from "@/components/Card/CardTrigger";

interface Props {
    images: string[];
    model: string;
}

export const Carousel = (props: Props) => {
    const {images, model} = props;
    return (
        <CarouselShad className="w-full basis-full">
            <CarouselContent>
                {images?.map((image, index) => (
                    <CarouselItem key={index} className='relative'>
                        <img
                            className="rounded-2xl aspect-square object-cover"
                            src={image}
                            alt={model}
                        />
                        <CardTrigger id={1}/>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <SwipeIcon className="absolute m-auto bottom-1 left-0 right-0 opacity-50"/>
            )}
        </CarouselShad>
    );
};
import * as React from "react";
import {Carousel as CarouselShad, CarouselContent, CarouselItem,} from "@/components/ui/carousel";
import {SwipeIcon} from "@/icons/SwipeIcon";

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
                    <CarouselItem key={index}>
                        <img
                            className="rounded-2xl aspect-square object-cover"
                            src={image}
                            alt={model}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <SwipeIcon className="absolute m-auto bottom-1 left-0 right-0 opacity-50"/>
            )}
        </CarouselShad>
    );
};

'use client';

import { HTMLAttributes, useEffect, useState } from 'react';
import {
  Carousel as CarouselShad,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, GalleryHorizontal } from 'lucide-react';

interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  images: string[];
  model: string;
  showDots?: boolean;
  showIcon?: boolean;
  rounded?: boolean;
  preview?: boolean;
  showArrows?: boolean;
  imageClass?: string;
}

export const Carousel = (props: Props) => {
  const {
    images,
    model,
    showDots = false,
    showIcon = false,
    rounded = true,
    preview = false,
    showArrows = false,
    imageClass = 'h-full',
    ...rest
  } = props;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const nextImage = () => {
    const newIndex = current === images.length - 1 ? 0 : current + 1;
    setCurrent(newIndex);
    api?.scrollTo(newIndex);
  };

  const prevImage = () => {
    const newIndex = current === 0 ? images.length - 1 : current - 1;
    setCurrent(newIndex);
    api?.scrollTo(newIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrent(index);
    api?.scrollTo(index);
  };

  const data = images.filter((item) => item !== null);
  return (
    <>
      <CarouselShad
        className="w-full h-fit basis-full group"
        setApi={setApi}
        {...rest}
      >
        <CarouselContent>
          {data?.map((image, index) => {
            return (
              <CarouselItem key={index} className="relative">
                <Image
                  className={`aspect-video object-cover w-full ${imageClass} ${rounded ? 'rounded-2xl' : ''}`}
                  src={image}
                  width={800}
                  height={450}
                  alt={`${model}-${index}-carousel`}
                  loading="lazy"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {showDots && (
          <div className="absolute m-auto bottom-2 right-0 left-0 flex justify-center gap-2">
            {Array.from({ length: count }).map((_, index) => {
              const item = index + 1;
              const activeClass =
                current === item ? 'bg-white/[0.4] scale-150' : '';
              return (
                <span
                  key={`dot-${item}`}
                  className={`transition-all rounded-full border border-white h-2 w-2 ${activeClass}`}
                />
              );
            })}
          </div>
        )}

        {showArrows && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {showIcon && data.length > 1 && (
          <GalleryHorizontal className="absolute m-auto bottom-2 right-0 left-0 group-hover:animate-shake group-hover:animate-once group-hover:animate-duration-1000 group-hover:animate-delay-0 group-hover:animate-ease-linear" />
        )}
      </CarouselShad>
      {preview && (
        <div className="p-4 overflow-x-auto">
          <div className="flex gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all
                    ${current === index + 1 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
              >
                <Image
                  height={76}
                  width={76}
                  src={image}
                  alt={`${index}-carro-mini`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

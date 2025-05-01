import React from 'react';
import Image from 'next/image';
import HeroImage from '@/assets/hero.webp';

export default function Hero() {
  return (
    <div className="relative h-[320px] md:h-[400px] flex justify-center items-center">
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover aspect-video"
          src={HeroImage}
          alt="Cars background"
          width={1280}
          height={400}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-black/[0.3] h-[90%] w-[90%] flex justify-center items-center rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl tracking-wide animate-fade animate-once animate-duration-500 animate-delay-300 animate-ease-in">
            Encuentra tu auto usado perfecto
          </h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl tracking-wide animate-fade animate-once animate-duration-500 animate-delay-500 animate-ease-in">
            Busque entre miles de autos usados de calidad en su área
          </p>
        </div>
      </div>
    </div>
  );
}

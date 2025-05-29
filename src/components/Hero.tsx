'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { usePreview } from '@/context/PreviewContext/PreviewContext';

export default function Hero() {
  const { setFiltersOpen } = usePreview();

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 py-12 lg:py-16">
        <div className="flex flex-col justify-center">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Busca,
            <br /> encuentra,
            <br /> contacta
          </motion.h1>

          <motion.p
            className="mt-4 text-slate-600 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Navega por miles de autos usados. Te facilitamos la búsqueda y el
            contacto directo con vendedores, para que encuentres tu vehículo
            ideal de forma segura y sencilla.
          </motion.p>

          <motion.div
            onClick={() => setFiltersOpen(true)}
            className="w-full flex justify-between items-center mt-8 pl-4 pr-1 py-1 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white relative cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xs text-slate-500">Toyota, Nissan, Ford...</p>
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-10 py-5 h-full rounded-full font-medium transition-colors duration-200">
              <Search />
            </button>
          </motion.div>
        </div>

        <div className="relative rounded-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-80 lg:h-full"
          >
            <Image
              src="https://images.pexels.com/photos/226460/pexels-photo-226460.jpeg"
              alt="Person with headphones"
              fill
              className="object-cover rounded-lg blur-sm"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Floating circles */}
            {[
              {
                top: '20%',
                left: '10%',
                delay: 0.5,
                image:
                  'https://images.pexels.com/photos/355288/pexels-photo-355288.jpeg',
              },
              {
                top: '15%',
                right: '10%',
                delay: 0.7,
                image:
                  'https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg',
              },
              {
                top: '60%',
                left: '5%',
                delay: 0.9,
                image:
                  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
              },
              {
                bottom: '15%',
                right: '10%',
                delay: 1.1,
                image:
                  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
              },
              {
                bottom: '20%',
                right: '55%',
                delay: 1.3,
                image:
                  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
              },
              {
                bottom: '60%',
                right: '40%',
                delay: 1.5,
                image:
                  'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg',
              },
            ].map((circle, index) => (
              <motion.div
                key={index}
                className="absolute w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md z-10"
                style={{ ...circle, zIndex: 10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: [0, 5, -5, 0],
                  transition: {
                    opacity: { duration: 0.5, delay: circle.delay },
                    y: { duration: 0.5, delay: circle.delay },
                    x: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                  },
                }}
              >
                <Image
                  src={circle.image}
                  alt="Music theme"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

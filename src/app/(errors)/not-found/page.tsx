import { Metadata } from 'next';
import { Car, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Carro CR - 404 Not Found',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default function Custom404() {
  return (
    <main className="min-h-dvh max-w-screen-2xl flex items-center justify-center mx-auto px-2 py-24">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 relative">
          <Car size={120} className="text-[#124E78] mx-auto animate-pulse" />
          <AlertCircle
            size={48}
            className="text-[#1C1C1C] absolute top-0 right-1/3 animate-pulse"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4">
          ¡Oops! Página no encontrada
        </h1>

        <p className="text-lg text-[#1C1C1C]/80 mb-8">
          Lo sentimos, pero la página que estás buscando no existe o ha sido
          movida.
        </p>

        <Link
          key="home"
          href="/"
          className="inline-flex items-center gap-2 bg-[#124E78] text-white px-6 py-3 rounded-lg hover:bg-[#124E78]/90 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>

        <div className="mt-8 text-sm text-[#1C1C1C]/60">
          Error 404 | CarroCR.com
        </div>
      </div>
    </main>
  );
}

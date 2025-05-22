import { Metadata } from 'next';
import { AlertTriangle, ArrowLeft, CircleHelp } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Carro CR - Error',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default function Error() {
  return (
    <main className="min-h-dvh max-w-screen-2xl flex items-center justify-center mx-auto px-2 py-24">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <AlertTriangle
            size={120}
            className="text-[#124E78] mx-auto animate-pulse"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4">
          ¡Ha ocurrido un error!
        </h1>

        <p className="text-lg text-[#1C1C1C]/80 mb-8">
          Lo sentimos, pero ha ocurrido un error inesperado. Por favor,
          inténtelo de nuevo más tarde.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link
            key="home"
            href="/"
            className="inline-flex items-center gap-2 border-2 border-[#124E78] text-[#124E78] px-6 py-3 rounded-lg hover:bg-[#124E78]/10 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
          <Link
            key="ticket"
            href="/ticket"
            className="inline-flex items-center gap-2 bg-[#124E78] text-white px-6 py-3 rounded-lg hover:bg-[#124E78]/90 transition-colors"
          >
            <CircleHelp size={20} />
            Crear ticket
          </Link>
        </div>

        <div className="mt-8 text-sm text-[#1C1C1C]/60">
          Error del Sistema | CarroCR.com
        </div>
      </div>
    </main>
  );
}

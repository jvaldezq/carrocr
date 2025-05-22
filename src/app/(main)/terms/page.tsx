import { Metadata } from 'next';
import { ScrollText } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: 'Carro CR - Términos y Condiciones',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default function Terms() {
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 py-24">
      <div className="bg-white rounded-xl shadow-sm p-8 w-full">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#124E78]/10 p-3 rounded-full">
            <ScrollText className="w-6 h-6 text-[#124E78]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">
            Términos y Condiciones
          </h1>
        </div>

        <div className="prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              1. Aceptación de los Términos
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              2. Uso del Servicio
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
            <ul className="list-disc list-inside mt-4 text-[#1C1C1C]/70">
              <li>Punto importante 1</li>
              <li>Punto importante 2</li>
              <li>Punto importante 3</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              3. Responsabilidades del Usuario
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              4. Publicación de Anuncios
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              5. Modificaciones a los Términos
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-[#1C1C1C] mb-4">
              6. Terminación del Servicio
            </h2>
            <p className="text-[#1C1C1C]/70">
              [Aquí va el contenido de la sección...]
            </p>
          </section>
        </div>

        {/* Last Updated Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center text-[#1C1C1C]/50">
          Última actualización: [Fecha]
        </div>
      </div>
    </main>
  );
}

import { Metadata } from 'next';
import {
  UserPlus,
  PlusCircle,
  FileText,
  SendHorizontal,
  ShieldCheck,
  Car,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Carro CR - Como Funciona?',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default function How() {
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#124E78] text-center mb-8">
          ¿Cómo publicar en CarroCR?
        </h1>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <UserPlus className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  1. Crear una cuenta
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Regístrate en CarroCR para comenzar a publicar tus anuncios.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <PlusCircle className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  2. Crear un anuncio
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Inicia el proceso de publicación haciendo clic en
                  &#34;Publicar Anuncio&#34;.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <FileText className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  3. Completar información básica
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Ingresa los detalles esenciales de tu vehículo como marca,
                  modelo y año.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <SendHorizontal className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  4. Enviar a revisión
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Envía tu anuncio para que nuestro equipo lo revise y apruebe.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 - Optional */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-[#124E78]/30">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <ShieldCheck className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  5. Verificar la cuenta{' '}
                  <span className="text-sm text-[#124E78]">(Opcional)</span>
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Verifica tu cuenta para obtener una insignia de vendedor
                  confiable.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 - Optional */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-[#124E78]/30">
            <div className="flex items-center gap-4">
              <div className="bg-[#124E78]/10 p-3 rounded-full">
                <Car className="w-8 h-8 text-[#124E78]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#1C1C1C]">
                  6. Completar información al 100%{' '}
                  <span className="text-sm text-[#124E78]">(Opcional)</span>
                </h2>
                <p className="text-[#1C1C1C]/70 mt-2">
                  Añade todos los detalles posibles para aumentar la visibilidad
                  de tu anuncio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-[#1C1C1C] text-center mb-6">
            Video Tutorial
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <div className="w-full h-[400px] bg-black/5 rounded-xl flex items-center justify-center">
              <p className="text-[#1C1C1C]/70">
                Aquí irá el video tutorial de YouTube
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

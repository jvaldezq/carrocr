import { Metadata } from 'next';
import { Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { auth } from '@clerk/nextjs/server'

export const metadata: Metadata = {
  title: 'Carro CR - 401 Not Authorized',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default async function NotAuthorize() {
  const { userId } = await auth()

  return (
    <main className="min-h-dvh max-w-screen-2xl flex items-center justify-center mx-auto px-2 py-24">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <Lock size={120} className="text-[#124E78] mx-auto animate-pulse" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[#1C1C1C] mb-4">
          Acceso No Autorizado
        </h1>

        <p className="text-lg text-[#1C1C1C]/80 mb-4">
          No tienes permiso para acceder a esta página.
        </p>

        <p className="text-md text-[#1C1C1C]/70 mb-8">
          {!userId
            ? 'Por favor, inicia sesión o verifica tus credenciales para continuar.'
            : 'Por favor, verifica tus credenciales para continuar.'}
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
          {!userId && (
            <Link
              key="login"
              href="/api/auth/login"
              className="inline-flex items-center gap-2 bg-[#124E78] text-white px-6 py-3 rounded-lg hover:bg-[#124E78]/90 transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>

        <div className="mt-8 text-sm text-[#1C1C1C]/60">
          Error 401 | CarroCR.com
        </div>
      </div>
    </main>
  );
}

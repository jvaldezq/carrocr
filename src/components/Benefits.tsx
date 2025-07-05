import React from 'react';
import { Clock, HeartHandshake, Shield, ThumbsUp } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Shield,
      title: 'Anuncios verificados',
      description:
        'Todos los anuncios son rigurosamente verificados, asegurando su calidad y autenticidad.',
    },
    {
      icon: ThumbsUp,
      title: 'Calidad garantizada',
      description:
        'Cada anuncio cumple con nuestros estrictos estándares de calidad.',
    },
    {
      icon: Clock,
      title: 'Proceso rápido',
      description: 'Encuentra y contacta con el propietario en tiempo récord',
    },
    {
      icon: HeartHandshake,
      title: 'Vendedores de confianza',
      description: 'Conéctese con vendedores confiables y verificados',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-20 flex flex-col bg-white">
      <h2 className="text-xl uppercase font-bold tracking-widest leading-loose text-center text-black mb-12">
        ¿Por qué elegirnos?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="text-center bg-white p-4 border border-solid border-black/[0.06] rounded-xl"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-full mb-4">
              <benefit.icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">
              {benefit.title}
            </h3>
            <p className="text-sm text-black">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

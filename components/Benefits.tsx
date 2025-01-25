import React from 'react';
import {Clock, HeartHandshake, Shield, ThumbsUp} from 'lucide-react';

export default function Benefits() {
    const benefits = [
        {
            icon: Shield,
            title: 'Anuncios verificados',
            description: 'Todos los anuncios son rigurosamente verificados, asegurando su calidad y autenticidad.',
        },
        {
            icon: ThumbsUp,
            title: 'Calidad garantizada',
            description: 'Cada anuncio cumple con nuestros estrictos estándares de calidad.',
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
        <div className="py-16">
            <div className="px-2">
                <h2 className="text-3xl font-bold text-center text-tertiary mb-12">
                    ¿Por qué elegirnos?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="text-center p-6 bg-white rounded-lg shadow-md"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                                <benefit.icon className="h-6 w-6 text-secondary" />
                            </div>
                            <h3 className="text-lg font-semibold text-tertiary mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-sm text-tertiary">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
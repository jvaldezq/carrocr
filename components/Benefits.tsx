import React from 'react';
import {Clock, HeartHandshake, Shield, ThumbsUp} from 'lucide-react';

export default function Benefits() {
    const benefits = [
        {
            icon: Shield,
            title: 'Verified Listings',
            description: 'All our listings are thoroughly verified for your peace of mind',
        },
        {
            icon: ThumbsUp,
            title: 'Quality Guaranteed',
            description: 'Every car meets our strict quality standards',
        },
        {
            icon: Clock,
            title: 'Quick Process',
            description: 'Find and purchase your car in record time',
        },
        {
            icon: HeartHandshake,
            title: 'Trusted Sellers',
            description: 'Connect with reliable and verified sellers',
        },
    ];

    return (
        <div className="bg-secondary py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-tertiary mb-12">
                    Why Choose Us
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit) => (
                        <div
                            key={benefit.title}
                            className="text-center p-6 bg-white rounded-lg shadow-md"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-4">
                                <benefit.icon className="h-6 w-6 text-white" />
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
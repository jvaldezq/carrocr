import React from 'react';
import {Search} from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative bg-primary py-16 sm:py-24">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
                    alt="Cars background"
                />
                <div className="absolute inset-0 bg-primary mix-blend-multiply" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                        Find Your Perfect Used Car
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
                        Browse thousands of quality used cars in your area
                    </p>
                </div>

                <div className="mt-10 max-w-xl mx-auto">
                    <div className="flex rounded-lg shadow-sm">
                        <input
                            type="text"
                            className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
                            placeholder="Search by make, model, or keyword"
                        />
                        <button className="px-6 bg-persianBlue text-white rounded-r-lg hover:bg-blue-700">
                            <Search className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
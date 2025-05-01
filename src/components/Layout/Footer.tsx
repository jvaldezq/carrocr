'use client';
import React from 'react';
import { Car, CircleHelp, Facebook, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const Footer = () => {
  const pathname = usePathname();
  const condition = pathname.includes('/draft');

  if (condition) {
    return null;
  }

  return (
    <footer className="bg-tertiary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Car className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">CARROCR</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Su plataforma de confianza para encontrar autos usados de calidad
              en su área. Con anuncios rigurosamente verificados.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/autos" className="text-gray-300 hover:text-white">
                  Autos
                </Link>
              </li>
              <li>
                <Link href="/how" className="text-gray-300 hover:text-white">
                  Como publicar
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Link
                  href="/ticket"
                  className="flex items-center gap-2 text-gray-300 hover:text-white"
                >
                  <CircleHelp className="h-5 w-5" />
                  Crear ticket
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} AutoFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

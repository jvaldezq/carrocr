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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center flex-col md:flex-row text-sm text-gray-300 gap-4">
          <p className="flex items-center md:hidden">
            &copy; {new Date().getFullYear()} CarroCR
          </p>
          <p className="flex items-center gap-2">
            <span className="hidden md:flex">
              &copy; {new Date().getFullYear()} CarroCR
            </span>
            <span className="hidden md:flex">·</span>
            <Link key="terms" href="/terms">
              Términos
            </Link>
            <span>·</span>
            <Link key="sitemap" href="/sitemap">
              Sitemap
            </Link>
            <span>·</span>
            <Link key="privacy" href="/sitemap">
              Privacidad
            </Link>
          </p>
          <div className="flex gap-4 items-center">
            <a href="#" className="text-gray-300 hover:text-white">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

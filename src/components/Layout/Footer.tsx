'use client';
import React from 'react';
import { CircleHelp, Facebook, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LogoWhite from '@/assets/logo-white.webp';
import Image from 'next/image';
import { tw } from '@/lib/utils';


export const Footer = () => {
  const pathname = usePathname();
  const condition = pathname.includes('/draft');

  if (condition) {
    return null;
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src={LogoWhite}
                width={400}
                height={50}
                alt="Logo"
                id="logo"
                className={
                  tw(
                    'w-auto',
                    'h-[50px]',
                    'object-cover'
                  )
                }
              />
            </Link>
            </div>
            <p className="text-sm text-white">
              Su plataforma de confianza para encontrar autos usados de calidad
              en su área. Con anuncios rigurosamente verificados.
            </p>

            <div className="flex gap-4 items-center">
              <a href="#" className="text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/autos" className="text-white">
                  Autos
                </Link>
              </li>
              <li>
                <Link href="/how" className="text-white">
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
                  className="flex items-center gap-2 text-white"
                >
                  <CircleHelp className="h-5 w-5" />
                  Crear ticket
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 flex justify-between items-center flex-col md:flex-row text-sm text-white gap-4">
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
        </div>
      </div>
    </footer>
  );
};

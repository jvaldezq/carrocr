'use client';
import React from 'react';
import { Car, Facebook, Instagram, Mail, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Footer = () => {
  const pathname = usePathname();
  const condition = pathname.includes('/car-entry');

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
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cars
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a
                  href="mailto:info@autofinder.com"
                  className="text-gray-300 hover:text-white"
                >
                  info@autofinder.com
                </a>
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

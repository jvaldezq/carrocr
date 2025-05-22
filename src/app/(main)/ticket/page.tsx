import type { Metadata } from 'next';
import { TicketCheck } from 'lucide-react';
import { TicketForm } from '@/app/(main)/ticket/ticketForm';

export const metadata: Metadata = {
  title: 'Carro CR - Contacto & Tickets',
  description:
    'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
};

const Tickets = async () => {
  return (
    <main className="min-h-dvh max-w-screen-2xl flex items-center justify-center mx-auto px-2 py-24">
      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#124E78]/10 p-3 rounded-full">
            <TicketCheck className="w-6 h-6 text-[#124E78]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1C1C1C]">
            Crear Ticket de Soporte
          </h1>
        </div>

        <TicketForm />

        {/* Contact Email */}
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-[#1C1C1C]/70">
            También puedes contactarnos directamente en{' '}
            <a
              href="mailto:soporte@carrocr.com"
              className="text-[#124E78] hover:text-[#124E78]/80 transition-colors"
            >
              soporte@carrocr.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Tickets;

'use client';
import type { Metadata } from 'next';
import { SendHorizontal } from 'lucide-react';
import { useState } from 'react';

export const metadata: Metadata = {
  title: 'Carro CR - Contacto & Tickets',
  description:
    'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
};

export const TicketForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');
    setMessage('');

    // Reset success message after 3 seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };
  return (
    <>
      {/* Success Message */}
      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center justify-center">
          ¡Ticket creado exitosamente! Te contactaremos pronto.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#1C1C1C] mb-2"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#124E78]/20 focus:border-[#124E78] transition-colors"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-[#1C1C1C] mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#124E78]/20 focus:border-[#124E78] transition-colors resize-none"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#124E78] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#124E78]/90 focus:outline-none focus:ring-2 focus:ring-[#124E78]/20 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            'Enviando...'
          ) : (
            <>
              Crear Ticket
              <SendHorizontal className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
    </>
  );
};

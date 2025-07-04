'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OfflinePage() {
  const router = useRouter();

  useEffect(() => {
    // Try to reconnect
    const timer = setInterval(() => {
      if (navigator.onLine) {
        router.push('/');
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Estás sin conexión</h1>
      <p className="mb-6">No se pudo cargar el contenido. Verifica tu conexión a internet.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
}

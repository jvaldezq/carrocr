import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carro CR - Como Funciona?',
  description:
    'Aprende cómo usar nuestra plataforma para comprar y vender autos de manera eficiente. Sigue nuestra guía paso a paso para maximizar tu experiencia de usuario y conectar fácilmente con compradores y vendedores.',
};

export default function Custom404() {
  return (
    <main className="min-h-dvh pt-20 text-tertiary">404 - Page Not Found</main>
  );
}

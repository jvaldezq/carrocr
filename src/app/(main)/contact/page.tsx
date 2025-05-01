import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carro CR - Contacto',
  description:
    'Ponte en contacto con nuestro equipo para obtener asistencia y resolver tus dudas sobre la compra y venta de autos. Estamos aquí para ayudarte a tener la mejor experiencia en nuestra plataforma.',
};

export default function Contact() {
  return <main className="min-h-dvh pt-20">Contact page</main>;
}

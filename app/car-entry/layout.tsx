import type {Metadata} from "next";
import {CarEntryWrapper} from "@/sections/CarEntry/CarEntryWrapper";

export const metadata: Metadata = {
    title: 'Carro CR - Agregar auto',
    description: 'Agrega un nuevo coche a tu inventario fácilmente con nuestra página de registro de coches. Introduce los detalles del vehículo, sube fotos y publica tu coche rápidamente. Perfecto para concesionarios de coches y vendedores particulares que buscan ampliar su oferta.',
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (<main className="h-full min-h-dvh pt-20">
        <CarEntryWrapper>
            {children}
        </CarEntryWrapper>
    </main>);
}

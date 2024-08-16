import type {Metadata} from "next";
import StepTwo from "@/sections/CarEntry/StepTwo";

export const metadata: Metadata = {
    title: 'Carro CR - Agregar auto',
    description: 'Agrega un nuevo coche a tu inventario fácilmente con nuestra página de registro de coches. Introduce los detalles del vehículo, sube fotos y publica tu coche rápidamente. Perfecto para concesionarios de coches y vendedores particulares que buscan ampliar su oferta.',
}

export default function Create() {
    return (<main className="h-full min-h-dvh pt-20">
        <StepTwo/>
    </main>);
}

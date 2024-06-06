import TopCars from "@/sections/TopCars/TopCars";
import {Suspense} from "react";
import {TopCarsSkeleton} from "@/sections/TopCars/TopCarsSkeleton";
import CarDialog from "@/sections/CarDialog/CarDialog";
import {Benefits} from "@/sections/Benefits";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Carro CR - Home',
    description: 'Encuentra y vende autos fácilmente con nuestra plataforma líder en conexión entre compradores y vendedores. Disfruta de una excelente experiencia de usuario mientras buscas el coche perfecto o vendes el tuyo. Listamos autos de todas las marcas y modelos para facilitar tu compra o venta.',
}

export default function Home() {
    return (
        <main className="min-h-dvh pt-20">
            <Suspense fallback={<TopCarsSkeleton/>}>
                <TopCars/>
            </Suspense>
            <Benefits/>
            <CarDialog/>
        </main>
    );
}

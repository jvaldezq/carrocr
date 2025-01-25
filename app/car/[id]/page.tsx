import {CarDetailsSkeleton} from "@/sections/CarDetails/CarDetailsSkeleton";
import {Suspense} from "react";
import CarDetails from "@/sections/CarDetails/CarDetails";
import type {Metadata, ResolvingMetadata} from 'next'
import {fetchCarById} from "@/sections/CarDetails/service";

interface CarProps {
    params: { id: string }
}

export async function generateMetadata(
    {params}: CarProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id
    const data = await fetchCarById(id);
    console.log('data', data);

    const {
        year,
        make,
        model,
        trim,
        transType,
        condition,
    } = data;

    const title = `${year} ${make} ${model} ${trim} - Transmisión ${transType}, Condición ${condition}`;

    // const description = `Descubre este impecable ${year} ${make} ${model} ${trim}, con una transmisión ${transType.toLowerCase()} de 7 velocidades y un potente motor de ${engineSizeLiters}L y ${engineCylinders} cilindros que entrega ${engineHp} caballos de fuerza. Con solo ${mileage.toLocaleString()} millas, este coche deportivo ${fuelType} ofrece un impresionante rendimiento de combustible de hasta ${econHwMpg} mpg en la autopista. Con un precio de $${priceDollars.toLocaleString()} o ₡${priceColones.toLocaleString()} con una tasa de cambio actual de ${priceExchange}, este vehículo meticulosamente mantenido es una ganga para cualquier entusiasta del automóvil. Disfruta de una experiencia de conducción premium con sus especificaciones de alto rendimiento y diseño elegante. ¡Ve la galería completa y más detalles ahora!`;

    const description = `Descubre este impecable`;
    return {title, description};
}

export default function Car({params}: CarProps) {
    return (
        <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
            <Suspense fallback={<CarDetailsSkeleton/>}>
                <CarDetails id={params.id}/>
            </Suspense>
        </main>
    );
}

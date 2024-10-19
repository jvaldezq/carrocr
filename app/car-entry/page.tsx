import {CreateCar} from "@/app/car-entry/forms/CreateCar";

export default function CarEntry() {
    return (<section
        className='h-full max-w-screen-xl mx-auto flex flex-col gap-2 items-center justify-items-center px-4 pt-24'>
        <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-tertiary">Creación de anuncio</h1>
            <p className="text-tertiary">La información sensible del vehículo no se compartirá públicamente; su uso será
                estrictamente interno.</p>
            <CreateCar/>
        </div>
    </section>);
}

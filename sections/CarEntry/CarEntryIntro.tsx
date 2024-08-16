import Image from "next/image";
import CarPlaceholderImage from '@/assets/car-placeholder.webp';
import Link from "next/link";

const DATA = [
    {
        title: 'Crea tu anuncio en minutos',
        description: 'Proporciona la información básica de tu vehículo.',
        image: CarPlaceholderImage,
        delay: 'animate-delay-[400ms]'
    },
    {
        title: 'Completa los detalles y añade fotos',
        description: 'Describe tu auto a fondo y sube imágenes llamativas.',
        image: CarPlaceholderImage,
        delay: 'animate-delay-[600ms]'
    },
    {
        title: 'Revisión y aprobación rápida',
        description: 'Nuestro equipo verificará tu anuncio para asegurar su autenticidad.',
        image: CarPlaceholderImage,
        delay: 'animate-delay-[800ms]'
    },
]

export const CarEntryIntro = () => {
    return <div
        className='h-full max-w-screen-xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 items-center justify-items-center px-4 pt-6 pb-20 overflow-scroll'>
        <h1 className="text-4xl font-bold text-center md:text-pretty tracking-wider text-tertiary animate-fade animate-once animate-duration-[600ms] animate-delay-0 animate-ease-in">
            Vender tu vehículo nunca fue tan fácil
        </h1>
        <div className="grid gap-12 grid-cols-1 divide-y w-full">
            {
                DATA.map((item, index) => <div
                    key={item.title}
                    className={`grid grid-cols-[1fr_100px] lg:grid-cols-2 pt-6 items-center gap-4 animate-fade-down animate-once animate-duration-500 ${item.delay} animate-ease-in`}>
                    <div>
                        <h3 className='text-xl font-semibold text-pretty text-tertiary'><span
                            className="text-base">{index + 1}</span> {item.title}</h3>
                        <p className="text-base font-light text-tertiary mb-4">{item.description}</p>
                    </div>
                    <Image
                        className="rounded-2xl aspect-square object-cover"
                        src={CarPlaceholderImage}
                        alt="Crea tu anuncio"
                        height={100}
                    />
                </div>)
            }
        </div>
        <div id="car-entry-footer" className="fixed flex flex-col bottom-0 justify-end w-full py-2 px-4 bg-secondary">
            <div className="grid grid-cols-3 gap-4 mb-2">
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-300 animate-ease-linear"/>
                <hr className="h-[5px] bg-tertiary/[0.1] rounded animate-fade-left animate-once animate-duration-500 animate-delay-[600ms] animate-ease-linear"/>
            </div>
            <Link
                href='/car-entry/create'
                className='bg-primary rounded py-1 px-2 text-secondary text-lg w-fit self-end animate-fade animate-once animate-duration-500 animate-delay-1000 animate-ease-linear'>Empezar</Link>
        </div>
    </div>
}
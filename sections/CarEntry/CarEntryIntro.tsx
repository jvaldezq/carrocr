import Image from "next/image";
import CarPlaceholderImage from '@/assets/car-placeholder.webp';

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
    </div>
}
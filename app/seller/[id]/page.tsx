import Image from "next/image";
import {Suspense} from "react";
import SimilarCars from "@/sections/SimilarCars/SimilarCars";
import {SimilarCarsSkeleton} from "@/sections/SimilarCars/SimilarCarsSkeleton";
import {CheckIcon} from "@/icons/CheckIcon";
import {CloseIcon} from "@/icons/CloseIcon";

interface SellerProps {
    params: { id: string }
}

const ContactInfoData = {
    acctId: 1,
    contactName: 'Jordan Valdez',
    contactEmail: 'jordanf.valdez@gmail.com',
    contactPhone: '(506) 8392-9383',
    acctVerified: true,
    thumbnail: 'https://media.licdn.com/dms/image/C4E03AQGe8yTcqObEog/profile-displayphoto-shrink_800_800/0/1542814433921?e=1728518400&v=beta&t=8a0wBtjGSnnTa-dXhACJfmLSrM47F-DD5HVZR0y2mEE',
    isDealer: false
}

export default function Seller({params}: SellerProps) {
    const {acctId, contactName, contactEmail, contactPhone, acctVerified, thumbnail, isDealer} = ContactInfoData;

    return (<main className="min-h-dvh max-w-screen-2xl mx-auto px-4 pt-24">
        <section className="grid md:grid-cols-[30%,_1fr] lg:grid-cols-[20%,_1fr] gap-4">
            <div
                className="flex flex-col justify-start gap-6 text-tertiary">
                <div className="flex gap-4 self-start items-center">
                    {thumbnail ? <Image
                        className="object-cover aspect-auto rounded-full"
                        src={thumbnail}
                        alt="Imagen de perfil"
                        width={80}
                        height={80}
                    /> : <div
                        className='h-20 w-20 rounded-full font-semibold bg-primary/[0.5] text-white flex justify-center items-center'>
                        {contactName.split(' ')
                            .map(word => word[0].toUpperCase())
                            .join('')}
                    </div>}
                    <div>
                        <h4 className='font-medium text-lg'>{contactName}</h4>
                        {acctVerified && <h4 className="font-medium text-xs text-info">Verificado</h4>}
                    </div>
                </div>

                <div className="grid md:grid-cols-1 gap-2">
                    <h3 className="border-b border-solid border-tertiary/[0.2] pb-1 text-base font-semibold mb-4 col-span-full">Contacto</h3>
                    <article>
                        <p className="text-sm">Correo Electrónico</p>
                        <h3 className="text-lg font-normal text-pretty break-words">{contactEmail}</h3>
                    </article>
                    <article>
                        <p className="text-sm">Teléfono</p>
                        <h3 className="text-lg font-normal text-pretty break-words">{contactPhone}</h3>
                    </article>
                </div>

                <div className="grid md:grid-cols-1 gap-2">
                    <h3 className="border-b border-solid border-tertiary/[0.2] pb-1 text-base font-semibold mb-4 col-span-full">Información
                        de verificación</h3>
                    <article>
                        <p className="text-sm">Identificación</p>
                        <h3 className="text-lg font-normal text-pretty break-words">
                            <CheckIcon/>
                        </h3>
                    </article>
                    <article>
                        <p className="text-sm">Correo Electrónico</p>
                        <h3 className="text-lg font-normal text-pretty break-words">
                            <CheckIcon/>
                        </h3>
                    </article>
                    <article>
                        <p className="text-sm">Teléfono</p>
                        <h3 className="text-lg font-normal text-pretty break-words">
                            <CloseIcon/>
                        </h3>
                    </article>
                </div>
                <div className="grid md:grid-cols-1 gap-2">
                    <h3 className="border-b border-solid border-tertiary/[0.2] pb-1 text-base font-semibold mb-4 col-span-full">Estadísticas</h3>
                    <article>
                        <p className="text-sm">Vehículos publicados</p>
                        <h3 className="text-lg font-normal text-pretty break-words">13</h3>
                    </article>
                    <article>
                        <p className="text-sm">Vehículos vendidos</p>
                        <h3 className="text-lg font-normal text-pretty break-words">5</h3>
                    </article>
                    <article>
                        <p className="text-sm">Visitas en total</p>
                        <h3 className="text-lg font-normal text-pretty break-words">455</h3>
                    </article>
                </div>
            </div>
            <Suspense fallback={<SimilarCarsSkeleton/>}>
                <SimilarCars/>
            </Suspense>
        </section>
    </main>);
}

import Image from 'next/image'
import Link from "next/link";
import {getSession} from "@auth0/nextjs-auth0";

interface ContactInfoProps {
    acctId: number;
    isDealer: boolean;
    acctVerified: boolean;
    thumbnail: string | null;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
}

export default async function ContactInfo(props: ContactInfoProps) {
    const {acctVerified, thumbnail, contactName, contactEmail, contactPhone, acctId, isDealer} = props
    const session = await getSession();
    const isBlurred = session?.user ? undefined : 'relative blur justify-center items-center';

    return (<div
        className={`flex flex-col gap-4 text-tertiary rounded-2xl border-primary/[0.1] border border-solid shadow-sm p-5 w-full relative
        ${isBlurred ? 'justify-center items-center' : 'justify-start'}`}>
        <div className={`flex gap-4 self-start items-center ${isBlurred}`}>
            {thumbnail ? <Image
                className="object-cover aspect-auto rounded-full"
                src={thumbnail}
                alt="Imagen de perfil"
                width={80}
                height={80}
            /> : <div
                className='h-16 w-16 rounded-full font-semibold bg-tertiary text-white flex justify-center items-center'>
                {contactName.split(' ')
                    .map(word => word[0].toUpperCase())
                    .join('')}
            </div>}
            <div>
                <h4 className='font-medium text-lg'>{isBlurred ? "No disponible" : contactName}</h4>
                {acctVerified && <h4 className="font-medium text-xs text-info">Verificado</h4>}
            </div>
        </div>
        <div className={`grid lg:grid-cols-2 gap-4 text-tertiary font-light  ${isBlurred}`}>
            <article>
                <p className="text-sm">Correo Electrónico</p>
                <h3 className="text-lg font-normal text-pretty break-words">{isBlurred ? "No disponible" : contactEmail}</h3>
            </article>
            <article>
                <p className="text-sm">Teléfono</p>
                <h3 className="text-lg font-normal text-pretty break-words">{isBlurred ? "No disponible" : contactPhone}</h3>
            </article>
        </div>
        {!isBlurred && <Link key={acctId} href={`/seller/${acctId}`}
                             className='text-secondary px-4 py-2 rounded border-primary flex align-middle md:self-end w-fit ring-0 dark:focus-visible:ring-0 bg-primary focus-visible:ring-0 focus-visible:ring-offset-0'
        >
            Ver perfil
        </Link>}

        {isBlurred && <Link key="login" href="/api/auth/login"
                            className="absolute text-primary font-semibold w-1/2 h-1/2 text-center">
            <p className="text-tertiary text-sm font-medium">Para ver informacion de contacto</p>
            Iniciar sesión
        </Link>}
    </div>)
}
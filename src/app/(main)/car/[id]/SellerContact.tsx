'use client';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import MapsImg from '@/assets/map.webp';
import { tw } from '@/lib/utils';
import Link from 'next/link';

type Props = {
  internalId?: number | null;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export const SellerContact = ({ internalId = null, email = '', phone = '', firstName = '', lastName = '' }: Props) => {
  const pathname = usePathname()

  return (
    <div className={tw(
      'grid',
      'bg-black/5',
      'rounded-xl',
      'md:p-20',
      'p-4',
      'mb-16',
      'bg-gradient-to-br from-white/10 to-white overflow-hidden relative'
    )}>
      <div className="absolute inset-0 opacity-25">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${MapsImg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      <div className='flex flex-col gap-2 justify-center w-full'>
        <h1 className='text-4xl lg:text-5xl font-bold text-black'>Contacto</h1>
        <p className='text-md lg:text-lg text-black/70'>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>

        <SignedOut>
          <div className='mt-10 self-center'>
            <SignIn
              routing="hash"
              fallbackRedirectUrl={pathname}
              appearance={{
                elements: {
                  card: "bg-white text-black"
                }
              }}
            />
          </div>
        </SignedOut>

        <SignedIn>
          <div className='grid md:grid-cols-2 gap-4 mt-10'>
            {(firstName || lastName) && (
              <Link
                key="seller"
                href={`/seller/${internalId}`}
                className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'
              >
                <h4 className='text-lg font-semibold text-white'>{`${firstName} ${lastName}`}</h4>
                <p className='text-sm text-white/80 font-light'>Ver perfil</p>
              </Link>
            )}
            <div />
            {phone && (
              <a href={`tel:${phone}`} className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'>
                <h4 className='text-lg font-semibold text-white'>{phone}</h4>
                <p className='text-sm text-white/80 font-light'>Enviar mensaje</p>
              </a>
            )}
            <div />
            {email && (
              <a href={`mailto:${email}`} className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'>
                <h4 className='text-lg font-semibold text-white'>{email}</h4>
                <p className='text-sm text-white/80 font-light'>Enviar correo</p>
              </a>
            )}
          </div>
        </SignedIn>

      </div>

    </div>
  );
}

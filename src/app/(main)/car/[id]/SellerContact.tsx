'use client';
import { SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import MapsImg from '@/assets/map.webp';
import { tw } from '@/lib/utils';


export const SellerContact = () => {
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
            <div className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'>
              <h4 className='text-lg font-semibold text-white'>Headquarter office</h4>
              <p className='text-sm text-white/80 font-light'>Costa Rica</p>
            </div>
            <div />
            <div className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'>
              <h4 className='text-lg font-semibold text-white'>+1 (415) 555‑0132</h4>
              <p className='text-sm text-white/80 font-light'>Enviar mensaje</p>
            </div>
            <div />
            <div className='flex flex-col gap-2 relative bg-black/80 p-4 rounded-xl'>
              <h4 className='text-lg font-semibold text-white'>support@bydrive.com</h4>
              <p className='text-sm text-white/80 font-light'>Enviar correo</p>
            </div>
          </div>
        </SignedIn>

      </div>

    </div>
  );
}

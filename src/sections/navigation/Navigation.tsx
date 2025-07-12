'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import Link from 'next/link';
import { LogIn, Menu, X } from 'lucide-react';
import { tw } from '@/lib/utils';
import { SignIn, SignOutButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import LogoWhite from '@/assets/logo-white.webp';
import Image from 'next/image';


gsap.registerPlugin(SplitText);

export const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const pathname = usePathname()
  const navRef = useRef(null);
  const closeIconRef = useRef(null);
  const { user } = useUser()
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (!shouldRender || !navRef.current) return;

    const ctx = gsap.context(() => {
      const split1 = new SplitText("#how-to", { type: "words" });
      const split2 = new SplitText("#contact-us", { type: "words" });
      const split3 = new SplitText("#profile", { type: "words" });
      const split4 = new SplitText("#profile-drafts", { type: "words" });
      const split5 = new SplitText("#profile-favorites", { type: "words" });
      const split6 = new SplitText("#car-entry", { type: "words" });
      const split7 = new SplitText("#login", { type: "words" });

      const tl = gsap.timeline({
        onReverseComplete: () => {
          setShouldRender(false);
        },
      });

      tlRef.current = tl;

      tl.from(navRef.current, {
        autoAlpha: 0,
        duration: 0.4,
      });

      if (closeIconRef.current) {
        tl.fromTo(closeIconRef.current, { rotate: 0 }, {
          rotate: 180,
          duration: 0.4,
          ease: "power2.out"
        }, "<");
      }

      [split7, split6, split5, split4, split3, split2, split1].forEach(split => {
        if (split.words.length > 0) {
          tl.from(split.words, {
            y: -40,
            autoAlpha: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.out",
          }, "<+=0.1");
        }
      });

      return () => {
        split1.revert();
        split2.revert();
        split3.revert();
        split4.revert();
        split5.revert();
        split6.revert();
        split7.revert();
      };
    }, navRef);

    return () => ctx.revert();

  }, [shouldRender]);

  const handleClose = () => {
    if (tlRef.current) {
      tlRef.current.reverse();
    } else {
      setShouldRender(false);
    }
    setOpen(false);
  };

  return (
    <>
      <button className="fixed bottom-[4.3rem] md:bottom-20 right-4 bg-black/90 hover:bg-black rounded-full p-2 md:p-[0.5rem] drop-shadow-lg z-20" onClick={() => setOpen(true)}>
        <Menu className='w-6 h-6 md:w-8 md:h-8 text-white' />
      </button>

      {shouldRender && (
        <nav
          ref={navRef}
          id="nav"
          className={tw(
            'fixed',
            'top-0',
            'left-0',
            'w-full',
            'h-full',
            'bg-black',
            'text-white',
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'gap-8',
            'text-xl',
            'z-20',
            'pt-52',
            'md:pt-0',
            'pb-20',
            'md:pb-0',
            'px-4',
            'overflow-scroll',
            'pt-[env(safe-area-inset-top)]'
          )}
        >
          <div className="absolute top-0 w-full flex items-center justify-between p-4">
            {
              user ? (
                <h4 className="text-sm font-light">
                  {`${user?.firstName} ${user?.lastName?.slice(0, 1)}`}
                </h4>
              ) : (
                <Link href="/" onClick={handleClose}>
                  <Image
                    src={LogoWhite}
                    width={400}
                    height={50}
                    alt="Logo"
                    id="logo"
                    className={
                      tw(
                        'w-auto',
                        'h-[50px]',
                        'object-cover'
                      )
                    }
                  />
                </Link>
              )
            }
            <button ref={closeIconRef} onClick={handleClose}>
              <X height={30} width={30} />
            </button>
          </div>

          <SignedOut>
            <SignIn
              routing="hash"
              fallbackRedirectUrl={pathname}
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-white text-black"
                }
              }}
            />
            <div className="flex gap-4 items-center text-sm mt-10">
              <Link id="how-to" href="/how" onClick={handleClose}>COMO PUBLICAR?</Link>
              <Link id="contact-us" href="/contact" onClick={handleClose}>CONTACTANOS</Link>
            </div>
          </SignedOut>
          <SignedIn>
            <Link className='font-lilita-one text-xl' id="profile" href="/profile" onClick={handleClose}>PERFIL</Link>
            <Link className='font-lilita-one text-xl' id="profile-drafts" href="/profile/drafts" onClick={handleClose}>MIS ANUNCIOS</Link>
            <Link className='font-lilita-one text-xl' id="profile-favorites" href="/profile/favorites" onClick={handleClose}>MIS FAVORITOS</Link>
            <div id="car-entry" className="my-6 font-lilita-one text-xl">CREAR ANUNCIO</div>
            <div className="flex gap-4 items-center text-sm mt-10">
              <Link id="how-to" href="/how" onClick={handleClose}>COMO PUBLICAR?</Link>
              <Link id="contact-us" href="/contact" onClick={handleClose}>CONTACTANOS</Link>
            </div>
          </SignedIn>

          {user && (
            <SignOutButton redirectUrl={pathname}>
              <button className="absolute bottom-8 right-4 flex gap-1 items-center text-sm">
                <LogIn className="h-4 rotate-180" />
                <span>Logout</span>
              </button>
            </SignOutButton>
          )}
        </nav>
      )}
    </>
  );
};

function useEffect(arg0: () => Promise<void>, arg1: never[]) {
  throw new Error('Function not implemented.');
}

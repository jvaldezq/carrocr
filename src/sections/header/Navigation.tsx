'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useUser } from '@/context/UserContext/UserContext';
import Link from 'next/link';
import { LogIn, Menu, X } from 'lucide-react';
import { tw } from '@/lib/utils';

gsap.registerPlugin(SplitText);

export const Navigation = () => {
  const [open, setOpen] = useState(false);        // Controls whether nav is "open"
  const [shouldRender, setShouldRender] = useState(false);  // Controls whether to render at all
  const navRef = useRef(null);
  const closeIconRef = useRef(null);
  const { user } = useUser();
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // When open changes
  useLayoutEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  // Run GSAP when shouldRender is true
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

      // ✅ just clean up SplitText here
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

    // ✅ Now we call ctx.revert ONCE outside
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
      <button className="fixed bottom-20 right-4 z-10 bg-white rounded-full p-2 md:p-3 shadow-2xl" onClick={() => setOpen(true)}>
        <Menu className='w-6 h-6 md:w-8 md:h-8 text-black' />
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
            'p-4',
            'z-20'
          )}
        >
          <div className="absolute top-0 w-full flex items-center justify-between p-4">
            {
              user ? (
                <h4 className="text-sm font-light">
                  {`${user?.firstName} ${user?.lastName.slice(0, 1)}`}
                </h4>
              ) : (
                <h4>
                  CARRO CR
                </h4>
              )
            }
            <button ref={closeIconRef} onClick={handleClose}>
              <X />
            </button>
          </div>

          {!user ? (
            <>
              <Link
                id="login"
                href="/api/auth/login"
                className='font-lilita-one text-xl'
                onClick={handleClose}>
                LOGIN
              </Link>
              <div className="flex gap-4 items-center text-sm mt-10">
                <Link id="how-to" href="/how" onClick={handleClose}>COMO PUBLICAR?</Link>
                <Link id="contact-us" href="/contact" onClick={handleClose}>CONTACTANOS</Link>
              </div>
            </>
          ) : (
            <>
              <Link className='font-lilita-one text-xl' id="profile" href="/profile" onClick={handleClose}>PERFIL</Link>
              <Link className='font-lilita-one text-xl' id="profile-drafts" href="/profile/drafts" onClick={handleClose}>MIS ANUNCIOS</Link>
              <Link className='font-lilita-one text-xl' id="profile-favorites" href="/profile/favorites" onClick={handleClose}>MIS FAVORITOS</Link>
              <div id="car-entry" className="my-6 font-lilita-one text-xl">CREAR ANUNCIO</div>
              <div className="flex gap-4 items-center text-sm mt-10">
                <Link id="how-to" href="/how" onClick={handleClose}>COMO PUBLICAR?</Link>
                <Link id="contact-us" href="/contact" onClick={handleClose}>CONTACTANOS</Link>
              </div>
            </>
          )}

          {user && (
            <a
              key="logout"
              href="/api/auth/logout"
              className="absolute bottom-8 right-4 flex gap-1 items-center text-sm"
              onClick={handleClose}
            >
              <LogIn className="h-4 rotate-180" />
              <span>Logout</span>
            </a>
          )}
        </nav>
      )}
    </>
  );
};

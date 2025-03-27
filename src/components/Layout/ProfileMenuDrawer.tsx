'use client';

import React, { ReactNode, CSSProperties, useState } from 'react';
import { Drawer } from 'vaul';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { CircleHelp, Contact, LogIn, User } from 'lucide-react';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';

interface ProfileMenuDrawerProps {
  children: ReactNode;
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const { setOpen } = useCarEntry();
  const { children } = props;

  return (
    <Drawer.Root
      direction="right"
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
    >
      <Drawer.Trigger>{children}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/35 z-10" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-40 outline-none w-[310px] flex"
          style={{ '--initial-transform': 'calc(100% + 8px)' } as CSSProperties}
        >
          <div className="bg-primary h-full w-full grow p-4 flex flex-col rounded-xl">
            <Drawer.Title className="font-medium mb-7 flex items-center justify-start">
              <Link key="Home" href="/" onClick={() => setDrawerOpen(false)}>
                <span className="text-base font-ligh text-white">LOGO</span>
              </Link>
            </Drawer.Title>
            <div className="text-white p-1 flex flex-col gap-2 items-start justify-start h-full">
              {!user ? (
                <Link
                  key="login"
                  href="/api/auth/login"
                  className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                  onClick={() => setDrawerOpen(false)}
                >
                  <LogIn className="h-5" />
                  <span className="">Ingreso / Registro</span>
                </Link>
              ) : (
                <div className="flex flex-col items-start justify-start w-full">
                  <Link
                    key="profile"
                    href="/profile"
                    className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <User className="h-5" />
                    <span>{user?.name}</span>
                  </Link>
                  <div
                    key="car-entry"
                    onClick={() => {
                      setOpen(true);
                      setDrawerOpen(false);
                    }}
                    className="flex items-center gap-1 w-full py-2 px-3 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm ml-2"
                  >
                    <span>Crear anuncio</span>
                  </div>
                </div>
              )}

              <div className="w-full my-5 h-[0.5px] bg-white/[0.6] rounded-xl" />

              <Link
                key="how"
                href="/how"
                className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                onClick={() => setDrawerOpen(false)}
              >
                <CircleHelp className="h-5" />
                <span className="">Como publicar?</span>
              </Link>
              <Link
                key="contact"
                href="/contact"
                className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                onClick={() => setDrawerOpen(false)}
              >
                <Contact className="h-5" />
                <span className="">Contactanos</span>
              </Link>
              {user && (
                <a
                  key="logout"
                  href="/api/auth/logout"
                  className="flex items-center gap-1 absolute bottom-2.5 right-4 cursor-pointer"
                  onClick={() => setDrawerOpen(false)}
                >
                  <LogIn className="h-5 rotate-180" />
                  <span>Logout</span>
                </a>
              )}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

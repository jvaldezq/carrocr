'use client';

import React, { ReactNode, CSSProperties, useState } from 'react';
import { Drawer } from 'vaul';
import Link from 'next/link';
import { Car, LogIn } from 'lucide-react';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';
import { useUser } from '@/context/UserContext/UserContext';

interface ProfileMenuDrawerProps {
  children: ReactNode;
}

export const ProfileMenuDrawer = (props: ProfileMenuDrawerProps) => {
  const { children } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useUser();
  const { setOpen } = useCarEntry();

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
            <Drawer.Title className="font-medium flex items-center justify-start">
              <Link key="Home" href="/" onClick={() => setDrawerOpen(false)}>
                <span className="text-base font-ligh text-white">
                  <Link key="Home" href="/">
                    <div className="flex items-center">
                      <Car className="h-5 w-5" />
                    </div>
                  </Link>
                </span>
              </Link>
            </Drawer.Title>
            <div className="text-white p-1 flex flex-col gap-2 items-start justify-start h-full mt-2">
              {!user ? (
                <Link
                  key="login"
                  href="/api/auth/login"
                  className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span>Ingreso / Registro</span>
                </Link>
              ) : (
                <div className="flex flex-col items-start justify-start w-full">
                  <h4 className="text-center w-full text-sm">Bienvenido</h4>
                  <h4 className="text-center w-full mb-3">{`${user?.firstName} ${user?.lastName}`}</h4>

                  <div className="w-full mb-5 h-[0.5px] bg-white/[0.6] rounded-xl" />

                  <Link
                    key="profile"
                    href="/profile"
                    className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Perfil</span>
                  </Link>
                  <Link
                    key="profile"
                    href="/profile"
                    className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Ver mis anuncios</span>
                  </Link>
                  <Link
                    key="profile"
                    href="/profile"
                    className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <span>Ver mis favoritos</span>
                  </Link>
                  <div
                    key="car-entry"
                    onClick={() => {
                      setOpen(true);
                      setDrawerOpen(false);
                    }}
                    className="flex items-center gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300 text-sm"
                  >
                    <span>Crear anuncio</span>
                  </div>

                  {user?.acctType == 3 && (
                    <>
                      <div className="w-full my-5 h-[0.5px] bg-white/[0.6] rounded-xl" />
                      <h4 className="text-center w-full">Welcome Admin</h4>
                      <Link
                        key="admin-approvals"
                        href="/admin/approvals"
                        className="flex items-center text-sm gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                        onClick={() => setDrawerOpen(false)}
                      >
                        <span className="">Approvals</span>
                      </Link>
                    </>
                  )}
                </div>
              )}

              <div className="flex justify-end flex-col w-full grow">
                <Link
                  key="how"
                  href="/how"
                  className="flex items-center text-sm gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="">Como publicar?</span>
                </Link>
                <Link
                  key="contact"
                  href="/contact"
                  className="flex items-center text-sm gap-1 w-full py-2 px-1 rounded-xl cursor-pointer hover:bg-white/[0.1] transition-colors duration-300"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="">Contactanos</span>
                </Link>

                {user && (
                  <a
                    key="logout"
                    href="/api/auth/logout"
                    // className="flex items-center gap-1 absolute bottom-2.5 right-4 cursor-pointer"
                    className="flex items-center self-end gap-1 mt-4 text-sm cursor-pointer"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <LogIn className="h-5 rotate-180" />
                    <span>Logout</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

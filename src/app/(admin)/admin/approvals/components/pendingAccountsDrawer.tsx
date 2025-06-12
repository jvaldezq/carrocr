'use client';
import { Drawer } from 'vaul';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import React, { CSSProperties, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePutAccountSetPublishMutation } from '@/app/(admin)/admin/approvals/service/usePutAccountSetPublishMutation';
import { usePutAccountSetDenyMutation } from '@/app/(admin)/admin/approvals/service/usePutAccountSetDenyMutation';
import { useGetAccountReviewById } from '@/app/(admin)/admin/approvals/service/useGetAccountReviewById';

interface Props {
  id: string;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

export const PendingAccountsDrawer = (props: Props) => {
  const { drawerOpen, setDrawerOpen, id } = props;
  const { data } = useGetAccountReviewById(id);
  const { mutateAsync: handlePublish } = usePutAccountSetPublishMutation();
  const { mutateAsync: handleDeny } = usePutAccountSetDenyMutation();

  const { firstName, lastName, phone, profilePicture, identityPicture } =
    data || {};

  const handlePublishClick = useCallback(() => {
    handlePublish(id);
    setDrawerOpen(false);
  }, [handlePublish, id, setDrawerOpen]);

  const handleDenyClick = useCallback(() => {
    handleDeny({ id });
  }, [handleDeny, id]);

  return (
    <Drawer.Root direction="top" open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/35 z-10" />
        <Drawer.Content
          className={cn(
            'top-0',
            'sm:top-1',
            'left-0',
            'right-0',
            'fixed',
            'z-40',
            'outline-none',
            'w-full',
            'md:w-[95%]',
            'h-full',
            'sm:h-[99%]',
            'mx-auto',
            'flex',
          )}
          style={{ '--initial-transform': 'calc(100% + 8px)' } as CSSProperties}
        >
          <div
            className={cn(
              'bg-white',
              'w-full',
              'h-full',
              'sm:h-[99%]',
              'grow',
              'flex',
              'flex-col',
              'sm:rounded-2xl',
              'relative',
              'py-20',
              'overflow-y-scroll',
            )}
          >
            <Drawer.Title
              className={cn(
                'bg-white',
                'flex',
                'items-center',
                'justify-end',
                'gap-2',
                'absolute',
                'w-full',
                'top-0',
                'left-0',
                'px-4',
                'py-3',
                'sm:rounded-t-2xl',
                'text-tertiary',
                'font-light',
                'tracking-wider',
              )}
            >
              <Drawer.Close>
                <CircleX className="h-6 w-6 hover:scale-110 transition duration-300 text-gray-700" />
              </Drawer.Close>
            </Drawer.Title>
            <div className="px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Información Básica
              </h1>
              <div>
                <p className="text-sm">Nombre</p>
                <p className="text-sm text-primary font-bold">{firstName}</p>
              </div>
              <div>
                <p className="text-sm">Apellido</p>
                <p className="text-sm text-primary font-bold">{lastName}</p>
              </div>
              <div>
                <p className="text-sm">Teléfono</p>
                <p className="text-sm text-primary font-bold">{phone}</p>
              </div>
            </div>
            <div className="px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
              <h1 className="font-light tracking-widest text-lg col-span-full border-b border-primary">
                Imagenes
              </h1>
              <div>
                <p className="text-sm text-tertiary self-start">
                  Imagen de Perfil
                </p>
                <Image
                  src={profilePicture || ''}
                  alt="Uploader"
                  height={500}
                  width={500}
                />
              </div>
              <div>
                <p className="text-sm text-tertiary self-start">
                  Imagen de Identificación
                </p>
                <Image
                  src={identityPicture || ''}
                  alt="Uploader"
                  height={500}
                  width={500}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 px-4">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDenyClick}
                className="cursor-pointer"
              >
                Rechazar
              </Button>
              <Button
                type="button"
                variant="default"
                onClick={handlePublishClick}
                className="cursor-pointer"
              >
                Aprobar
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

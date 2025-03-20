'use client';
import React, { CSSProperties, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SlidersHorizontal, CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Drawer } from 'vaul';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export const AutoFilters = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const path = usePathname();

  if (path.includes('draft')) {
    return null;
  }

  return (
    <Drawer.Root direction="top" open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Trigger
        className={cn(
          'flex',
          'items-center',
          'justify-center',
          'gap-2',
          'shadow-lg',
          'w-full',
          'h-full',
          'sm:w-[640px]',
          'h-10 px-4 py-2',
          'animate-fade',
          'animate-once',
          'animate-duration-500',
          'animate-ease-linear',
          'rounded-xl',
          'border-[0.5px]',
          'border-tertiary/[0.5]',
          'border-solid',
          'cursor-pointer',
          'transition-all',
          'duration-300',
          'hover:shadow-sm',
          'text-tertiary/[0.9]',
          'hover:bg-primary',
          'hover:border-primary',
          'hover:text-white',
          'font-light',
          'tracking-wider',
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filtros
      </Drawer.Trigger>
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
            'sm:w-[640px]',
            'h-screen',
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
              'h-screen',
              'sm:max-h-[99%]',
              'sm:h-full',
              'grow',
              'flex',
              'flex-col',
              'sm:rounded-2xl',
              'overflow-y-scroll',
              'relative',
              'py-20',
            )}
          >
            <Drawer.Title
              className={cn(
                'bg-white',
                'flex',
                'items-center',
                'justify-between',
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
                'border-b',
                'border-tertiary',
                'border-solid',
              )}
            >
              <Drawer.Close>
                <CircleX className="h-6 w-6 hover:scale-110 transition duration-300 text-gray-700" />
              </Drawer.Close>
              <p className="w-full text-center">Filtros</p>
            </Drawer.Title>

            <section
              className={cn(
                'px-4',
                'flex',
                'flex-col',
                'items-start',
                'justify-start',
                'gap-8',
              )}
            >
              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'items-start',
                  'justify-start',
                  'gap-2',
                  'w-full',
                )}
              >
                <h2 className="text-xl font-semibold text-tertiary mb-4">
                  Precio
                </h2>
                <Slider
                  min={0}
                  max={10000000}
                  // step={1000}
                  // value={priceRange}
                  // onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>

              <hr className="w-full" />

              <div
                className={cn(
                  'flex',
                  'flex-col',
                  'items-start',
                  'justify-start',
                  'gap-2',
                  'w-full',
                )}
              >
                <h2 className="text-xl font-semibold text-tertiary mb-4">
                  Años
                </h2>
                <Slider
                  min={0}
                  max={10000000}
                  // step={1000}
                  // value={priceRange}
                  // onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </section>
            <div
              className={cn(
                'bg-white',
                'flex',
                'items-center',
                'justify-between',
                'gap-2',
                'absolute',
                'w-full',
                'bottom-0',
                'left-0',
                'p-4',
                'sm:rounded-b-2xl',
              )}
            >
              <Button variant="ghost">Limpiar</Button>
              <Button className="rounded-2xl">Mostrar 345 anuncios</Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

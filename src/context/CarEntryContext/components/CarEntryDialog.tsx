'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Car } from 'lucide-react';
import { CreateCar } from '@/context/CarEntryContext/components/CreateCar';
import { useCarEntry } from '@/context/CarEntryContext/CarEntryContext';
import { cn } from '@/lib/utils';

export const CarEntryDialog = () => {
  const { open, close } = useCarEntry();
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        className={cn(
          'max-w-[95%]',
          'h-fit',
          'lg:max-w-[850px]',
          'max-h-[90%]',
          'overflow-scroll',
          'color-primary',
          'rounded-2xl',
          'border-none',
          'p-0',
          '[&>button:last-child]:hidden',
        )}
      >
        <DialogTitle className="hidden" />
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-black">
          <div className="flex-shrink-0 shadow-2xl bg-black/10 p-3 rounded-full">
            <Car className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Crea tu anuncio
            </h1>
            <p className="text-sm text-secondary/80 mt-1">
              Comienza por proporcionar los detalles básicos de tu vehículo. Una
              vez enviados, podrás agregar más información, fotos y establecer
              el precio.
            </p>
          </div>
        </div>
        <CreateCar />
      </DialogContent>
    </Dialog>
  );
};

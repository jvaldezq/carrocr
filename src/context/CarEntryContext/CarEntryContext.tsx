'use client';
import { createContext, useContext, FC, ReactNode, useState } from 'react';
import { CarEntryDialog } from '@/context/CarEntryContext/components/CarEntryDialog';

type CarEntryContextType = {
  open: boolean;
  close: () => void;
  setOpen: (open: boolean) => void;
};

const CarEntryContext = createContext<CarEntryContextType | undefined>(
  undefined,
);

export const useCarEntry = () => {
  const context = useContext(CarEntryContext);
  if (!context) {
    throw new Error('useCarEntry must be used within a CarEntryContext');
  }
  return context;
};

export const CarEntryContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <CarEntryContext.Provider
      value={{
        open,
        close,
        setOpen,
      }}
    >
      <CarEntryDialog />
      {children}
    </CarEntryContext.Provider>
  );
};

'use client';
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useCallback,
} from 'react';
import { CarDialog } from '@/components/CarDialog/CarDialog';

type PreviewContextType = {
  id: number;
  clearId: () => void;
  setId: (id: number) => void;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error('usePreview must be used within a PreviewContext');
  }
  return context;
};

export const PreviewContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState(0);

  const clearId = useCallback(() => {
    setId(0);
  }, []);

  return (
    <PreviewContext.Provider
      value={{
        id,
        clearId,
        setId,
      }}
    >
      <CarDialog />
      {children}
    </PreviewContext.Provider>
  );
};

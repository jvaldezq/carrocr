'use client';
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { CarDialog } from '@/context/PreviewContext/components/CarDialog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const preview = searchParams.get('preview');

  useEffect(() => {
    if (preview) {
      setId(+preview);
    } else {
      setId(0);
    }
  }, [preview]);

  const clearId = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('preview');
    const newUrl = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    router.replace(newUrl);
  }, [pathname, router, searchParams]);

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

'use client';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/Tooltip';
import { usePreview } from '@/context/PreviewContext/PreviewContext';

export const QuickViewButton = ({ id }: { id: number }) => {
  const { setId } = usePreview();

  return (
    <Tooltip tooltipContent="Ver prevista">
      <div
        className={cn(
          'border',
          'border-primary',
          'text-primary',
          'bg-transparent',
          'hover:bg-transparent',
          'w-full',
          'px-2',
          'py-1',
          'rounded-sm',
          'text-xs',
          'flex',
          'items-center',
          'justify-center',
          'z-40',
          'transition-all',
          'min-h-10',
        )}
        onClick={() => setId(id)}
      >
        Vista rápida
      </div>
    </Tooltip>
  );
};

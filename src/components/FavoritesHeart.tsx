'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';

interface Props {
  id: number;
}

export const FavoritesHeart = (props: Props) => {
  const { id } = props;
  const isFavorite = false;

  return (
    <div className={cn('absolute', 'top-2', 'right-2')}>
      <Tooltip
        tooltipContent={
          isFavorite ? 'Quitar de favoritos' : 'Agregar favoritos'
        }
      >
        <Heart
          id={id.toString()}
          className={cn(
            'stroke-white',
            'hover:scale-110',
            'transition-all',
            'z-40',
            isFavorite ? 'fill-error' : 'fill-black/[0.5]',
          )}
        />
      </Tooltip>
    </div>
  );
};

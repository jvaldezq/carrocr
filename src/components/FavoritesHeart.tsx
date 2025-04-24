'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

interface Props {
  id: number;
}

export const FavoritesHeart = (props: Props) => {
  const { id } = props;
  const isFavorite = false;
  console.log(id);

  return (
    <Heart
      className={cn(
        'absolute',
        'top-2',
        'right-2',
        'stroke-white',
        'hover:scale-110',
        'transition-all',
        'z-40',
        isFavorite ? 'fill-error' : 'fill-black/[0.5]',
      )}
    />
  );
};

'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { useUser } from '@/context/UserContext/UserContext';
import { useCallback } from 'react';
import { useAddToFavoritesMutation } from '@/components/FavoritesHeart/service/addToFavorites';

interface Props {
  id: number;
}

export const FavoritesHeart = (props: Props) => {
  const { user } = useUser();
  const { mutateAsync } = useAddToFavoritesMutation();
  const { id } = props;
  const isFavorite = user?.favListings?.includes(id);

  const handleSaveFavorite = useCallback(() => {
    mutateAsync(id).then(() => {
      console.log('Card saved!');
    });
  }, [id, mutateAsync]);

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
          onClick={handleSaveFavorite}
        />
      </Tooltip>
    </div>
  );
};

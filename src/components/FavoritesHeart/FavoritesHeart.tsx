'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { useCallback } from 'react';
import { useAddToFavoritesMutation } from '@/components/FavoritesHeart/service/addToFavorites';
import { useFavorites } from '@/context/FavoritesContext/FavoritesContext';

interface Props {
  id: number;
}

export const FavoritesHeart = (props: Props) => {
  const { mutateAsync } = useAddToFavoritesMutation();
  const { id } = props;
  const { isFavorite, isAuthenticated } = useFavorites();

  const isFav = isAuthenticated ? isFavorite(id) : false;

  const handleSaveFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (isAuthenticated) {
        mutateAsync(id).then(() => {});
      }
    },
    [id, mutateAsync, isAuthenticated],
  );

  return (
    <div
      className={cn(
        'absolute',
        'top-2',
        'left-2',
        isFav ? 'drop-shadow-xl' : 'drop-shadow-md',
      )}
    >
      <Tooltip
        tooltipContent={isFav ? 'Quitar de favoritos' : 'Agregar favoritos'}
      >
        <Heart
          id={id?.toString()}
          className={cn(
            'stroke-black/40',
            'hover:scale-110',
            'transition-all',
            'z-40',
            isFav ? 'fill-error' : 'fill-black/[0.5]',
          )}
          onClick={handleSaveFavorite}
        />
      </Tooltip>
    </div>
  );
};

'use client';

import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { Tooltip } from '@/components/Tooltip';
import { useCallback, useState } from 'react';
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
  const [pop, setPop] = useState(false);

  const handleSaveFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isAuthenticated) return;
      // micro interaction
      setPop(true);
      setTimeout(() => setPop(false), 180);
      mutateAsync(id).then(() => {});
    },
    [id, mutateAsync, isAuthenticated],
  );

  return (
    <div className={cn('absolute top-2 left-2')}> 
      <Tooltip tooltipContent={isFav ? 'Quitar de favoritos' : 'Agregar favoritos'}>
        <div className="relative">
          <Heart
            id={id?.toString()}
            className={cn(
              'relative z-10 h-5 w-5 md:h-6 md:w-6 transition-all duration-120 ease-out',
              pop && 'scale-105',
              isFav
                ? 'fill-rose-500/80 stroke-rose-600'
                : 'fill-white/80 stroke-black/30 hover:fill-black/5',
            )}
            onClick={handleSaveFavorite}
          />
        </div>
      </Tooltip>
    </div>
  );
};

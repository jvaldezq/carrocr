'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useGetUserFavoriteIds } from '@/context/FavoritesContext/services/useGetUserFavoriteIds';

interface FavoritesContextType {
  favoriteIds: number[];
  isLoading: boolean;
  isFavorite: (id: number) => boolean;
  isAuthenticated: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { isLoaded: userLoaded } = useUser();

  const isAuthenticated = authLoaded && userLoaded && !!isSignedIn;

  const { data: favoriteIds = [], isLoading } =
    useGetUserFavoriteIds(isAuthenticated);

  const isFavorite = (id: number): boolean => {
    return favoriteIds.includes(id);
  };

  const contextValue: FavoritesContextType = {
    favoriteIds,
    isLoading,
    isFavorite,
    isAuthenticated,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

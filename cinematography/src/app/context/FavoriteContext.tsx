'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { IFavorite, IFavoriteContextValue } from '@/types/types';

const FavoriteContext = createContext<IFavoriteContextValue | undefined>(
  undefined
);

export default function FavoriteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<IFavorite[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    );
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = (
    prevFavorites: IFavorite[],
    movie: IFavorite
  ): IFavorite[] => {
    const isFavorite = prevFavorites.some((fav) => fav.id === movie?.id);
    if (isFavorite) {
      return prevFavorites.filter((fav) => fav.id !== movie?.id);
    } else {
      return [...prevFavorites, movie];
    }
  };

  const toggleFavorite = (movie: IFavorite | undefined) => {
    if (movie) {
      setFavorites((prevFavorites) =>
        handleToggleFavorite(prevFavorites, movie)
      );
    }
  };
  return (
    <FavoriteContext.Provider
      value={{ favorites, setFavorites, toggleFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a FavoriteProvider');
  }
  return context;
}

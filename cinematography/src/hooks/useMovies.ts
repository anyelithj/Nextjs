import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils/Const';
import { IMovie, IMovieParams } from '@/types/types';

export const useMovies = (endpoint: string, params: IMovieParams) => {
  const { api_key, page, query, with_genres } = params;
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}${endpoint}`, {
        params: { api_key, page, query, with_genres },
      })
      .then((response) => {
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPage(response.data.total_pages);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [endpoint, api_key, page, query, with_genres]);

  return { movies, currentPage, totalPage, loading };
};

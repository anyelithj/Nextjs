'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { useMovies } from '@/hooks/useMovies';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';

const Search = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const searchQuery = (params.id?.toString() || '')
    .replace(/%20/g, ' ')
    .toLowerCase();
  const page = searchParams.get('page');

  const { movies, currentPage, totalPage, loading } = useMovies(
    '/search/movie',
    {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      query: searchQuery,
      page: page || '1',
    }
  );

  const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const title = `${capitalizeFirstLetter(searchQuery)} Movies`;

  const router = useRouter();

  const handlePageChange = (direction: 'prev' | 'next') => {
    const nextPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;

    if (nextPage < 1 || nextPage > totalPage) return;

    router.push(`/search/${searchQuery}?page=${nextPage}`);
  };

  return (
    <main
      className='scrollbar-thin scrollbar-thumb-[#444] scrollbar-thumb-rounded-lg scrollbar-track-[#333] scrollbar-track-rounded-lg scrollbar-corner-[#222] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-auto bg-secondary p-8'
      ref={mainRef}
    >
      <h2 className='text-[24px] text-white'>
        {movies.length === 0 && !loading
          ? `No movies were found with that name, please try another search.`
          : title}
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className='moviesGrid mt-8 grid place-items-center gap-8'>
            {movies.map((movie) => {
              const movieId =
                typeof movie.id === 'object' ? movie.id.id : movie.id;
              return (
                <Card
                  key={`${movieId}-${movie.title}`}
                  img={movie.poster_path}
                  id={movieId}
                  title={movie.title}
                  releaseDate={movie.release_date}
                />
              );
            })}
          </div>
          <div className='flex justify-center gap-16 py-6 pt-16'>
            <Pagination
              direction='prev'
              currentPage={currentPage}
              totalPage={totalPage}
              onPageChange={handlePageChange}
            />
            <Pagination
              direction='next'
              currentPage={currentPage}
              totalPage={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
      <Footer />
    </main>
  );
};

export default Search;

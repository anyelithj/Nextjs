'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { useMovies } from '@/hooks/useMovies';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';

const Discover = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const searchParams = useSearchParams();

  const validDiscoverOptions: (
    | 'now_playing'
    | 'top_rated'
    | 'popular'
    | 'upcoming'
  )[] = ['now_playing', 'top_rated', 'popular', 'upcoming'];

  const discover: 'now_playing' | 'top_rated' | 'popular' | 'upcoming' =
    validDiscoverOptions.includes(
      params.id?.toString() as
        | 'now_playing'
        | 'top_rated'
        | 'popular'
        | 'upcoming'
    )
      ? (params.id?.toString() as
          | 'now_playing'
          | 'top_rated'
          | 'popular'
          | 'upcoming')
      : 'popular';

  const page = searchParams.get('page');

  const { movies, currentPage, totalPage, loading } = useMovies(
    `/movie/${discover}`,
    {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      page: page || '1',
    }
  );

  const titles = {
    now_playing: 'Now Playing Movies',
    top_rated: 'Top Rated Movies',
    popular: 'Popular Movies',
    upcoming: 'Upcoming Movies',
  };

  const title = titles[discover];

  const router = useRouter();

  const handlePageChange = (direction: 'prev' | 'next') => {
    const nextPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    if (nextPage < 1 || nextPage > totalPage) return;
    router.push(`/discover/${discover}?page=${nextPage}`);
  };

  return (
    <main
      className='scrollbar-thin scrollbar-thumb-[#444] scrollbar-thumb-rounded-lg scrollbar-track-[#333] scrollbar-track-rounded-lg scrollbar-corner-[#222] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-auto bg-secondary p-8'
      ref={mainRef}
    >
      <h2 className='text-[24px] text-white'>{title}</h2>
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

export default Discover;

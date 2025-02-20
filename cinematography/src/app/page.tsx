'use client';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import Pagination from '@/components/Pagination';
import { useMovies } from '@/hooks/useMovies';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const { movies, currentPage, totalPage, loading } = useMovies(
    `/movie/popular`,
    {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      page: page || '1',
    }
  );

  const router = useRouter();
  useEffect(() => {
    if (!loading && mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [loading]);

  const handlePageChange = (direction: 'prev' | 'next') => {
    const nextPage = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    if (nextPage < 1 || nextPage > totalPage) return;

    router.push(`/?page=${nextPage}`);
  };
  return (
    <main
      ref={mainRef}
      className='scrollbar-thin scrollbar-thumb-[#444] scrollbar-thumb-rounded-lg scrollbar-track-[#333] scrollbar-track-rounded-lg scrollbar-corner-[#222] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-auto bg-secondary p-8'
    >
      <h2 className='text-[24px] tracking-[2px] text-white'>Popular Movies</h2>
      {loading && <Loading />}
      <div className='moviesGrid mt-8 grid place-items-center gap-8'>
        {movies.map((movie) => {
          const movieId = typeof movie.id === 'object' ? movie.id.id : movie.id;
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
      <div className='pb-20'>
        <Footer />
      </div>
    </main>
  );
};

export default Home;

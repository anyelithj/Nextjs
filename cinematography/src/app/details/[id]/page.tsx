'use client';
import { useAppContext } from '@/app/context/FavoriteContext';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { IFavorite } from '@/types/types';
import { BASE_IMG_URL, BASE_URL } from '@/utils/Const';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { PiStarThin } from 'react-icons/pi';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const MovieDetails = () => {
  const [movie, setMovie] = useState<IFavorite | undefined>();
  const [showPlayer, setShowPlayer] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>('');
  const { favorites, toggleFavorite } = useAppContext();
  const mainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`
      )
      .then((response) => {
        setMovie(response.data);
      });
  }, [params.id]);

  useEffect(() => {
    const trailerIndex = movie?.videos?.results?.findIndex(
      (element) => element.type === 'Trailer'
    );
    const trailerUrl = `https://www.youtube.com/watch?v=${movie?.videos?.results[trailerIndex!]?.key}`;
    setTrailer(trailerUrl);
  }, [movie]);

  const startPlayer = () => {
    mainRef?.current?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setShowPlayer(true);
  };

  const closePlayer = () => {
    setShowPlayer(false);
  };

  const isFavorite = favorites.some((fav) => fav.id === movie?.id);

  return (
    <main
      className='scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary relative max-h-[calc(100vh-77px)] overflow-y-auto bg-secondary p-8'
      ref={mainRef}
    >
      {!movie && <Loading />}
      <div
        className='absolute right-0 top-0 m-2 cursor-pointer text-textColor hover:text-white'
        onClick={() => router.back()}
      >
        <IoMdClose size={28} />
      </div>

      <div className='flex items-center justify-center pt-4 md:pt-0'>
        <div className='grid max-w-[1200px] gap-12 md:grid-cols-[300px,1fr]'>
          <div>
            <Image
              src={
                movie?.poster_path
                  ? `${BASE_IMG_URL}${movie?.poster_path}`
                  : 'https://image.tmdb.org/t/p/original/y2oFhZKviIUZu3pJeccFg5YdelY.jpg'
              }
              alt={movie?.title ? `Poster of ${movie.title}` : 'Movie poster'}
              height={900}
              width={900}
              priority={true}
            />
          </div>
          <div className='space-y-6 text-textColor md:space-y-3'>
            <div className='flex flex-col gap-2 pr-4 text-[26px] font-medium uppercase text-white md:flex-row md:gap-6 md:text-[34px]'>
              {movie?.title}
              <PiStarThin
                fill={isFavorite ? '#FFC300' : '#fff'}
                onClick={() => toggleFavorite(movie)}
                style={{ width: '40px', height: '40px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <div className='flex flex-wrap gap-4 pt-5'>
                Genres:{' '}
                {movie?.genres?.map((genre) => (
                  <span key={genre.id.toString()}>{genre.name}</span>
                ))}
              </div>
              <div>Release: {movie?.release_date}</div>
              <div>Rating: {movie?.vote_average}</div>
            </div>
            <div className='space-y-2 pr-4 pt-7'>
              <div>Description:</div>
              <div>{movie?.overview}</div>
            </div>
            <div
              className='inline-block cursor-pointer pt-6'
              onClick={startPlayer}
            >
              <div className='mb-6 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-black hover:bg-[#b4b4b4]'>
                <BsPlayFill size={24} />
                Watch Trailer
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPlayer && (
        <div className='absolute inset-x-[7%] top-3 z-50 overflow-hidden rounded bg-black p-4 text-white opacity-100 transition-opacity duration-500 md:inset-x-[13%]'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold'>Playing Trailer</span>
            <div
              className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg opacity-50 hover:bg-[#0F0F0F] hover:opacity-75'
              onClick={closePlayer}
            >
              <IoMdClose className='h-5' />
            </div>
          </div>
          <div className='relative pt-[56.25%]'>
            <ReactPlayer
              url={trailer}
              width='100%'
              height='100%'
              style={{ position: 'absolute', top: '0', left: '0' }}
              controls={true}
              playing={true}
              config={{
                youtube: {
                  playerVars: { modestbranding: 1, autoplay: 1 },
                },
              }}
            />
          </div>
        </div>
      )}

      <div className='pb-20'>
        <Footer />
      </div>
    </main>
  );
};

export default MovieDetails;

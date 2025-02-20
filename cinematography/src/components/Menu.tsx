import { IGenre } from '@/types/types';
import { BASE_URL } from '@/utils/Const';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MenuLinks = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const params = useParams();

  const capitalizeFirstLetter = (str: string | null) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      )
      .then(({ data }) => {
        setGenres(data.genres);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const genreParam = params?.id?.toString();
    if (genreParam) {
      setSelectedGenre(genreParam);
    } else {
      setSelectedGenre('');
    }
  }, [params]);

  return (
    <>
      <div className='flex flex-col gap-4 pt-4'>
        <Link href='/savedFavorite'>Saved Favorite</Link>
        <p className='sidebarTitle'>Discover</p>
        <Link className='w-fit' href='/discover/now_playing'>
          <p
            className={`sidebarLink ${selectedGenre === 'now_playing' ? 'sidebarActive' : ''}`}
          >
            Now Playing
          </p>
        </Link>
        <Link className='w-fit' href='/discover/top_rated'>
          <p
            className={`sidebarLink ${selectedGenre === 'top_rated' ? 'sidebarActive' : ''}`}
          >
            Top Rated
          </p>
        </Link>
        <Link className='w-fit' href='/discover/popular'>
          <p
            className={`sidebarLink ${selectedGenre === 'popular' ? 'sidebarActive' : ''}`}
          >
            Popular
          </p>
        </Link>
        <Link className='w-fit' href='/discover/upcoming'>
          <p
            className={`sidebarLink ${selectedGenre === 'upcoming' ? 'sidebarActive' : ''}`}
          >
            Upcoming
          </p>
        </Link>
      </div>
      <div className='flex flex-col gap-4 pt-6'>
        <p className='sidebarTitle'>Genres</p>
        {genres.map((genre: IGenre) => (
          <Link
            key={genre.id.toString()}
            href={`/genres/${genre.id}?genre=${genre.name}`}
            className='w-fit'
          >
            <p
              className={`sidebarLink text-white ${genre.name?.toLowerCase() === selectedGenre ? 'sidebarActive' : ''}`}
            >
              {capitalizeFirstLetter(genre.name)}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default MenuLinks;

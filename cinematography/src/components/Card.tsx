import { BASE_IMG_URL } from '@/utils/Const';
import Link from 'next/link';
import { useState } from 'react';
import { CiImageOff } from 'react-icons/ci';
import Image from 'next/image';
import { IPropsType } from '@/types/types';

const Card = ({ img, id, title, releaseDate }: IPropsType) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const imageUrl = img
    ? `${BASE_IMG_URL}${img}`
    : 'https://image.tmdb.org/t/p/original/y2oFhZKviIUZu3pJeccFg5YdelY.jpg';

  return (
    <Link href={`/details/${id}`} className='group block'>
      <div className='group h-[450px] w-[100%] bg-primary md:h-[335px]'>
        {!loaded && !error && (
          <div className='flex h-[450px] w-[100%] items-center justify-center bg-gray-300 md:h-[335px]'>
            <div className='h-12 w-12 animate-pulse rounded-full bg-gray-400' />
          </div>
        )}

        {error && (
          <div className='flex h-[450px] items-center justify-center bg-gray-300 md:h-[335px]'>
            <CiImageOff size={56} aria-label='Image error icon' />
          </div>
        )}

        <div className='relative rounded-lg'>
          <Image
            className='h-[450px] w-[100%] object-cover md:h-[335px]'
            src={imageUrl}
            alt={img ? `Image of ${title}` : 'Image of movie'}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            height={900}
            width={900}
            priority={true}
          />
          {loaded && !error && (
            <div className='absolute bottom-0 w-[100%] bg-primary px-4 py-2 text-center opacity-0 transition-all duration-500 group-hover:opacity-100'>
              <h3>{title}</h3>
              <p>{releaseDate}</p>
            </div>
          )}
        </div>

        {(error || !loaded) && (
          <div className='absolute bottom-0 w-[100%] bg-primary px-4 py-2 text-center opacity-0 transition-all duration-500 group-hover:opacity-100'>
            <h3>{title}</h3>
            <p>{releaseDate}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;

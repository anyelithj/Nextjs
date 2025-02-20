import { useAppContext } from '@/app/context/FavoriteContext';
import { BASE_IMG_URL } from '@/utils/Const';
import Image from 'next/image';
import { PiStarThin } from 'react-icons/pi';

const TableFavorite = () => {
  const { favorites, toggleFavorite } = useAppContext();

  return (
    <div className='mb-9 mt-9 flex h-96 flex-col overflow-hidden rounded border border-gray-100'>
      {favorites && favorites.length > 0 ? (
        <div className='overflow-x-auto rounded-lg'>
          <table className='w-full table-auto rounded-lg'>
            <thead className='border-b border-gray-100 text-base font-medium capitalize text-gray-100'>
              <tr>
                <th className='px-3 py-2 text-center'>Favorite</th>
                <th className='px-4 py-2 text-center'>Movie</th>
                <th className='px-6 py-2 text-center'>Title</th>
                <th className='px-2 py-2 text-center'>Release</th>
                <th className='px-2 py-2 text-center'>Rating</th>
                <th className='px-4 py-2 text-center'>Description</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((movie) => {
                const isFavorite = favorites.some((fav) => fav.id === movie.id);

                return (
                  <tr
                    key={String(movie?.id)}
                    className='border-b border-gray-100 text-center text-base last:border-b-0 hover:bg-gray-400 hover:text-black'
                  >
                    <td className='px-3 py-2'>
                      <PiStarThin
                        fill={isFavorite ? '#FFC300' : '#fff'}
                        onClick={() => toggleFavorite(movie)}
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                      />
                    </td>
                    <td className='px-4 py-2'>
                      <Image
                        className='mx-1.5 h-[1.2rem] w-[1.2rem]'
                        src={`${BASE_IMG_URL}${movie?.poster_path}`}
                        alt={
                          movie?.title
                            ? `Poster of ${movie.title}`
                            : 'Movie poster'
                        }
                        style={{ width: '70px', height: '70px' }}
                        height={900}
                        width={900}
                        priority={true}
                      />
                    </td>
                    <td className='px-6 py-2'>{movie?.title}</td>
                    <td className='px-2 py-2'>{movie?.release_date}</td>
                    <td className='px-2 py-2'>{movie?.vote_average}</td>
                    <td className='px-4 py-2 text-left'>{movie?.overview}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='text-center'>No favorites found.</p>
      )}
    </div>
  );
};

export default TableFavorite;

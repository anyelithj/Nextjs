'use client';
import TableFavorite from '@/components/TableFavorite';

const SavedFavoritePage = () => {
  return (
    <div className='scrollbar-thin scrollbar-thumb-[#444] scrollbar-thumb-rounded-lg scrollbar-track-[#333] scrollbar-track-rounded-lg scrollbar-corner-[#222] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-auto bg-secondary p-8'>
      <h1 className='text-[24px] text-white'>Saved Favorites</h1>
      <TableFavorite />
    </div>
  );
};

export default SavedFavoritePage;

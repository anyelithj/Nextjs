'use client';
import MenuLinks from './Menu';

const Sidebar = () => {
  return (
    <div className='scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-primary hidden max-h-[calc(100vh-77px)] max-w-[200px] overflow-y-scroll bg-primary px-10 pb-8 pt-6 sm:block'>
      <MenuLinks />
    </div>
  );
};

export default Sidebar;

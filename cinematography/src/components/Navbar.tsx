'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Search from './Search';
import MenuLinks from './Menu';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

const Navbar = () => {
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInput('');
    router.push(`/search/${input}?page=1`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='bg-primary'>
      <div className='mx-8 flex items-center justify-between px-2 py-4 sm:mx-5 md:mx-2 md:px-4 lg:mx-2 xl:mx-3'>
        <Link className='mt-2 hidden sm:block' href='/'>
          <h2 className='text-[30px] text-[#E50914]'>Cinema</h2>
        </Link>
        <div className='mt-2 flex gap-4 pt-2'>
          {isMobile ? (
            <>
              <div onClick={() => setIsOpen(true)} className='md:hidden'>
                <AiOutlineMenu size={30} />
              </div>
              <div
                className={`fixed left-0 top-0 z-10 max-h-[100vh] min-h-[100vh] w-[100%] overflow-scroll bg-primary ${isOpen ? 'block' : 'hidden'}`}
              >
                <div className='sticky top-0 w-[100%] bg-primary py-4'>
                  <IoMdClose
                    onClick={() => setIsOpen(false)}
                    className='absolute right-0 top-0 m-2 mt-7'
                    size={28}
                  />
                  <Link
                    className='w-flit'
                    href='/discover/now_playing'
                    onClick={() => setIsOpen(false)}
                  >
                    <div className='sidebarTitle text-center text-[28px] text-[#E50914]'>
                      Cinema
                    </div>
                  </Link>
                </div>
                <div className='px-4 pb-16'>
                  <MenuLinks />
                </div>
              </div>
            </>
          ) : null}

          <div className='relative' style={{ width: 'calc(100% - 20px)' }}>
            <Search
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import Link from 'next/link';

const Footer = () => {
  return (
    <div className='pt-4 text-center text-[13px] font-light text-textColor md:text-[16px]'>
      @The Anyelith Coders | All rights reserved {new Date().getFullYear()}.
      <p>
        Data provided by{' '}
        <Link
          className='text-white'
          href='https://www.themoviedb.org/'
          target='blank'
        >
          TMDB API
        </Link>
      </p>
    </div>
  );
};

export default Footer;

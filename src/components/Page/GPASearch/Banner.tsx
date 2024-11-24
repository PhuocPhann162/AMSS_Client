import { useMemo } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';
import { getScrollAnimation } from '~/helper';
import { motion } from 'framer-motion';
import { ImportIcon } from '~/components/Icon';
import { useNavigate } from 'react-router-dom';

interface BannerInterface {
  searchSectionRef: any;
}

const Banner = ({ searchSectionRef }: BannerInterface) => {
  const navigate = useNavigate();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <ScrollAnimationWrapper>
      <section className='bg-white dark:bg-gray-900'>
        <div className='grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28'>
          <motion.div variants={scrollAnimation} className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-black'>
              Lookup Indicators <br />
              Society &amp; Economic.
            </h1>

            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              This is a free and open-source platform to help you look up social economic indicators from various
              sources, including data on schools, hospitals, companies, and many other key statistics.
            </p>

            <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4 text-black'>
              <button
                onClick={() => {
                  if (searchSectionRef.current) {
                    searchSectionRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className='flex items-center justify-center px-4 py-2 text-sm tracking-wide shadow-lg text-white transition-colors duration-200 bg-brown rounded-lg shrink-0 sm:w-auto hover:bg-yellow-800 hover:shadow-brown max-w-80'
              >
                <svg
                  className='w-4 h-4 mr-2 text-gray-500 dark:text-gray-200'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 496 512'
                >
                  <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'></path>
                </svg>{' '}
                Start Search Now
              </button>

              <button
                onClick={() => navigate(`/app/gpaSearch/importData`)}
                className='inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-brown bg-white border border-brown rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-white hover:bg-black focus:z-10 focus:ring-4 focus:ring-gray-200 '
              >
                <ImportIcon />
                Import Data
              </button>
            </div>
          </motion.div>

          <div className='hidden lg:mt-0 lg:col-span-5 lg:flex'>
            <img src='https://demo.themesberg.com/landwind/images/hero.png' alt='hero image' />
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default Banner;

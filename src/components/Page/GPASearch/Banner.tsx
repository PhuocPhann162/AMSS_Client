import { useMemo } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { getScrollAnimation } from '@/helper';
import { motion } from 'framer-motion';
import { ImportIcon } from '@/components/Icon';
import { useNavigate } from 'react-router-dom';
import { AButton } from '@/common/ui-common';

interface BannerInterface {
  searchSectionRef: any;
}

const Banner = ({ searchSectionRef }: BannerInterface) => {
  const navigate = useNavigate();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <ScrollAnimationWrapper>
      <section className='bg-white dark:bg-gray-900'>
        <div className='mx-auto grid max-w-screen-xl px-4 pb-8 pt-10 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pt-10 xl:gap-0'>
          <motion.div
            variants={scrollAnimation}
            className='mr-auto place-self-center lg:col-span-7'
          >
            <h1 className='mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl xl:text-6xl'>
              Lookup Indicators <br />
              Society &amp; Economic.
            </h1>

            <p className='mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl'>
              This is a free and open-source platform to help you look up social
              economic indicators from various sources, including data on
              schools, hospitals, companies, and many other key statistics.
            </p>

            <div className='space-y-4 text-black sm:flex sm:space-x-4 sm:space-y-0'>
              <AButton
                onClick={() => {
                  if (searchSectionRef.current) {
                    searchSectionRef.current.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }
                }}
                className='flex max-w-80 shrink-0 items-center justify-center rounded-lg bg-brown px-4 py-2 text-sm tracking-wide text-white shadow-lg transition-colors duration-200 hover:bg-yellow-800 hover:shadow-brown sm:w-auto'
              >
                Start Search Now
              </AButton>

              <AButton
                onClick={() => navigate(`/app/gpaSearch/importData`)}
                className='mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg border border-brown bg-white px-5 py-3 text-sm font-medium text-brown hover:bg-black hover:bg-gray-100 hover:text-white focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 sm:w-auto'
              >
                <ImportIcon />
                Import Data
              </AButton>
            </div>
          </motion.div>

          <div className='hidden lg:col-span-5 lg:mt-0 lg:flex'>
            <motion.img src={'/Planet.png'} loading='lazy'></motion.img>
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default Banner;

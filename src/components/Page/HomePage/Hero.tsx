import { useMemo } from 'react';
import { ScrollAnimationWrapper } from '~/components/Animation';

import { motion } from 'framer-motion';
import HeroImage from '../../../../public/AdvertiseImage.png';
import { Link } from 'react-router-dom';
import { getScrollAnimation } from '~/helper';

export const Hero = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div className='max-w-screen-xl px-8 xl:px-16 mx-auto' id='about'>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16'
          variants={scrollAnimation}
        >
          <div className=' flex flex-col justify-center items-start row-start-2 sm:row-start-1'>
            <h1 className='text-3xl lg:text-4xl xl:text-5xl font-semibold text-black leading-snug font-rubik'>
              Want anything to be easy with <strong>AgriHelp</strong>.
            </h1>
            <p className='text-black-500 mt-4 mb-6'>
              Provide a network for all your needs with ease and fun using AgriHelp discover interesting features from
              us.
            </p>
            <Link to='/login' className='btn btn-primary hover:shadow-green text-white px-14 py-4'>
              Get Started
            </Link>
          </div>
          <div className='flex w-full'>
            <motion.div className='h-full w-full' variants={scrollAnimation}>
              <div className='mockup-window bg-gradient-to-r from-white to-green-100 shadow-xl rounded-md'>
                <div className='flex justify-center px-4 py-4 bg-white'>
                  <img src={HeroImage} alt='AMSS Illustrasi' width={612} height={383} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

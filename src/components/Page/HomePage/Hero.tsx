import { useMemo } from 'react';
import { ScrollAnimationWrapper } from '@/components/Animation';

import { motion } from 'framer-motion';
import HeroImage from '../../../../public/AdvertiseImage.png';
import { Link } from 'react-router-dom';
import { getScrollAnimation } from '@/helper';
import { AButton } from '@/common/ui-common';

export const Hero = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  return (
    <div className='mx-auto max-w-screen-xl px-8 xl:px-16' id='about'>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-flow-row grid-rows-2 gap-8 py-6 sm:grid-flow-col sm:grid-cols-2 sm:py-16 md:grid-rows-1'
          variants={scrollAnimation}
        >
          <div className='row-start-2 flex flex-col items-start justify-center sm:row-start-1'>
            <h1 className='text-3xl font-semibold leading-snug text-black lg:text-4xl xl:text-5xl'>
              Want anything to be easy with <strong>WorldWise</strong>.
            </h1>
            <p className='text-black-500 mb-6 mt-4'>
              Provide a network for all your needs with ease and fun using
              AgriHelp discover interesting features from us.
            </p>
            <Link to='/login'>
              <AButton type='primary'>Get Started</AButton>
            </Link>
          </div>
          <div className='flex w-full'>
            <motion.div
              className='h-full w-full'
              variants={scrollAnimation}
              whileHover={{
                scale: 1.1,
                transition: {
                  duration: 0.2,
                },
              }}
            >
              <div className='mockup-window rounded-md bg-gradient-to-r from-white to-green-100 shadow-xl'>
                <div className='flex justify-center bg-white px-4 py-4'>
                  <img
                    src={HeroImage}
                    alt='Novaris Illustrasi'
                    width={612}
                    height={383}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

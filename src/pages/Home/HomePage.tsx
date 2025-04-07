import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Layout/Footer';
import { Hero, OurService } from '@/components/Page/HomePage';
import { userModel } from '@/interfaces';
import { RootState } from '@/storage/redux/store';
import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { useMemo } from 'react';
import { getScrollAnimation } from '@/helper';
import { AButton } from '@/common/ui-common';

export default function HomePage() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore,
  );
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className='flex max-w-full flex-col'>
      <section className='p-6'>
        <div className='relative p-12'>
          <img
            src='/homeLanding.png'
            alt='homeLanding absolute'
            className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
          />
          <div className='relative flex flex-col items-center gap-4 text-center'>
            <h1 className='text-2xl font-bold text-white md:text-4xl'>
              Welcome to Novaris
            </h1>
            <h1 className='text-4xl font-bold text-white md:text-6xl'>
              Agriculture & Eco Farming
            </h1>
            <p className='text-white md:text-lg'>
              Connecting agriculture, ensuring transparent origins
            </p>
            <Link to={userData.id ? '/app/dashBoard' : '/login'}>
              <AButton type='primary'>
                {userData.id ? 'Manage Farm Now' : 'Discover More'}
              </AButton>
            </Link>
          </div>
        </div>
      </section>
      <div className='bg-white'>
        <Hero />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

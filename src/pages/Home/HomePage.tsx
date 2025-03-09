import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer } from '@/components/Layout/Footer';
import { HeaderPage } from '@/components/Layout/Header';
import { Hero, OurService } from '@/components/Page/HomePage';
import { userModel } from '@/interfaces';
import { RootState } from '@/storage/redux/store';
import { motion } from 'framer-motion';
import { ScrollAnimationWrapper } from '@/components/Animation';
import { useMemo } from 'react';
import { getScrollAnimation } from '@/helper';

export default function HomePage() {
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className='h-full'>
      <header className='absolute top-0 left-0 w-full z-20'>
        <HeaderPage />
      </header>
      <main>
        <section className='relative h-screen'>
          <div>
            {/* Thẻ div chứa ảnh nền với lớp bg-cover và điều chỉnh độ mờ */}
            <motion.img
              className='absolute inset-0 bg-cover bg-center bg-no-repeat backdropFilter h-full w-full z-0'
              src={'/homeLanding.png'}
              loading='lazy'
            />
            {/* Nội dung */}
            <div className='absolute inset-0 flex items-center justify-center gap-8 px-4 text-white text-lg'>
              <ScrollAnimationWrapper className='w-1/2'>
                <motion.div variants={scrollAnimation}>
                  <p className='text-base'>HELLO ! WELCOME TO AGRICULTURAL FARM</p>
                  <h1 className='text-6xl font-semibold leading-snug '>
                    <span className='flex items-center'>
                      Agriculture <img src='/landingDeco.png' alt='landingDeco_1' />
                    </span>
                    & Eco Farming.
                  </h1>
                  <p className='mb-6'>
                    Harnessing technology to revolutionize agriculture, from smart farming techniques to precision
                    agriculture methods. Increase efficiency, optimize resources, and promote environmental
                    sustainability.
                  </p>
                  {userData.id ? (
                    <Link
                      to='/app/dashBoard'
                      className='bg-clr-5 font-semibold hover:bg-res-pending rounded-md hover:shadow-yellow px-6 py-3 hover:text-black'
                    >
                      Manage Farm Now
                    </Link>
                  ) : (
                    <Link
                      to='/login'
                      className='bg-clr-5 font-semibold hover:bg-res-pending rounded-md hover:shadow-yellow px-6 py-3 hover:text-black'
                    >
                      Discover More
                    </Link>
                  )}
                </motion.div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper>
                <motion.div
                  variants={scrollAnimation}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2
                    }
                  }}
                >
                  <motion.img src={'/Hot_Air_Balloon.png'} className='w-96 h-96' loading='lazy'></motion.img>
                </motion.div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </section>
      </main>
      <main>
        <div className='bg-white'>
          <Hero />
        </div>
        <div className='bg-gradient-to-b from-white-300 to-white'>
          <OurService />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer } from '~/components/Layout/Footer';
import { HeaderPage } from '~/components/Layout/Header';
import { Hero } from '~/components/Page/HomePage';
import { userModel } from '~/interfaces';
import { RootState } from '~/storage/redux/store';
import { motion } from 'framer-motion';

export default function HomePage() {
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  return (
    <div className='h-full'>
      <HeaderPage />
      <main>
        <section className='relative h-screen'>
          <div>
            {/* Thẻ div chứa ảnh nền với lớp bg-cover và điều chỉnh độ mờ */}
            <motion.img
              className='absolute inset-0 bg-cover bg-center bg-no-repeat backdropFilter blur-[2px] h-full w-full'
              src={'/homepage_1.jpg'}
              loading='lazy'
            ></motion.img>
            {/* Nội dung */}
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-6 text-center px-4 py-6'>
              <h1 className='text-4xl font-semibold leading-snug text-white'>
                Empowering Agriculture.
                <br />
                Modern Solutions for Sustainable Farming.
              </h1>
              <h2 className='w-9/12 text-lg text-gray-200 mb-6 font-semibold text-bodydark'>
                Harnessing technology to revolutionize agriculture, from smart farming techniques to precision
                agriculture methods. Increase efficiency, optimize resources, and promote environmental sustainability.
              </h2>
              {userData.id ? (
                <Link to='/app/dashBoard' className='btn btn-warning hover:shadow-yellow px-8 py-4 hover:text-white'>
                  Manage Farm Now
                </Link>
              ) : (
                <Link to='/login' className='btn btn-warning hover:shadow-yellow px-8 py-4 hover:text-white'>
                  Start Tracking Now
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <main className='bg-white'>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

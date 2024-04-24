import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Footer } from '~/components/Layout/Footer';
import { HeaderPage } from '~/components/Layout/Header';
import { userModel } from '~/interfaces';
import { RootState } from '~/storage/redux/store';

export default function HomePage() {
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  return (
    <div>
      <header>
        <HeaderPage />
      </header>
      <main>
        <section className='relative h-screen'>
          <div className='h-60'>
            {/* Thẻ div chứa ảnh nền với lớp bg-cover và điều chỉnh độ mờ */}
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat backdropFilter'
              style={{
                backgroundImage: "url('homepage_1.jpg')",
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)'
              }}
            ></div>
            {/* Nội dung */}
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-6 text-center bg-opacity-75 bg-gray-900 px-4 py-6'>
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
                <Link
                  to='/app'
                  className='bg-yellow-400 hover:bg-yellow-300 text-strokedark font-semibold py-3 px-6 rounded-lg'
                >
                  Manage Farm Now &rarr;
                </Link>
              ) : (
                <Link
                  to='/login'
                  className='bg-yellow-400 hover:bg-yellow-300 text-strokedark font-semibold py-3 px-6 rounded-lg'
                >
                  Start Tracking Now
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

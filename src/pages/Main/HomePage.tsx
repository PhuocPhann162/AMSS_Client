import { Link } from 'react-router-dom';
import { HeaderPage } from '~/components';

export default function Home() {
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <header>
        <HeaderPage />
      </header>
      <main>
        <section className='relative h-full'>
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
              Harnessing technology to revolutionize agriculture, from smart farming techniques to precision agriculture
              methods. Increase efficiency, optimize resources, and promote environmental sustainability.
            </h2>
            <Link
              to='/login'
              className='bg-yellow-400 hover:bg-yellow-300 text-strokedark font-semibold py-3 px-6 rounded-lg'
            >
              Start Tracking Now
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

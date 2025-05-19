import { Logo } from '@/common';
import { Outlet } from 'react-router-dom';

export const AuthenticationLayout = () => {
  return (
    <section className='bg-strokedark dark:bg-gray-900'>
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0'>
        <div className='mb-6 mr-6 flex items-center text-gray-900 dark:text-white'>
          <Logo />
        </div>
        <Outlet />
      </div>
    </section>
  );
};

import { NovarisLogo } from '@/components/UI';
import { Outlet } from 'react-router-dom';

export const AuthenticationLayout = () => {
  return (
    <section className='bg-strokedark dark:bg-gray-900'>
      <div className='mx-auto flex min-h-screen flex-col items-center justify-center gap-3 px-6 py-8 lg:py-0'>
        <div className='flex items-center gap-2 text-white'>
          <NovarisLogo size={80} />
          <p className='text-4xl font-bold'>Novaris</p>
        </div>
        <Outlet />
      </div>
    </section>
  );
};

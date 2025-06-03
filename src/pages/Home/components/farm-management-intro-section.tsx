import { AButton, ARawImage } from '@/common/ui-common';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { Link } from 'react-router-dom';

export const FarmManagementIntroSection = () => {
  const userState = useAppSelector((state) => state.auth.user);

  return (
    <section>
      <ARawImage
        src='/homeLanding.png'
        alt='Novaris'
        className='sticky top-0 h-screen'
      />
      <div className='text-white1 relative -mt-[100vh] flex min-h-screen flex-col items-center justify-center gap-4 text-center'>
        <p className='text-2xl font-bold md:text-4xl'>Welcome to Novaris</p>
        <p className='text-4xl font-bold md:text-6xl'>
          Agriculture & Eco Farming
        </p>
        <p className='md:text-lg'>
          Connecting agriculture, ensuring transparent origins
        </p>
        <Link to={userState?.id ? '/app/dashBoard' : '/login'}>
          <AButton type='primary'>
            {userState?.id ? 'Manage Farm Now' : 'Discover More'}
          </AButton>
        </Link>
      </div>
    </section>
  );
};

import { AButton } from '@/common/ui-common';
import { ContainerIgnoreHeader } from '@/components/layout/content/container-ignore-header';
import { Hero } from '@/components/Page/HomePage';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const userState = useAppSelector((state) => state.auth.user);

  return (
    <ContainerIgnoreHeader className='flex max-w-full flex-col'>
      <section className='relative p-12'>
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
          <Link to={userState?.id ? '/app/dashBoard' : '/login'}>
            <AButton type='primary'>
              {userState?.id ? 'Manage Farm Now' : 'Discover More'}
            </AButton>
          </Link>
        </div>
      </section>
      <div className='bg-white'>
        <Hero />
      </div>
    </ContainerIgnoreHeader>
  );
}

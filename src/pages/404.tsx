import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 text-6xl font-semibold text-red-500'>404</h1>
        <p className='mb-4 text-lg text-gray-600'>Oops! Looks like you're lost.</p>
        <div className='animate-bounce'>
          <svg className='mx-auto h-16 w-16 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
            ></path>
          </svg>
        </div>
        <p className='mt-4 text-gray-600'>
          Let's get you back{' '}
          <Link to='/' className='font-bold underline'>
            home
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;

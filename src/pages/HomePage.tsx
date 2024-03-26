import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className='flex flex-col h-5/6 items-center justify-center gap-6 text-center'>
      <h1 className='text-4xl font-semibold leading-snug'>
        You travel the world.
        <br />
        WorldWise keeps track of your adventures.
      </h1>
      <h2 className='w-9/12 text-lg text-gray-400 mb-6 font-semibold'>
        A world map that tracks your footsteps into every city you can think of. Never forget your wonderful
        experiences, and show your friends how you have wandered the world.
      </h2>
      <Link to='/login' className='bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-semibold py-3 px-6 rounded-lg'>
        Start Tracking Now
      </Link>
    </section>
  );
}

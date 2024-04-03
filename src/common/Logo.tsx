import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/' className='flex items-center'>
      <img className='h-12 md:h-13' src='/logo.png' alt='WorldWise logo' />
    </Link>
  );
}

export default Logo;

import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/' className='flex items-center'>
      <img className='md:h-13 h-12' src='/logo.png' alt='WorldWise logo' />
    </Link>
  );
}

export default Logo;

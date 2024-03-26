import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/'>
      <img className='h-12' src='/logo.png' alt='WorldWise logo' />
    </Link>
  );
}

export default Logo;

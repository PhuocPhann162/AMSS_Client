import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to='/' className='flex items-center'>
      {/* Kích thước của logo sẽ thay đổi tùy thuộc vào kích thước màn hình */}
      <img className='h-12 md:h-13' src='/logo.png' alt='WorldWise logo' />
    </Link>
  );
}

export default Logo;

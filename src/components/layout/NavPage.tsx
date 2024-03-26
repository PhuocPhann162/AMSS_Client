import { NavLink } from 'react-router-dom';
import { Logo } from '..';

function NavPage() {
  return (
    <nav className='flex items-center justify-between bg-nav h-20 px-10'>
      <Logo />
      <div className='flex items-center gap-16'>
        <NavLink to='/product' className=' uppercase text-base font-medium'>
          Product
        </NavLink>
        <NavLink to='/pricing' className=' uppercase text-base font-medium'>
          Pricing
        </NavLink>
        <NavLink to='/login' className='bg-primary text-nav uppercase px-6 py-2 rounded-lg font-medium'>
          Log in
        </NavLink>
      </div>
    </nav>
  );
}

export default NavPage;

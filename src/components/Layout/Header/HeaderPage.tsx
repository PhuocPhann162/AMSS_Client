import { NavLink } from 'react-router-dom';
import { Logo } from '~/common';

function HeaderPage() {
  return (
    <div className='navbar bg-base-100 px-8'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
            </svg>
          </div>
          <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className='text-xl'>
          <Logo />
        </div>
      </div>
      <div className='navbar-center hidden lg:flex text-slate-300'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <NavLink to='/product' className='text-lg font-medium'>
              Product
            </NavLink>
          </li>
          <li>
            <details className='text-lg'>
              <summary>Parent</summary>
              <ul className='p-2'>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to='/pricing' className='text-lg font-medium'>
              Pricing
            </NavLink>
          </li>
        </ul>
      </div>

      <div className='navbar-end'>
        <NavLink to='/login' className='btn btn-primary text-base text-white px-6 py-2 rounded-lg font-medium'>
          Log in
        </NavLink>
      </div>
    </div>
  );
}

export default HeaderPage;

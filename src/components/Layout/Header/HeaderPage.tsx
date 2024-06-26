import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Logo } from '~/common';
import { userModel } from '~/interfaces';
import { emptyUserState, setLoggedInUser } from '~/storage/redux/authSlice';
import { RootState } from '~/storage/redux/store';
import DropdownUser from './DropdownUser';

function HeaderPage() {
  const dispatch = useDispatch();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.reload();
  };

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
        {userData.id ? (
          <>
            <div className='absolute flex items-center gap-3 2xsm:gap-7'>
              {/* <!-- User Area --> */}
              <DropdownUser />
              {/* <!-- User Area --> */}
              <button
                className='btn btn-warning text-base text-white px-8 py-2 font-medium rounded-full'
                onClick={handleLogout}
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <NavLink
            to='/login'
            className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-green-500 text-green-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-green-500 hover:text-white transition-all hover:shadow-green'
          >
            Sign in
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default HeaderPage;

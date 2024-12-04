import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '~/common';
import { userModel } from '~/interfaces';
import { emptyUserState, setLoggedInUser } from '~/storage/redux/authSlice';
import { RootState } from '~/storage/redux/store';
import DropdownUser from './DropdownUser';
import { AButton } from '~/common/ui-common';

function HeaderPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.reload();
  };

  return (
    <div className={`navbar bg-transparent px-8`}>
      <div className='navbar-start'>
        <div className='text-xl'>
          <Logo />
        </div>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 text-lg font-medium'>
          <NavLink
            to='/'
            className={
              'px-4 py-2 mx-2 cursor-pointer animation-home-hover inline-block relative' +
              (location.pathname === '/'
                ? ' text-res-pending animation-home-active'
                : ' text-slate-300 hover:text-res-pending a')
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/about'
            className={
              'px-4 py-2 mx-2 cursor-pointer animation-home-hover inline-block relative' +
              (location.pathname === '/about'
                ? ' text-res-pending animation-home-active '
                : ' text-slate-300 hover:text-res-pending a')
            }
          >
            About us
          </NavLink>
          <NavLink
            to='/product'
            className={
              'px-4 py-2 mx-2 cursor-pointer animation-home-hover inline-block relative' +
              (location.pathname === '/product'
                ? ' text-res-pending animation-home-active '
                : ' text-slate-300 hover:text-res-pending a')
            }
          >
            Product
          </NavLink>
        </ul>
      </div>

      <div className='navbar-end'>
        {userData.id ? (
          <>
            <div className='absolute flex items-center gap-3 2xsm:gap-7'>
              {/* <!-- User Area --> */}
              {location.pathname.includes('/app') && <DropdownUser />}
              {/* <!-- User Area --> */}
              <AButton
                onClick={handleLogout}
                className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-res-pending text-res-pending outline-none rounded-l-full rounded-r-full capitalize hover:bg-res-pending hover:text-black transition-all hover:shadow-yellow'
              >
                Sign in
              </AButton>
            </div>
          </>
        ) : (
          <NavLink
            to='/login'
            className='font-medium tracking-wide py-2 px-5 sm:px-8 border border-res-pending text-res-pending outline-none rounded-l-full rounded-r-full capitalize hover:bg-res-pending hover:text-black transition-all hover:shadow-yellow'
          >
            Sign in
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default HeaderPage;

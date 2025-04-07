import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/common';
import { userModel } from '@/interfaces';
import { emptyUserState, setLoggedInUser } from '@/storage/redux/authSlice';
import { RootState } from '@/storage/redux/store';
import { AButton } from '@/common/ui-common';
import { useIsMobile } from '@/hooks';
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/Sidebar';
import { HeaderUnderOverlay, DropdownUser } from '@/components/Layout/Header';
import { dashboardRoutes } from '@/routes';

export const HeaderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore,
  );
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.reload();
  };

  return (
    <HeaderUnderOverlay
      rootClassName='sticky inset-x-0 top-0 z-50'
      className='flex h-[--navbar-height] items-center justify-between bg-white/85 px-6 backdrop-blur'
    >
      <LogoLink />

      {!isMobile ? (
        <>
          <div className='flex gap-5'>
            {dashboardRoutes.map((route, index) => (
              <NavLink
                key={index}
                to={route.path}
                className={({ isActive }) =>
                  `font-semibold uppercase text-gray-700 transition-colors duration-300 hover:text-black ${isActive ? 'text-black' : ''}`
                }
              >
                {route.name}
              </NavLink>
            ))}
          </div>
          {!userData.id ? <ButtonSignIn /> : <DropdownUser />}
        </>
      ) : (
        <SidebarTrigger />
      )}
    </HeaderUnderOverlay>
  );
};

function ButtonSignIn() {
  return (
    <Link to={'login'}>
      <AButton>Sign in</AButton>
    </Link>
  );
}

function LogoLink() {
  return (
    <Link to='/' className='text-2xl font-bold uppercase'>
      Novaris
    </Link>
  );
}

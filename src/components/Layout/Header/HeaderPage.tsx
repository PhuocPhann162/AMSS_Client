import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/common';
import { userModel } from '@/interfaces';
import { emptyUserState, setLoggedInUser } from '@/storage/redux/authSlice';
import { RootState } from '@/storage/redux/store';
import { AButton } from '@/common/ui-common';
import { useIsMobile } from '@/hooks/useIsMobile';
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

const paths: { path: string; name: string }[] = [
  { path: 'store', name: 'Store' },
  { path: 'store', name: 'About Us' },
  { path: 'store', name: 'Introduction' },
];

export const HeaderPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore,
  );
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    window.location.reload();
  };

  return (
    <HeaderUnderOverlay className='sticky inset-x-0 top-0 z-50 flex h-[--navbar-height] items-center justify-between bg-white/85 px-6 backdrop-blur'>
      {isMobile && (
        <Sidebar className='[border:initial] md:pt-16'>
          <SidebarContent>
            <SidebarGroupContent>
              <SidebarMenu>
                {paths.map((route) => (
                  <SidebarMenuItem
                    key={route.name}
                    onClick={() => setOpenMobile(false)}
                  >
                    <SidebarMenuButton asChild>
                      <Link to={route.path}>
                        <p>{route.name}</p>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarContent>
        </Sidebar>
      )}
      <LogoLink />

      {!isMobile ? (
        <>
          <div className='flex gap-5'>
            {paths.map((path, index) => (
              <NavLink
                key={index}
                to={path.path}
                className={({ isActive }) =>
                  `font-semibold uppercase text-gray-700 transition-colors duration-300 hover:text-black ${isActive ? 'text-black' : ''}`
                }
              >
                {path.name}
              </NavLink>
            ))}
          </div>
          {!userData.id && <ButtonSignIn />}
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

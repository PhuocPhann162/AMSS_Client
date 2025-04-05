import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Logo } from '@/common';
import { userModel } from '@/interfaces';
import { emptyUserState, setLoggedInUser } from '@/storage/redux/authSlice';
import { RootState } from '@/storage/redux/store';
import DropdownUser from './DropdownUser';
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

const paths: { path: string; name: string }[] = [
  { path: 'store', name: 'Store' },
  { path: 'store', name: 'About Us' },
  { path: 'store', name: 'Introduction' },
];

function HeaderPage() {
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
    <header className='sticky inset-x-0 top-0 z-50'>
      <div className='pointer-events-none absolute inset-x-0 h-[calc(var(--navbar-height)*3/2)] bg-gradient-to-b from-white/85 backdrop-blur [clip-path:inset(var(--navbar-height)_0_0_0)] [mask:linear-gradient(white,white,transparent)]'></div>
      {/* <div className='pointer-events-none absolute inset-x-0 h-[calc(var(--navbar-height)*6/5)] bg-gradient-to-b from-white/75 backdrop-blur duration-200 [mask:linear-gradient(white,white,transparent)]'></div> */}
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
      <div className='relative flex h-[--navbar-height] items-center justify-between bg-white/85 px-6 backdrop-blur'>
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
      </div>
    </header>
  );
}

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

export default HeaderPage;

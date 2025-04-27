import { Link, NavLink } from 'react-router-dom';
import { AButton } from '@/common/ui-common';
import { useIsMobile } from '@/hooks';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { HeaderUnderOverlay, DropdownUser } from '@/components/Layout/Header';
import { dashboardRoutes } from '@/routes';
import { useAppSelector } from '@/hooks';

export const HeaderPage = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const isMobile = useIsMobile();

  return (
    <HeaderUnderOverlay
      classNames={{
        root: 'sticky inset-x-0 top-0 z-50',
        header:
          'flex h-[--navbar-height] items-center justify-between bg-white/85 px-6 [backdrop-filter:saturate(180%)_blur(20px)]',
      }}
    >
      <LogoLink />

      {!isMobile ? (
        <>
          <div className='flex gap-5'>
            {dashboardRoutes.map((route, index) => (
              <NavLink
                key={index}
                to={route.path || ''}
                className={({ isActive }) =>
                  `font-medium uppercase text-abbey-800 transition-colors duration-300 hover:text-abbey-950 ${isActive ? 'text-abbey-950' : ''}`
                }
              >
                {route.label}
              </NavLink>
            ))}
          </div>
          {!userData ? <ButtonSignIn /> : <DropdownUser />}
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

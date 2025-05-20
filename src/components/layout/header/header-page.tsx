import { AButton } from '@/common/ui-common';
import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { HeaderUnderOverlay } from '@/components/layout/header/header-under-overlay';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { DrawerCart } from '@/features/cart/components/drawer-cart';
import { useIsMobile } from '@/hooks';

import { dashboardRoutes } from '@/routes';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const HeaderPage = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const isMobile = useIsMobile();

  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <>
      <HeaderUnderOverlay
        enableHiding
        classNames={{
          root: 'sticky inset-x-0 top-0 z-50',
          header: 'flex h-[--navbar-height] items-center justify-between px-6',
        }}
      >
        <LogoLink />

        {!isMobile && (
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
        )}

        <div className='flex items-center gap-6'>
          <ShoppingCartOutlined
            onClick={() => setOpenCartDrawer(true)}
            className='text-xl'
          />

          {!isMobile && (userData ? <DropdownUser /> : <ButtonSignIn />)}

          {!!isMobile && <SidebarTrigger />}
        </div>
      </HeaderUnderOverlay>
      <DrawerCart
        open={openCartDrawer}
        onCancel={() => setOpenCartDrawer(false)}
        onNavigateCartPage={() => setOpenCartDrawer(false)}
        onClickCartItem={() => setOpenCartDrawer(false)}
      />
    </>
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

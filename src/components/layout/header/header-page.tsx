import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { HomeHeader } from '@/components/layout/header/home-header';
import { ButtonSignIn } from '@/components/ui/button-sign-in';
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
      <HomeHeader rootClassName='fixed inset-x-0 top-0 z-50 flex h-[--navbar-height] gap-12 items-center justify-between px-6 md:px-10'>
        {!!isMobile && <SidebarTrigger />}
        <LogoLink />

        {!isMobile && (
          <div className='flex gap-5'>
            {dashboardRoutes.map((route, index) => (
              <NavLink
                key={index}
                to={route.path || ''}
                className={`font-medium uppercase transition-colors duration-300`}
              >
                {route.label}
              </NavLink>
            ))}
          </div>
        )}

        <div className='flex items-center gap-4'>
          <ShoppingCartOutlined
            onClick={() => setOpenCartDrawer(true)}
            className='text-xl'
          />

          {!isMobile && (userData ? <DropdownUser /> : <ButtonSignIn />)}
        </div>
      </HomeHeader>
      <DrawerCart
        open={openCartDrawer}
        onCancel={() => setOpenCartDrawer(false)}
        onNavigateCartPage={() => setOpenCartDrawer(false)}
        onClickCartItem={() => setOpenCartDrawer(false)}
      />
    </>
  );
};

function LogoLink() {
  return (
    <Link to='/'>
      <h1 className='text-xl font-bold uppercase'>Novaris</h1>
    </Link>
  );
}

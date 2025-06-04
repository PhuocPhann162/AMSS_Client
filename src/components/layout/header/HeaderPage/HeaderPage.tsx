import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { BadgeCartIcon } from '@/components/layout/header/HeaderPage/BadgeCartIcon';
import { UserIcon } from '@/components/layout/header/HeaderPage/UserIcon';
import { HomeHeader } from '@/components/layout/header/HomeHeader';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { DrawerCart } from '@/features/cart/components/drawer-cart';
import { useIsMobile } from '@/hooks';

import { dashboardRoutes } from '@/routes';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const HeaderPage = () => {
  const isMobile = useIsMobile();

  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <>
      <HomeHeader
        className='fixed inset-x-0 top-0 z-50 h-[--navbar-height]'
        classNames={{
          content: 'flex items-center gap-12 justify-between',
        }}
      >
        {!!isMobile && <SidebarTrigger />}
        <Link to='/' className='text-xl font-bold uppercase'>
          Novaris
        </Link>

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

        <div className='flex items-center gap-6'>
          <BadgeCartIcon onIconClick={() => setOpenCartDrawer(true)} />

          {!isMobile && (
            <DropdownUser>
              {(user) =>
                user?.id ? (
                  <UserIcon />
                ) : (
                  <Link to='/login'>
                    <UserIcon />
                  </Link>
                )
              }
            </DropdownUser>
          )}
        </div>
      </HomeHeader>
      <DrawerCart
        open={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
        onNavigateCartPage={() => setOpenCartDrawer(false)}
        onClickCartItem={() => setOpenCartDrawer(false)}
      />
    </>
  );
};

import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { BadgeCartIcon } from '@/components/layout/header/header-page/badge-cart-icon';
import { UserIcon } from '@/components/layout/header/header-page/user-icon';
import { HomeHeader } from '@/components/layout/header/home-header';
import { NovarisLogo } from '@/components/UI';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { DrawerCart } from '@/features/cart/components/drawer-cart';
import { useIsMobile } from '@/hooks';

import { dashboardRoutes } from '@/routes';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface HeaderPageProps {
  hasHeaderOffset?: boolean;
}

export const HeaderPage = ({ hasHeaderOffset }: HeaderPageProps) => {
  const isMobile = useIsMobile();

  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  return (
    <>
      <HomeHeader
        className={twMerge(
          'inset-x-0 top-0 z-50 h-[--navbar-height]',
          hasHeaderOffset ? 'sticky' : 'fixed',
        )}
        classNames={{
          content: 'flex items-center gap-12 justify-between',
        }}
      >
        {!!isMobile && <SidebarTrigger />}
        <Link to='/' className='flex items-center text-xl font-bold uppercase'>
          <NovarisLogo className='bg-none' />
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
          <BadgeCartIcon onClick={() => setOpenCartDrawer(true)} />

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

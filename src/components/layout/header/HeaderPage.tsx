import { useAuthGetCartQuery } from '@/api/cart-api';
import { ABadge } from '@/common/ui-common';
import { DropdownUser } from '@/components/layout/header/dropdown-user';
import { HomeHeader } from '@/components/layout/header/HomeHeader';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { semanticColors } from '@/configs/colors';
import { DrawerCart } from '@/features/cart/components/drawer-cart';
import { useIsMobile } from '@/hooks';

import { dashboardRoutes } from '@/routes';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import type { GetProps, GetRef } from 'antd/es/_util/type';
import { forwardRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const HeaderPage = () => {
  const isMobile = useIsMobile();

  const [openCartDrawer, setOpenCartDrawer] = useState(false);

  const getCart = useAuthGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

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
          <ABadge
            count={
              getCartData?.result.cartItems?.length
                ? getCartData?.result.cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )
                : undefined
            }
            size='small'
            color={semanticColors['green']}
          >
            <ShoppingCartOutlined
              onClick={() => setOpenCartDrawer(true)}
              className='text-xl'
            />
          </ABadge>

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

type UserIconRef = GetRef<typeof UserOutlined>;
type UserIconProps = GetProps<typeof UserOutlined>;

const UserIcon = forwardRef<UserIconRef, UserIconProps>((props, ref) => {
  return (
    <UserOutlined
      ref={ref}
      {...props}
      className={twMerge('cursor-pointer p-2', props.className)}
    />
  );
});

UserIcon.displayName = 'UserIcon';

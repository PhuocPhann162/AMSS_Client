import { ABadge, AButton } from '@/common/ui-common';
import { DropdownUser, HeaderUnderOverlay } from '@/components/Layout/Header';
import { SidebarTrigger } from '@/components/ui/Sidebar';
import { ModalCart } from '@/features/cart/components/ModalCart';
import { useAppSelector, useIsMobile } from '@/hooks';
import { useGetCart } from '@/hooks/cart/useGetCart';
import { dashboardRoutes } from '@/routes';
import ShoppingCartOutlined from '@ant-design/icons/ShoppingCartOutlined';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const HeaderPage = () => {
  const userData = useAppSelector((state) => state.auth.user);
  const isMobile = useIsMobile();

  const [modalOpen, setModalOpen] = useState(false);

  const getCartHook = useGetCart();

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

        <ABadge
          count={getCartHook.cart?.cartItems?.reduce(
            (total, item) => total + item.quantity,
            0,
          )}
        >
          <AButton
            type='text'
            onClick={() => setModalOpen(true)}
            icon={<ShoppingCartOutlined className='text-2xl' />}
          />
        </ABadge>

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
      <ModalCart
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        onNavigateCartPage={() => {
          setModalOpen(false);
        }}
        onClickCartItem={() => {
          setModalOpen(false);
        }}
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

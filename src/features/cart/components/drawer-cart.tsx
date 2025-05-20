import { useGetCartQuery } from '@/api/cart-api';
import { AButton, ADrawer, AImage } from '@/common/ui-common';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { Link, useNavigate } from 'react-router-dom';

export interface DrawerCart {
  onCancel?: () => void;
  onNavigateCartPage?: () => void;
  onClickCartItem?: () => void;
  open?: boolean;
}

export const DrawerCart = ({
  onCancel,
  onNavigateCartPage,
  onClickCartItem,
  open,
}: DrawerCart) => {
  const navigate = useNavigate();

  const getCart = useGetCartQuery();

  const cart = getCart.currentData?.result;

  return (
    <ADrawer
      open={open}
      onClose={onCancel}
      destroyOnClose
      title='Cart'
      footer={
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <p className='font-bold'>Total</p>
            <p className='text-xl font-bold'>{cart?.cartTotal ?? 0}</p>
          </div>
          <AButton
            type='primary'
            icon={<CheckOutlined />}
            onClick={() => {
              onNavigateCartPage?.();

              navigate('/store/cart');
            }}
          >
            Checkout
          </AButton>
        </div>
      }
    >
      {!cart?.cartItems?.length && (
        <p className='text-2xl font-bold'>Cart is empty</p>
      )}

      {!!cart?.cartItems?.length && (
        <>
          {cart?.cartItems?.map((item) => (
            <Link
              to={`/store/commodity/${item.commodityId}`}
              key={item.commodityId}
              className='flex items-center gap-4'
              onClick={onClickCartItem}
            >
              <AImage src={item.commodityImage} preview={false} height={100} />
              <p className='font-bold'>{item.commodityName}</p>
            </Link>
          ))}
        </>
      )}
    </ADrawer>
  );
};

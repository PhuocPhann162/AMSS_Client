import {
  useAddUpdateCartItemMutation,
  useAuthGetCartQuery,
} from '@/api/cart-api';
import { ADrawer, AImage } from '@/common/ui-common';
import { QuantityCounterInput } from '@/features/cart/components/quantity-counter-input';
import { formatCurrency } from '@/utils/format-currency';
import {
  CheckOutlined,
  CloseOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import Button from 'antd/es/button';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export interface DrawerCartProps {
  onClose?: () => void;
  onNavigateCartPage?: () => void;
  onClickCartItem?: () => void;
  open?: boolean;
}

export const DrawerCart = ({
  onClose,
  onNavigateCartPage,
  open,
}: DrawerCartProps) => {
  const navigate = useNavigate();

  const getCart = useAuthGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  const [addUpdateCartItem] = useAddUpdateCartItemMutation();

  const debouncedAddUpdateCartItem = useDebouncedCallback(
    addUpdateCartItem,
    500,
  );

  return (
    <ADrawer
      open={open}
      onClose={onClose}
      destroyOnClose
      title='Cart'
      footer={
        getCartData?.result.cartItems?.length ? (
          <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-medium'>Subtotal</p>
              <p className='text-xl font-bold'>
                {formatCurrency(
                  getCartData.result.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  ),
                )}
              </p>
            </div>
            <Button
              type='primary'
              icon={<CheckOutlined />}
              onClick={() => {
                onNavigateCartPage?.();

                navigate('/store/cart');
              }}
            >
              Review cart
            </Button>
          </div>
        ) : undefined
      }
    >
      {!getCartData?.result.cartItems?.length && !getCart.isFetching && (
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-medium'>
            Looks like you haven’t added anything yet, let’s get you started!
          </p>
          <Button
            type='primary'
            iconPosition='end'
            icon={<DoubleRightOutlined />}
            onClick={() => {
              onClose?.();

              navigate('/store');
            }}
          >
            Continue Shopping
          </Button>
        </div>
      )}

      {!!getCartData?.result.cartItems?.length && (
        <div className='flex flex-col gap-4'>
          {getCartData?.result.cartItems?.map((item) => (
            <div key={item.commodityId} className='flex gap-4'>
              <AImage
                src={item.commodityImage}
                preview={false}
                rootClassName='w-20 rounded-lg overflow-hidden shrink-0'
              />
              <div className='flex grow justify-between gap-2'>
                <div className='flex flex-col gap-2'>
                  <p className='font-semibold'>{item.commodityName}</p>
                  <div className='flex items-center gap-2'>
                    <QuantityCounterInput
                      defaultQuantity={item.quantity}
                      size='small'
                      min={1}
                      onQuantityChange={async (value) => {
                        try {
                          await debouncedAddUpdateCartItem({
                            commodityId: item.commodityId,
                            updateQuantityBy: value,
                          });
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    />
                    <Button
                      icon={<CloseOutlined />}
                      variant='text'
                      color='primary'
                      onClick={async () => {
                        try {
                          await addUpdateCartItem({
                            commodityId: item.commodityId,
                            updateQuantityBy: 0,
                          });
                        } catch (error) {
                          console.error(error);
                        }
                      }}
                    />
                  </div>
                </div>
                <p className='font-bold'>{formatCurrency(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ADrawer>
  );
};

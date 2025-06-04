import {
  useAddUpdateCartItemMutation,
  useAuthGetCartQuery,
} from '@/api/cart-api';
import { ADrawer, AImage } from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { QuantityCounterInput } from '@/features/cart/components/QuantityCounterInput';
import type { AddUpdateCartItemRequest } from '@/models/request/cart/cart-request';
import { formatUsd } from '@/utils/number/format-usd';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import DoubleRightOutlined from '@ant-design/icons/DoubleRightOutlined';
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
    async (payload: AddUpdateCartItemRequest) => {
      try {
        await addUpdateCartItem(payload);
      } catch (error) {
        console.error(error);
      }
    },
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
              <p className='text-lg font-medium'>Total</p>
              <p className='text-xl font-bold'>
                {formatUsd(
                  getCartData.result.cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0,
                  ),
                )}
              </p>
            </div>
            <AHomeButton
              type='primary'
              icon={<CheckOutlined />}
              onClick={() => {
                onNavigateCartPage?.();

                navigate('/store/cart');
              }}
            >
              Checkout
            </AHomeButton>
          </div>
        ) : undefined
      }
    >
      {!getCartData?.result.cartItems?.length && !getCart.isFetching && (
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-medium'>
            Looks like you haven’t added anything yet, let’s get you started!
          </p>
          <AHomeButton
            type='primary'
            iconPosition='end'
            icon={<DoubleRightOutlined />}
            onClick={() => {
              onClose?.();

              navigate('/store');
            }}
          >
            Continue Shopping
          </AHomeButton>
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
                    <AHomeButton
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
                <p className='font-bold'>{formatUsd(item.price)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </ADrawer>
  );
};

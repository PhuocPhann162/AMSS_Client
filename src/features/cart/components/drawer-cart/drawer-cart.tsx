import {
  useAddUpdateCartItemMutation,
  useAuthGetCartQuery,
} from '@/api/cart-api';
import { AButton, ADrawer, AImage } from '@/common/ui-common';
import { ButtonContinueShopping } from '@/features/cart/components/button-continue-shopping';
import { QuantitySelector } from '@/features/cart/components/quantity-selector';
import { formatUsd } from '@/utils/number/format-usd';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import { useNavigate } from 'react-router-dom';

export interface DrawerCartProps {
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
}: DrawerCartProps) => {
  const navigate = useNavigate();

  const getCart = useAuthGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  const [addUpdateCartItem, addUpdateCartItemResult] =
    useAddUpdateCartItemMutation();

  return (
    <ADrawer
      open={open}
      onClose={onCancel}
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
        ) : undefined
      }
    >
      {!getCartData?.result.cartItems?.length && !getCart.isFetching && (
        <div className='flex flex-col gap-4'>
          <p className='text-lg font-medium'>
            Looks like you haven’t added anything yet, let’s get you started!
          </p>
          <ButtonContinueShopping onClick={onCancel} />
        </div>
      )}

      {!!getCartData?.result.cartItems?.length && (
        <div className='flex flex-col gap-4'>
          {getCartData?.result.cartItems?.map((item) => (
            <div
              key={item.commodityId}
              className='flex gap-4'
              // onClick={onClickCartItem}
            >
              <AImage
                src={item.commodityImage}
                preview={false}
                rootClassName='w-20 rounded-lg overflow-hidden shrink-0'
              />
              <div className='flex grow justify-between gap-2'>
                <div className='flex flex-col gap-2'>
                  <p className='font-semibold'>{item.commodityName}</p>
                  <QuantitySelector
                    enableClear
                    defaultValue={item.quantity}
                    disabled={addUpdateCartItemResult.isLoading}
                    onClear={async () => {
                      try {
                        await addUpdateCartItem({
                          commodityId: item.commodityId,
                          updateQuantityBy: 0,
                        });
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    onChange={async (value) => {
                      try {
                        await addUpdateCartItem({
                          commodityId: item.commodityId,
                          updateQuantityBy: value,
                        });
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  />
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

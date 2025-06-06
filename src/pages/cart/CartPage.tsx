import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { ADivider, ARawImage } from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { QuantitySelector } from '@/features/cart/components/QuantitySelector';
import { TitleContentSection } from '@/pages/cart/components/TitleContentSection';
import { formatUsd } from '@/utils/number/format-usd';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

export const CartPage = () => {
  const getCart = useGetCartQuery();
  const getCartData =
    getCart.data && !getCart.isError ? getCart.data : undefined;

  const navigate = useNavigate();

  const [addUpdateCartItem] = useAddUpdateCartItemMutation();

  const debouncedAddUpdateCartItem = useDebouncedCallback(
    addUpdateCartItem,
    500,
  );

  return (
    <div className='grid grid-cols-1 gap-6 p-6 pt-0 md:grid-cols-5'>
      <TitleContentSection headerTitle='Your cart' className='md:col-span-3'>
        {getCartData?.result.cartItems?.length ? (
          getCartData.result.cartItems.map((item, index, arr) => (
            <Fragment key={index}>
              {/* TODO: handle reponsive when 320px width */}
              <div className='flex items-center gap-4'>
                <ARawImage
                  src={item?.commodityImage}
                  alt={item?.commodityName}
                  className='aspect-square w-16 shrink-0 rounded-lg md:w-24'
                />
                <div className='flex grow flex-col gap-2'>
                  <p className='font-medium'>{item?.commodityName}</p>
                  <QuantitySelector
                    size={'small'}
                    defaultQuantity={item.quantity}
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
                  />
                </div>
                <p>{formatUsd(item?.price)}</p>
              </div>
              {index < arr.length - 1 && <ADivider />}
            </Fragment>
          ))
        ) : (
          <p className='text-2xl font-bold'>Cart is empty</p>
        )}
      </TitleContentSection>
      <div className='md:col-span-2'>
        <TitleContentSection
          headerTitle='Summary'
          className='md:sticky md:top-[--navbar-height]'
        >
          <div className='flex justify-between'>
            <p className='font-bold'>Subtotal</p>
            <p>
              {formatUsd(
                getCartData?.result.cartItems?.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0,
                ) ?? 0,
              )}
            </p>
          </div>
          <div className='flex justify-between'>
            <p className='font-bold'>Total</p>
            <p>{formatUsd(getCartData?.result.cartTotal ?? 0)}</p>
          </div>
          <AHomeButton
            type='primary'
            onClick={() => {
              navigate('/store/payment');
            }}
          >
            Checkout
          </AHomeButton>
        </TitleContentSection>
      </div>
    </div>
  );
};

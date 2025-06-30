import { useAddUpdateCartItemMutation, useGetCartQuery } from '@/api/cart-api';
import { ADivider, ARawImage } from '@/common/ui-common';
import { CommodityCategoryTag } from '@/components/UI/tag/commodity-category-tag';
import { QuantitySelector } from '@/features/cart/components/quantity-selector';
import { CouponsSection } from '@/pages/cart/components/coupons-section';
import { AppliedCouponSection } from '@/pages/cart/components/applied-coupon-section';
import { TitleContentSection } from '@/pages/cart/components/title-content-section';
import { formatCurrency } from '@/utils/format-currency';
import Button from 'antd/es/button';
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
      <div className='space-y-6 md:col-span-3'>
        <TitleContentSection headerTitle='Your cart'>
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
                    <div className='flex items-center gap-2'>
                      <p className='font-medium'>{item?.commodityName}</p>
                      <CommodityCategoryTag value={item?.commodityCategory} />
                    </div>
                    <p className='font-medium text-gray-500'>
                      {item?.commodityDescription}.
                    </p>
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
                  <p>{formatCurrency(item?.price)}</p>
                </div>
                {index < arr.length - 1 && <ADivider />}
              </Fragment>
            ))
          ) : (
            <p className='text-2xl font-bold'>Cart is empty</p>
          )}
        </TitleContentSection>

        {/* Hiển thị coupon section dựa trên trạng thái có coupon code hay không */}
        {getCartData?.result.couponCode ? (
          <AppliedCouponSection
            couponCode={getCartData.result.couponCode}
            discount={getCartData.result.discount ?? 0}
          />
        ) : (
          <CouponsSection />
        )}
      </div>

      <div className='md:col-span-2'>
        <TitleContentSection
          headerTitle='Summary'
          className='md:sticky md:top-[--navbar-height]'
        >
          <div className='flex justify-between'>
            <p className='font-bold'>Subtotal</p>
            <p>
              {formatCurrency(
                getCartData?.result.cartItems?.reduce(
                  (total, item) => total + item.quantity * item.price,
                  0,
                ) ?? 0,
              )}
            </p>
          </div>
          <div className='flex justify-between text-yellow-600'>
            <p className='font-bold'>Discount</p>
            <p>-{formatCurrency(getCartData?.result?.discount ?? 0)}</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-bold'>Total</p>
            <p>{formatCurrency(getCartData?.result.cartTotal ?? 0)}</p>
          </div>
          <Button
            type='primary'
            onClick={() => {
              navigate('/store/payment');
            }}
          >
            Checkout
          </Button>
        </TitleContentSection>
      </div>
    </div>
  );
};

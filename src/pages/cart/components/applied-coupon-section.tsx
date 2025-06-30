import { useRemoveCouponMutation } from '@/api/cart-api';
import { AButton } from '@/common/ui-common';
import { toastNotify } from '@/helper';
import { apiResponse } from '@/interfaces';
import { formatCurrency } from '@/utils/format-currency';
import { FaTimes } from 'react-icons/fa';

interface AppliedCouponSectionProps {
  couponCode: string;
  discount: number;
}

export const AppliedCouponSection = ({
  couponCode,
  discount,
}: AppliedCouponSectionProps) => {
  const [removeCoupon, { isLoading: isRemovingCoupon }] =
    useRemoveCouponMutation();

  const handleRemoveCoupon = async () => {
    try {
      const result = await removeCoupon().unwrap();
      if (result.isSuccess) {
        toastNotify('Coupon removed successfully!');
      }
    } catch (error) {
      console.error('Failed to remove coupon:', error);
      toastNotify(
        (error as apiResponse).data?.errorMessages?.[0] ||
          'An error occurred while removing the coupon.',
      );
    }
  };

  return (
    <div className='w-full border-t border-gray-200 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2'>
            <span className='text-sm font-medium text-green-700'>
              Coupon Applied
            </span>
            <span className='rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-800'>
              {couponCode}
            </span>
          </div>
          <span className='text-sm text-gray-600'>
            -{formatCurrency(discount)}
          </span>
        </div>
        <AButton
          variant='text'
          color='red'
          size='small'
          onClick={handleRemoveCoupon}
          disabled={isRemovingCoupon}
          className='flex items-center gap-1'
          aria-label='Remove coupon'
        >
          <FaTimes className='h-3 w-3' />
          Remove
        </AButton>
      </div>
    </div>
  );
};

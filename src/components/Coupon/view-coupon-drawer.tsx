import { ADrawer } from '@/common/ui-common/atoms/a-drawer/a-drawer';
import { Coupon } from '@/interfaces/coupons';
import { format, isValid } from 'date-fns';

interface ViewCouponDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  coupon?: Coupon;
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'PPP p') : 'Invalid date';
};

export const ViewCouponDrawer = ({
  isOpen,
  onClose,
  coupon,
}: ViewCouponDrawerProps) => {
  if (!coupon) return null;

  return (
    <ADrawer
      title='Coupon Details'
      placement='right'
      onClose={onClose}
      open={isOpen}
      width={500}
    >
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Basic Information
          </h3>
          <div className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Title
              </label>
              <p className='mt-1 text-sm text-gray-900'>{coupon.title}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <p className='mt-1 text-sm text-gray-900'>{coupon.description}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Code
              </label>
              <p className='mt-1 text-sm text-gray-900'>{coupon.code}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Discount Information
          </h3>
          <div className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Discount Amount
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {coupon.discountAmount}%
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Minimum Amount
              </label>
              <p className='mt-1 text-sm text-gray-900'>${coupon.minAmount}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-lg font-semibold text-gray-900'>
            Timing Information
          </h3>
          <div className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Expiration Date
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {formatDate(coupon.expiration)}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Created At
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {formatDate(coupon.createdAt)}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Last Updated
              </label>
              <p className='mt-1 text-sm text-gray-900'>
                {formatDate(coupon.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ADrawer>
  );
};

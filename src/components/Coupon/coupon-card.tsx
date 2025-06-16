import { Coupon } from '@/interfaces/coupons';
import { AButton } from '@/common/ui-common/atoms/a-button';

type CouponCardProps = {
  coupon: Coupon;
  onViewEdit: (couponId: string) => void;
  onDelete: (couponId: string) => void;
};

type CouponStatus = 'active' | 'expired' | 'expiring-soon';

const getCouponStatus = (expirationDate: string): CouponStatus => {
  const now = new Date();
  const expDate = new Date(expirationDate);
  const daysUntilExpiration = Math.ceil(
    (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 7) return 'expiring-soon';
  return 'active';
};

const getStatusStyles = (status: CouponStatus) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'expired':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'expiring-soon':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }
};

const getStatusText = (status: CouponStatus) => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'expired':
      return 'Expired';
    case 'expiring-soon':
      return 'Expiring Soon';
  }
};

export const CouponCard = (props: CouponCardProps) => {
  const { coupon, onViewEdit, onDelete } = props;

  const status = getCouponStatus(coupon.expiration.toString());
  const statusStyles = getStatusStyles(status);
  const statusText = getStatusText(status);

  const handleViewEditClick = () => {
    onViewEdit(coupon.id);
  };

  const handleDeleteClick = () => {
    onDelete(coupon.id);
  };

  const handleViewEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onViewEdit(coupon.id);
    }
  };

  const handleDeleteKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onDelete(coupon.id);
    }
  };

  return (
    <div className='relative flex flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md'>
      <div className='flex items-center gap-x-4'>
        {coupon.code && (
          <img
            src={'/Planet.png'}
            alt={coupon.code}
            width={64}
            height={64}
            className='rounded-md object-cover'
          />
        )}
        <div className='flex-1'>
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles}`}
          >
            {statusText}
          </span>
          <div className='flex items-center gap-x-2'>
            <h3 className='truncate text-lg font-semibold text-gray-800'>
              {coupon.title}
            </h3>
          </div>

          <p className='line-clamp-2 text-sm text-gray-600'>
            {coupon.description}
          </p>
          {coupon.code && (
            <p className='mt-1 text-sm font-medium text-yellow-600'>
              Code: {coupon.code}
            </p>
          )}
        </div>
        {coupon.discountAmount && (
          <div className='flex h-16 w-16 items-center justify-center self-center rounded-full bg-green-500 text-lg font-bold text-white'>
            {coupon.discountAmount}%
          </div>
        )}
      </div>
      <div className='flex justify-end gap-x-1'>
        <AButton
          variant='link'
          color='default'
          onClick={handleViewEditClick}
          onKeyDown={handleViewEditKeyDown}
          tabIndex={0}
        >
          View
        </AButton>
        <AButton
          variant='link'
          color='default'
          onClick={handleDeleteClick}
          onKeyDown={handleDeleteKeyDown}
          tabIndex={0}
        >
          Edit
        </AButton>
      </div>
    </div>
  );
};

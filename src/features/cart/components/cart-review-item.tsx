import { AImage } from '@/common/ui-common';
import { SelectQuantity } from '@/features/cart/components/select-quantity';
import type { CartItem } from '@/interfaces/cart/cart-item';

export interface CartReviewItemProps {
  data: CartItem;
}

export const CartReviewItem = ({ data }: CartReviewItemProps) => {
  return (
    <div className='flex gap-4'>
      <AImage
        src={data?.commodityImage}
        preview={false}
        height={100}
        rootClassName='col-span-2'
      />
      <div className='flex flex-col gap-2'>
        <p>{data?.commodityName}</p>
        <p>{data?.price}</p>
        <SelectQuantity id={data?.id} />
      </div>
    </div>
  );
};

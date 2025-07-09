import { ARawImage } from '@/common/ui-common';
import { AParagraph } from '@/common/ui-common/atoms/a-paragraph/a-paragraph';
import { AddToCartButton } from '@/features/cart/components/add-to-cart-button';
import { TagCommodityStatus } from '@/features/commodity/components/tag-commodity-status';
import type { Commodity } from '@/interfaces';
import { formatCurrency } from '@/utils/format-currency';
import { Avatar, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';

export interface CardStoreProps {
  commodity: Pick<
    Commodity,
    | 'id'
    | 'name'
    | 'description'
    | 'specialTag'
    | 'category'
    | 'price'
    | 'image'
    | 'expirationDate'
    | 'status'
    | 'supplierId'
    | 'cropId'
  > & {
    cropName: string;
    supplierName: string;
  };
}

export const CardStore = ({ commodity }: CardStoreProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/store/commodity/${commodity.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='relative cursor-pointer bg-transparent'
    >
      <ARawImage
        src={commodity.image}
        className='aspect-square overflow-hidden rounded-xl'
      />
      <Popover
        arrow={false}
        placement={'bottomLeft'}
        destroyOnHidden
        content={
          <div className='flex w-52 flex-col gap-2'>
            <div className='flex flex-col'>
              <div className='flex items-start justify-between'>
                <Avatar src={commodity.image} alt={commodity.name} size={48} />
                <TagCommodityStatus status={commodity.status} />
              </div>
              <p className='text-lg font-semibold'>{commodity.name}</p>
              <AParagraph ellipsis={{ rows: 2 }}>
                {commodity.description}
              </AParagraph>
            </div>
            {[
              { label: 'Supplier', value: commodity.supplierName },
              { label: 'Crop', value: commodity.cropName },
            ].map((item) => (
              <div key={item.label} className='flex flex-col'>
                <p className='font-medium'>{item.label}</p>
                <p className='text-neutral-500'>
                  {item.value != null ? item.value : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        }
      >
        <div className='absolute left-3 top-3 flex flex-col gap-1 text-gray-50'>
          <p className='text-xl font-medium'>{commodity.name}</p>
          <p className='text-lg font-bold'>{formatCurrency(commodity.price)}</p>
        </div>
      </Popover>
      <AddToCartButton
        id={commodity.id}
        className='absolute bottom-3 right-3 shadow-xl'
      />
    </div>
  );
};

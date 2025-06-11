import { ARawImage } from '@/common/ui-common';
import type { Commodity } from '@/interfaces';
import { formatCurrency } from '@/utils/format-currency';
import { useNavigate } from 'react-router-dom';

export interface CardStoreProps {
  commodity: Commodity;
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
      <div className='absolute left-3 top-3 flex flex-col gap-1 text-gray-50'>
        <p className='text-xl font-medium'>{commodity.name}</p>
        <p className='text-lg font-bold'>{formatCurrency(commodity.price)}</p>
      </div>
    </div>
  );
};

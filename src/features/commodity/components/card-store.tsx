import { ACardV2, AImage } from '@/common/ui-common';
import type { Commodity } from '@/interfaces';
import { formatUsd } from '@/utils/number/format-usd';
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
    <ACardV2
      onClick={handleClick}
      rootClassName='cursor-pointer bg-transparent'
      classNames={{
        body: '[&.ant-card-body]:p-[initial] flex flex-col gap-3',
      }}
    >
      <AImage
        src={commodity.image}
        preview={false}
        rootClassName='aspect-square rounded-xl overflow-hidden'
      />
      <div className='flex flex-col gap-1'>
        <p className='text-xl font-medium'>{commodity.name}</p>
        <p className='text-lg font-bold'>{formatUsd(commodity.price)}</p>
      </div>
    </ACardV2>
  );
};

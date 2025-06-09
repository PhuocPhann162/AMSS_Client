import { type OrderHeader, type OrderStatusKey } from '@/interfaces';
import { formatCurrency } from '@/utils/format-currency';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface OrderCardProps {
  orderHeader: OrderHeader;
}

export const OrderCard = ({ orderHeader }: OrderCardProps) => {
  const statusClassNameMap: Record<OrderStatusKey, string> = {
    Cancelled: 'bg-green-pea-500',
    Confirmed: 'bg-blue-500',
    Processing: 'bg-yellow-500',
    ReadyForShipment: 'bg-green-pea-500',
    Delivered: 'bg-green-pea-500',
    Completed: 'bg-green-pea-500',
    Pending: 'bg-red-500',
  };

  return (
    <Link
      to={`/orders/${orderHeader.id}`}
      className={twMerge(
        'relative block overflow-hidden rounded-xl border bg-ebb-500 p-1 shadow-lg backdrop-blur-20 backdrop-saturate-180',
        orderHeader.status ? statusClassNameMap[orderHeader.status] : '',
      )}
    >
      <div className='rounded-lg bg-ebb-50'>
        <p
          className={twMerge(
            'w-fit rounded-br-xl px-2 py-1 text-xs font-semibold uppercase text-white1',
            orderHeader.status ? statusClassNameMap[orderHeader.status] : '',
          )}
        >
          {orderHeader.status}
        </p>

        <div className='flex flex-col gap-2 p-4'>
          <div className='flex flex-col gap-1'>
            <p className='text-sm font-medium'>
              {!!orderHeader.orderDate &&
                format(orderHeader.orderDate, 'MM/dd/yyyy HH:mm')}
            </p>
            <p className='font-semibold'>{orderHeader.pickupName}</p>
            <p className='text-xs font-medium'>
              {orderHeader.pickupPhoneNumber}
            </p>
          </div>
          <p className='self-end'>
            Total ({orderHeader.totalItems} items):{' '}
            {formatCurrency(orderHeader.orderTotal ?? 0)}
          </p>
        </div>
      </div>
    </Link>
  );
};

import { type OrderHeader, OrderStatus } from '@/interfaces';
import { formatCurrency } from '@/utils/format-currency';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface OrderCardProps {
  orderHeader: OrderHeader;
}

export const OrderCard = ({ orderHeader }: OrderCardProps) => {
  const statusClassNameMap: Record<
    OrderStatus,
    { label: string; bgClassName: string }
  > = {
    [OrderStatus.Cancelled]: {
      label: 'Cancelled',
      bgClassName: 'bg-green-500',
    },
    [OrderStatus.Confirmed]: { label: 'Confirmed', bgClassName: 'bg-blue-500' },
    [OrderStatus.Processing]: {
      label: 'Processing',
      bgClassName: 'bg-yellow-500',
    },
    [OrderStatus.ReadyForShipment]: {
      label: 'Ready for shipment',
      bgClassName: 'bg-green-500',
    },
    [OrderStatus.Delivered]: {
      label: 'Delivered',
      bgClassName: 'bg-green-500',
    },
    [OrderStatus.Completed]: {
      label: 'Completed',
      bgClassName: 'bg-green-500',
    },
    [OrderStatus.Pending]: { label: 'Pending', bgClassName: 'bg-red-500' },
  };

  const infoItems = [
    {
      label: <>Order date</>,
      value: orderHeader.orderDate
        ? format(orderHeader.orderDate, 'MM/dd/yyyy HH:mm')
        : undefined,
    },
    {
      label: <>Pickup name</>,
      value: orderHeader.pickupName,
    },
    {
      label: <>Pickup phone number</>,
      value: orderHeader.pickupPhoneNumber,
    },
    {
      label: <>Total</>,
      value: formatCurrency(orderHeader.orderTotal ?? 0),
    },
  ];

  return (
    <Link
      to={`/orders/${orderHeader.id}`}
      className={twMerge(
        'relative block overflow-hidden rounded-xl border p-1 shadow-xl backdrop-blur-20 backdrop-saturate-180 hover:text-gray-950',
        orderHeader.status
          ? statusClassNameMap[orderHeader.status].bgClassName
          : '',
      )}
    >
      <div className='rounded-lg bg-white'>
        {!!orderHeader.status && (
          <p
            className={twMerge(
              'w-fit rounded-br-xl px-2 py-1 text-xs font-semibold uppercase text-gray-50',
              orderHeader.status
                ? statusClassNameMap[orderHeader.status].bgClassName
                : '',
            )}
          >
            {statusClassNameMap[orderHeader.status].label}
          </p>
        )}

        <div className='grid gap-3 p-4 xs:grid-cols-2'>
          {infoItems.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 text-base'>
              <p className='font-semibold'>{item.label}</p>
              <p className='text-gray-600'>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

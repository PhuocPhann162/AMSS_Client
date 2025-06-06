import { useGetOrdersQuery } from '@/api/order-api';
import { OrderStatus } from '@/interfaces';
import type { GetOrdersResponse } from '@/models/response/order/getOrdersResponse';
import { formatUsd } from '@/utils/number/format-usd';
import { Link } from 'react-router-dom';

function generateOrders(
  count: number,
): GetOrdersResponse['result']['collection'] {
  const orders: GetOrdersResponse['result']['collection'] = [];
  const statuses = Object.values(OrderStatus);

  for (let i = 0; i < count; i++) {
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const orderDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000,
    ); // Random date within the last 30 days

    orders.push({
      id: `order-${i + 1}`,
      pickupName: `Customer ${i + 1}`,
      pickupPhoneNumber: `+1-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      pickupEmail: `customer${i + 1}@example.com`,
      orderTotal: parseFloat((Math.random() * 1000 + 50).toFixed(2)), // Random total between 50 and 1050
      discountAmount: parseFloat((Math.random() * 50).toFixed(2)), // Random discount up to 50
      orderDate: orderDate.toISOString(),
      status: randomStatus as string,
      totalItems: Math.floor(Math.random() * 10) + 1, // Random items between 1 and 10
    });
  }

  return orders;
}

export const OrdersPage = () => {
  const getOrders = useGetOrdersQuery({});

  const getOrdersData =
    getOrders.data && !getOrders.isError ? getOrders.data : undefined;
  const orders = getOrdersData?.result.collection?.length
    ? getOrdersData?.result.collection
    : generateOrders(10);

  return (
    <div className='grid grid-cols-1 gap-4 p-6 pt-0'>
      {orders?.map((order, index) => (
        <Link
          to={`/orders/${order.id}`}
          key={index}
          className='flex flex-col gap-3 rounded-xl border bg-ebb-50/80 p-4 backdrop-blur-20 backdrop-saturate-180'
        >
          <p className='self-end'>{order.status}</p>

          <p className='self-end'>
            Total ({order.totalItems} items): {formatUsd(order.orderTotal ?? 0)}
          </p>
        </Link>
      ))}
    </div>
  );
};

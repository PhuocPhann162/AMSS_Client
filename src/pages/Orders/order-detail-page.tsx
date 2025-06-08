import { useGetOrderDetailQuery } from '@/api/order-api';
import { useParams } from 'react-router-dom';

export const OrderDetailPage = () => {
  const { id } = useParams();

  const getOrderDetail = useGetOrderDetailQuery({ id: id ?? '' });

  return <div>OrderDetailPage</div>;
};

import { useGetCommodityByIdQuery } from '@/api';
import { useParams } from 'react-router-dom';

export const CommodityDetailPage = () => {
  const { id } = useParams();

  const getCommodityByIdResult = useGetCommodityByIdQuery({ id: id ?? '' });

  return <div></div>;
};

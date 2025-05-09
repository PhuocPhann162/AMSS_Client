import { useGetCommodityByIdQuery } from '@/api';

export interface CommodityDetailProps {
  id: string;
}

export const CommodityDetail = ({ id }: CommodityDetailProps) => {
  const getCommodityByIdResult = useGetCommodityByIdQuery({ id });

  return <div></div>;
};

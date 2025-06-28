import { CultivationProcess } from '@/pages/commodity-origin/components/cultivation-process';
import { FarmerProfile } from '@/pages/commodity-origin/components/farmer-profile';
import { CommodityHeader } from '@/pages/commodity-origin/components/commodity-header';
import { useParams } from 'react-router-dom';
import { useGetCommodityOriginQuery } from '@/api';
import { CropInfo } from '@/pages/commodity-origin/components/crop-info';
import { FieldInfo } from '@/pages/commodity-origin/components/field-info';

export const CommodityOriginDetailPage = () => {
  const { id } = useParams();

  const getCommodityOrigin = useGetCommodityOriginQuery({ id: id ?? '' });
  const commodityOriginData =
    getCommodityOrigin.data && !getCommodityOrigin.isError
      ? getCommodityOrigin.data
      : undefined;

  const commodity = commodityOriginData?.result;
  const crop = commodityOriginData?.result.crop;
  const field = commodityOriginData?.result.fields[0];

  if (getCommodityOrigin.isFetching) return null;

  return (
    <div className='bg-gray-50'>
      {!!commodity && <CommodityHeader commodity={commodity} />}
      {!!crop && commodity && <CropInfo crop={crop} />}
      {!!field && <FieldInfo field={field} />}
      {null && <FarmerProfile />}
      <CultivationProcess />
    </div>
  );
};

import { CultivationProcess } from '@/pages/commodity-origin/components/cultivation-process';
import { FarmerProfile } from '@/pages/commodity-origin/components/farmer-profile';
import { CommodityHeader } from '@/pages/commodity-origin/components/commodity-header';
import { useParams } from 'react-router-dom';
import { useGetCommodityOriginQuery } from '@/api';
import { CropInfo } from '@/pages/commodity-origin/components/crop-info';
import { PlotInfo } from '@/pages/commodity-origin/components/plot-info';

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

  return (
    <div className='bg-gray-50'>
      {!!commodity && <CommodityHeader commodity={commodity} />}
      {!!crop && commodity && (
        <CropInfo crop={{ ...crop, supplier: commodity.supplier }} />
      )}
      {!!field && <PlotInfo field={field} />}
      {commodity?.supplier != null && (
        <FarmerProfile farmer={commodity?.supplier} />
      )}
      <CultivationProcess />
    </div>
  );
};

import React from 'react';
import { Tag as ATag } from 'antd';
import { getCommodityStatusColor } from '@/helper/getStatusColor';
import { COMMODITY_STATUS_FILTER } from '@/helper/descriptionItems';
import { CommodityStatus } from '@/interfaces';

type CommodityStatusTagProps = {
  value: number;
};

export const CommodityStatusTag: React.FC<CommodityStatusTagProps> = ({
  value,
}) => {
  const statusObj = COMMODITY_STATUS_FILTER.find((item) => item.key === value);
  return (
    <ATag color={getCommodityStatusColor(value)}>
      {statusObj ? statusObj.title : CommodityStatus[value]}
    </ATag>
  );
};

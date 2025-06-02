import React from 'react';
import { Tag as ATag } from 'antd';
import { COMMODITIES_CATEGORY_SEGMENTED } from '@/helper/descriptionItems';
import { CommodityCategory } from '@/interfaces';
import { getCommodityCategoryColor } from '@/helper/getStatusColor';

type CommodityCategoryTagProps = {
  value: number;
};

export const CommodityCategoryTag: React.FC<CommodityCategoryTagProps> = ({
  value,
}) => {
  const statusObj = COMMODITIES_CATEGORY_SEGMENTED.find(
    (item) => item.value.toString() === value.toString(),
  );
  return (
    <ATag color={getCommodityCategoryColor(value)}>
      {statusObj?.label ?? CommodityCategory[value]}
    </ATag>
  );
};

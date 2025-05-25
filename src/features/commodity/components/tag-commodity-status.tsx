import { ATag, type ATagProps } from '@/common/ui-common';
import { CommodityStatus } from '@/interfaces';

export interface TagCommodityStatusProps extends ATagProps {
  status: CommodityStatus;
}

export const TagCommodityStatus = ({
  status,
  ...props
}: TagCommodityStatusProps) => {
  const statusMap: Record<
    CommodityStatus,
    {
      color: ATagProps['color'];
      label: string;
    }
  > = {
    [CommodityStatus.Active]: {
      color: 'green',
      label: 'Active',
    },
    [CommodityStatus.OutOfStock]: {
      color: 'red',
      label: 'Out of Stock',
    },
    [CommodityStatus.Discontinued]: {
      color: 'gray',
      label: 'Discontinued',
    },
    [CommodityStatus.ComingSoon]: {
      color: 'blue',
      label: 'Coming Soon',
    },
    [CommodityStatus.PreOrder]: {
      color: 'blue',
      label: 'Pre Order',
    },
    [CommodityStatus.Limited]: {
      color: 'blue',
      label: 'Limited',
    },
  };

  return (
    <ATag color={statusMap[status].color} bordered {...props}>
      {statusMap[status].label}
    </ATag>
  );
};

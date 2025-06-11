import { ATag, type ATagProps } from '@/common/ui-common';
import { colors } from '@/configs/colors';
import { CommodityStatus } from '@/interfaces';
import { twMerge } from 'tailwind-merge';

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
      color: colors['green-pea'][700],
      label: 'Active',
    },
    [CommodityStatus.OutOfStock]: {
      color: 'red',
      label: 'Out of Stock',
    },
    [CommodityStatus.Discontinued]: {
      color: colors['Gray'][700],
      label: 'Discontinued',
    },
    [CommodityStatus.ComingSoon]: {
      color: colors['Gray'][700],
      label: 'Coming Soon',
    },
    [CommodityStatus.PreOrder]: {
      color: colors['Gray'][700],
      label: 'Pre Order',
    },
    [CommodityStatus.Limited]: {
      color: colors['Gray'][700],
      label: 'Limited',
    },
  };

  return (
    <ATag
      color={statusMap[status].color}
      {...props}
      className={twMerge(
        'rounded-2xl px-2.5 py-0.5 uppercase',
        props.className,
      )}
    >
      {statusMap[status].label}
    </ATag>
  );
};

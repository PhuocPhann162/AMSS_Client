import { ATag, type ATagProps } from '@/common/ui-common';
import { CommodityCategory } from '@/interfaces';

export interface TagCommodityCategoryProps extends ATagProps {
  category: CommodityCategory;
}

export const TagCommodityCategory = ({
  category,
  ...props
}: TagCommodityCategoryProps) => {
  const categoryMap: Record<
    CommodityCategory,
    {
      color: ATagProps['color'];
      label: string;
    }
  > = {
    [CommodityCategory.Vegetable]: {
      color: 'green',
      label: 'Vegetable',
    },
    [CommodityCategory.Fruit]: {
      color: 'red',
      label: 'Fruit',
    },
    [CommodityCategory.Grain]: {
      color: 'gray',
      label: 'Grain',
    },
    [CommodityCategory.Seed]: {
      color: 'blue',
      label: 'Seed',
    },
  };

  return (
    <ATag color={categoryMap[category].color} bordered {...props}>
      {categoryMap[category].label}
    </ATag>
  );
};

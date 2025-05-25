import { useGetCommoditiesQuery } from '@/api';
import {
  ABadge,
  AButton,
  ADropdown,
  AInputDebounce,
  ATabs,
  ATabsProps,
} from '@/common/ui-common';
import { ContainerIgnoreHeader } from '@/components/layout/content/container-ignore-header';
import { CardStore } from '@/features/commodity/components/card-store';
import { Commodity, CommodityStatus } from '@/interfaces';
import { CommodityCategory } from '@/interfaces/commodity/commodity-category';
import {
  COMMODITY_ORDER_BY,
  CommodityOrderBy,
  ListSortDirection,
} from '@/models';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { useState } from 'react';

type CustomCommodityCategory = CommodityCategory | 'all';

const categoryLabel: Record<
  CustomCommodityCategory,
  {
    order: number;
    label: string;
  }
> = {
  all: {
    order: 0,
    label: 'All',
  },
  [CommodityCategory.Vegetable]: {
    order: 1,
    label: 'Vegetable',
  },
  [CommodityCategory.Fruit]: {
    order: 2,
    label: 'Fruit',
  },
  [CommodityCategory.Grain]: {
    order: 3,
    label: 'Grain',
  },
  [CommodityCategory.Seed]: {
    order: 4,
    label: 'Seed',
  },
};

export const StorePage = () => {
  const [sortValue, setSortValue] = useState<{
    sort: ListSortDirection;
    orderBy: CommodityOrderBy;
  }>({
    sort: ListSortDirection.Descending,
    orderBy: COMMODITY_ORDER_BY['createdAt'],
  });
  const [sortOpen, setSortOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<CustomCommodityCategory[]>([
    'all',
  ]);

  const getCommoditiesQuery = useGetCommoditiesQuery({
    orderBy: sortValue.orderBy,
    orderByDirection: sortValue.sort,
    categories: categories.filter((category) => category !== 'all'),
    search,
  });

  const tabsItems: ATabsProps['items'] = Object.entries(categoryLabel)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, value]) => ({
      key,
      label: value.label,
    }));

  const fakeCommodities: Commodity[] = Array.from({ length: 10 }).map(
    (_, index) => {
      return {
        id: `fake-${index}`,
        name: `Fake Commodity ${index}`,
        description: `Description for fake commodity ${index}`,
        specialTag: `Tag ${index}`,
        category: CommodityCategory.Fruit,
        price: 100,
        image:
          'https://images.squarespace-cdn.com/content/v1/5ee52f7d9edc8a7ee635591a/8df50655-6b68-460e-ad6c-5230001b9d5a/240404+-+063944+-+001.jpg',
        expirationDate: '2024-12-31',
        status: CommodityStatus.Active,
        supplierId: 'sup_01a2b3c4d5',
        cropId: `crop_${index}`,
        createdAt: '2023-01-15T08:30:00Z',
        updatedAt: '2023-01-15T08:30:00Z',
      };
    },
  );

  const items: Commodity[] =
    getCommoditiesQuery.currentData?.result.collection ?? fakeCommodities;

  const sortOptions = [
    {
      label: 'Newest to Oldest',
      key: 'dateNewToOld',
      value: {
        sort: ListSortDirection.Descending,
        orderBy: COMMODITY_ORDER_BY['createdAt'],
      },
    },
    {
      label: 'Oldest to Newest',
      key: 'dateOldToNew',
      value: {
        sort: ListSortDirection.Ascending,
        orderBy: COMMODITY_ORDER_BY['createdAt'],
      },
    },
    {
      label: 'Price: Lowest to Highest',
      key: 'priceLowToHigh',
      value: {
        sort: ListSortDirection.Ascending,
        orderBy: COMMODITY_ORDER_BY['price'],
      },
    },
    {
      label: 'Price: Highest to Lowest',
      key: 'priceHighToLow',
      value: {
        sort: ListSortDirection.Descending,
        orderBy: COMMODITY_ORDER_BY['price'],
      },
    },
  ];

  return (
    <ContainerIgnoreHeader className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <AInputDebounce
          defaultValue={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search'
        />
        <ATabs
          activeKey={categories[0].toString()}
          onChange={(key) => {
            const _key = key as CustomCommodityCategory;
            setCategories([_key]);
          }}
          items={tabsItems}
          tabBarExtraContent={
            <ADropdown
              trigger={['click']}
              placement={'bottomRight'}
              open={sortOpen}
              onOpenChange={setSortOpen}
              menu={{
                selectable: true,
                items: sortOptions.map((option) => ({
                  label: option.label,
                  key: option.key,
                  onClick: () => {
                    setSortValue(option.value);
                  },
                })),
                selectedKeys: (function () {
                  if (!sortValue) return [];

                  const selectedKey = sortOptions.find(
                    (option) =>
                      option.value.sort === sortValue.sort &&
                      option.value.orderBy === sortValue.orderBy,
                  )?.key;

                  return selectedKey ? [selectedKey] : [];
                })(),
              }}
            >
              <ABadge dot={!!sortValue}>
                <AButton iconPosition={'end'} icon={<DownOutlined />}>
                  Sort
                </AButton>
              </ABadge>
            </ADropdown>
          }
        />
      </div>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
        {items.map((item) => (
          <CardStore key={item.id} commodity={item} />
        ))}
      </div>
    </ContainerIgnoreHeader>
  );
};

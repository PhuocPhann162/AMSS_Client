import { useGetCommoditiesQuery } from '@/api';
import { ABadge, AButton, ADropdown } from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { ContainerIgnoreHeader } from '@/components/layout/content/container-ignore-header';
import {
  TabNavigation,
  type TabNavigationProps,
} from '@/components/ui/tab-navigation';
import { CardStore } from '@/features/commodity/components/card-store';
import { CommodityCategory } from '@/interfaces/commodity/commodity-category';
import {
  COMMODITY_ORDER_BY,
  CommodityOrderBy,
  ListSortDirection,
} from '@/models';
import SwapOutlined from '@ant-design/icons/SwapOutlined';
import Empty from 'antd/es/empty';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams({
    category: 'all',
  });

  const [sortOpen, setSortOpen] = useState(false);

  const [sortValue, setSortValue] = useState<{
    sort: ListSortDirection;
    orderBy: CommodityOrderBy;
  }>({
    sort: ListSortDirection.Descending,
    orderBy: COMMODITY_ORDER_BY['createdAt'],
  });

  const [categories, setCategories] = useState<CustomCommodityCategory[]>([
    (searchParams.get('category') as CustomCommodityCategory) ?? 'all',
  ]);

  const getCommodities = useGetCommoditiesQuery({
    orderBy: sortValue.orderBy,
    orderByDirection: sortValue.sort,
    categories: categories.filter((category) => category !== 'all'),
  });

  const getCommoditiesData =
    getCommodities.data && !getCommodities.isError
      ? getCommodities.data
      : undefined;

  const tabsItems: TabNavigationProps<CustomCommodityCategory>['tabs'] =
    Object.entries(categoryLabel)
      .sort(([, a], [, b]) => a.order - b.order)
      .map(([key, value]) => ({
        id: key as CustomCommodityCategory,
        label: value.label,
      }));

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
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <TabNavigation
          activeTab={categories[0]}
          tabs={tabsItems.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => {
              setCategories([item.id]);
              setSearchParams(
                {
                  category: item.id as string,
                },
                {
                  replace: true,
                },
              );
            },
          }))}
          classNames={{
            tab: 'px-2 py-1 md:px-4 md:py-2',
          }}
        />
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
            <AHomeButton
              type='text'
              iconPosition={'end'}
              icon={<SwapOutlined className='rotate-90' />}
            >
              Sort
            </AHomeButton>
          </ABadge>
        </ADropdown>
      </div>

      {getCommoditiesData?.result?.collection?.length ? (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-6 lg:grid-cols-3'>
          {getCommoditiesData.result.collection.map((item) => (
            <CardStore key={item.id} commodity={item} />
          ))}
        </div>
      ) : (
        <Empty>
          <AButton type='primary' onClick={() => getCommodities.refetch()}>
            Refresh
          </AButton>
        </Empty>
      )}
    </ContainerIgnoreHeader>
  );
};

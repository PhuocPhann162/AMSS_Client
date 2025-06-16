import { useGetCommoditiesQuery } from '@/api';
import { ABadge, ADropdown, AList } from '@/common/ui-common';
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
import Button from 'antd/es/button';
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

  const [page, setPage] = useState<number>(
    Number(searchParams.get('page')) || 1,
  );

  const [limit, setLimit] = useState<number>(
    Number(searchParams.get('limit')) || 10,
  );

  const getCommodities = useGetCommoditiesQuery({
    orderBy: sortValue.orderBy,
    orderByDirection: sortValue.sort,
    categories: categories.filter((category) => category !== 'all'),
    currentPage: page,
    limit,
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
      label: 'Newest',
      key: 'dateNewToOld',
      value: {
        sort: ListSortDirection.Descending,
        orderBy: COMMODITY_ORDER_BY['createdAt'],
      },
    },
    {
      label: 'Oldest',
      key: 'dateOldToNew',
      value: {
        sort: ListSortDirection.Ascending,
        orderBy: COMMODITY_ORDER_BY['createdAt'],
      },
    },
    {
      label: 'Price: High to Low',
      key: 'priceHighToLow',
      value: {
        sort: ListSortDirection.Descending,
        orderBy: COMMODITY_ORDER_BY['price'],
      },
    },
    {
      label: 'Price: Low to High',
      key: 'priceLowToHigh',
      value: {
        sort: ListSortDirection.Ascending,
        orderBy: COMMODITY_ORDER_BY['price'],
      },
    },
  ];

  const handleChangeCategories = (category: CustomCommodityCategory) => {
    setCategories([category]);
    setSearchParams(
      (prev) => {
        prev.set('category', category.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  const handleChangePage = (page: number) => {
    setPage(page);
    setSearchParams(
      (prev) => {
        prev.set('page', page.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  const handleChangeLimit = (limit: number) => {
    setLimit(limit);
    setSearchParams(
      (prev) => {
        prev.set('limit', limit.toString());
        return prev;
      },
      {
        replace: true,
      },
    );
  };

  return (
    <div className='flex flex-col gap-4 p-6 pt-0'>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <TabNavigation
          activeTab={categories[0]}
          tabs={tabsItems.map((item) => ({
            id: item.id,
            label: item.label,
            onClick: () => {
              handleChangeCategories(item.id);
              handleChangePage(1);
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
            <Button
              type='text'
              iconPosition={'end'}
              icon={<SwapOutlined className='rotate-90' />}
            >
              Sort
            </Button>
          </ABadge>
        </ADropdown>
      </div>

      <AList
        className='[&_.ant-list-items]:grid [&_.ant-list-items]:grid-cols-1 [&_.ant-list-items]:gap-6 md:[&_.ant-list-items]:grid-cols-2 lg:[&_.ant-list-items]:grid-cols-3 xl:[&_.ant-list-items]:grid-cols-4'
        dataSource={getCommoditiesData?.result?.collection ?? undefined}
        renderItem={(item) => <CardStore key={item.id} commodity={item} />}
        loading={getCommodities.isFetching}
        pagination={{
          showSizeChanger: true,
          total: getCommoditiesData?.result?.totalRow,
          size: 'small',
          current: page,
          pageSize: limit,
          align: 'end',
          onChange: (page, pageSize) => {
            handleChangePage(page);
            handleChangeLimit(pageSize);
          },
        }}
      />
    </div>
  );
};

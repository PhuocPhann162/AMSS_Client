import { useGetCommoditiesQuery } from '@/api';
import {
  TabNavigation,
  type TabNavigationProps,
} from '@/components/tabs/tab-navigation';
import { CardStore } from '@/features/commodity/components/card-store';
import {
  COMMODITY_CATEGORY_V2,
  type CommodityCategoryV2,
} from '@/interfaces/commodity/commodity-category-v2';
import { ListSortDirection } from '@/models';
import { Badge, Dropdown } from 'antd';
import Button from 'antd/es/button';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IoIosSwap } from 'react-icons/io';
import { AList } from '@/common/ui-common';
import {
  COMMODITY_ORDER_BY,
  type CommodityOrderBy,
} from '@/models/request/commodity/commodity-order-by';

type CustomCommodityCategory = CommodityCategoryV2 | 'all';

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
  [COMMODITY_CATEGORY_V2.Vegetable]: {
    order: 1,
    label: 'Vegetable',
  },
  [COMMODITY_CATEGORY_V2.Fruit]: {
    order: 2,
    label: 'Fruit',
  },
  [COMMODITY_CATEGORY_V2.Grain]: {
    order: 3,
    label: 'Grain',
  },
  [COMMODITY_CATEGORY_V2.Seed]: {
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
        <Dropdown
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
          <Badge dot={!!sortValue}>
            <Button
              type='text'
              iconPosition={'end'}
              icon={<IoIosSwap className='size-4 rotate-90' />}
            >
              Sort
            </Button>
          </Badge>
        </Dropdown>
      </div>

      <AList
        className='[&_.ant-list-items]:grid [&_.ant-list-items]:grid-cols-1 [&_.ant-list-items]:gap-6 md:[&_.ant-list-items]:grid-cols-2 lg:[&_.ant-list-items]:grid-cols-3 xl:[&_.ant-list-items]:grid-cols-4'
        dataSource={getCommoditiesData?.result.collection ?? undefined}
        renderItem={(item) => <CardStore key={item.id} commodity={item} />}
        loading={getCommodities.isFetching}
        pagination={{
          showSizeChanger: true,
          total: getCommoditiesData?.result.totalRow,
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

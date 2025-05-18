import { useGetCommoditiesQuery } from '@/api';
import {
  ABadge,
  AButton,
  ADropdown,
  AImage,
  AInputDebounce,
  ATabs,
  ATabsProps,
} from '@/common/ui-common';
import { Commodity, CommodityStatus } from '@/interfaces';
import { CommodityCategory } from '@/interfaces/commodity/commodity-category';
import {
  COMMODITY_ORDER_BY,
  CommodityOrderBy,
  ListSortDirection,
} from '@/models';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

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

  const items: Commodity[] = getCommoditiesQuery.currentData?.collection ?? [
    {
      id: 'c1a2b3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
      name: 'Organic Carrots',
      description: 'Fresh organic carrots harvested from sustainable farms.',
      specialTag: 'Organic',
      category: CommodityCategory.Vegetable,
      price: 25000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2023-12-31',
      status: CommodityStatus.Active,
      supplierId: 'sup_01a2b3c4d5',
      cropId: 'crop_carrot_01',
      createdAt: '2023-01-15T08:30:00Z',
      updatedAt: '2023-01-15T08:30:00Z',
    },
    {
      id: 'd4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9',
      name: 'Premium Apples',
      description: 'Sweet and juicy apples from highland orchards.',
      specialTag: 'Premium',
      category: CommodityCategory.Fruit,
      price: 35000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2023-12-15',
      status: CommodityStatus.Active,
      supplierId: 'sup_02c3d4e5f6',
      cropId: 'crop_apple_02',
      createdAt: '2023-02-10T09:45:00Z',
      updatedAt: '2023-02-12T14:20:00Z',
    },
    {
      id: 'g7h8i9j0-k1l2-m3n4-o5p6-q7r8s9t0u1v2',
      name: 'Brown Rice',
      description: 'Nutritious brown rice sourced from local farms.',
      specialTag: 'Gluten-Free',
      category: CommodityCategory.Grain,
      price: 45000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      status: CommodityStatus.Active,
      supplierId: 'sup_03d4e5f6g7',
      cropId: 'crop_rice_03',
      createdAt: '2023-03-05T11:20:00Z',
      updatedAt: '2023-03-05T11:20:00Z',
    },
    {
      id: 'j0k1l2m3-n4o5-p6q7-r8s9-t0u1v2w3x4y5',
      name: 'Organic Tomato Seeds',
      description: 'High-quality organic tomato seeds for home gardening.',
      specialTag: 'Organic',
      category: CommodityCategory.Seed,
      price: 15000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2024-12-31',
      status: CommodityStatus.Active,
      supplierId: 'sup_04e5f6g7h8',
      cropId: 'crop_tomato_seed_04',
      createdAt: '2023-01-20T13:45:00Z',
      updatedAt: '2023-01-22T10:30:00Z',
    },
    {
      id: 'm3n4o5p6-q7r8-s9t0-u1v2-w3x4y5z6a7b8',
      name: 'Red Bell Peppers',
      description: 'Vibrant red bell peppers, perfect for salads and cooking.',
      specialTag: 'Fresh',
      category: CommodityCategory.Vegetable,
      price: 30000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2023-11-25',
      status: CommodityStatus.Limited,
      supplierId: 'sup_05f6g7h8i9',
      cropId: 'crop_pepper_05',
      createdAt: '2023-02-25T16:10:00Z',
      updatedAt: '2023-02-26T09:15:00Z',
    },
    {
      id: 'p6q7r8s9-t0u1-v2w3-x4y5-z6a7b8c9d0e1',
      name: 'Golden Mangoes',
      description: 'Sweet and aromatic golden mangoes from tropical regions.',
      specialTag: 'Seasonal',
      category: CommodityCategory.Fruit,
      price: 40000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      status: CommodityStatus.OutOfStock,
      supplierId: 'sup_06g7h8i9j0',
      cropId: 'crop_mango_06',
      createdAt: '2023-03-10T08:20:00Z',
      updatedAt: '2023-05-15T11:45:00Z',
    },
    {
      id: 's9t0u1v2-w3x4-y5z6-a7b8-c9d0e1f2g3h4',
      name: 'Quinoa',
      description: 'Protein-rich quinoa grain for healthy meals.',
      specialTag: 'Super Food',
      category: CommodityCategory.Grain,
      price: 60000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2024-06-30',
      status: CommodityStatus.Active,
      supplierId: 'sup_07h8i9j0k1',
      cropId: 'crop_quinoa_07',
      createdAt: '2023-04-05T14:30:00Z',
      updatedAt: '2023-04-05T14:30:00Z',
    },
    {
      id: 'v2w3x4y5-z6a7-b8c9-d0e1-f2g3h4i5j6k7',
      name: 'Sunflower Seeds',
      description: 'Premium sunflower seeds for planting or snacking.',
      specialTag: 'Dual Purpose',
      category: CommodityCategory.Seed,
      price: 20000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2024-11-15',
      status: CommodityStatus.PreOrder,
      supplierId: 'sup_08i9j0k1l2',
      cropId: 'crop_sunflower_08',
      createdAt: '2023-03-15T09:40:00Z',
      updatedAt: '2023-06-01T13:20:00Z',
    },
    {
      id: 'y5z6a7b8-c9d0-e1f2-g3h4-i5j6k7l8m9n0',
      name: 'Purple Cabbage',
      description: 'Nutritious purple cabbage full of antioxidants.',
      specialTag: 'Nutrient-Rich',
      category: CommodityCategory.Vegetable,
      price: 28000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      expirationDate: '2023-12-05',
      status: CommodityStatus.ComingSoon,
      supplierId: 'sup_09j0k1l2m3',
      cropId: 'crop_cabbage_09',
      createdAt: '2023-05-20T10:15:00Z',
      updatedAt: '2023-05-21T08:30:00Z',
    },
    {
      id: 'b8c9d0e1-f2g3-h4i5-j6k7-l8m9n0o1p2q3',
      name: 'Heritage Wheat',
      description: 'Traditional heritage wheat variety for authentic baking.',
      specialTag: 'Heritage',
      category: CommodityCategory.Grain,
      price: 55000,
      image: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
      status: CommodityStatus.Discontinued,
      supplierId: 'sup_10k1l2m3n4',
      cropId: 'crop_wheat_10',
      createdAt: '2023-01-05T15:50:00Z',
      updatedAt: '2023-04-10T12:25:00Z',
    },
  ];

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
    <div className='flex flex-col gap-12'>
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
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6'>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/store/commodity/${item.id}`)}
            className='flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-md transition-[box-shadow,transform] duration-500 ease-out hover:shadow-lg hover:[transform:scale3d(1.01,1.01,1.01)]'
          >
            <div className='flex flex-col gap-2'>
              <p className='text-xs font-semibold text-abbey-400'>
                {item.category}
              </p>
              <p className='text-2xl font-semibold'>{item.price}</p>
            </div>
            <AImage src={item.image} preview={false} />
            <div className='flex justify-end'>
              <AButton type='primary'>Buy</AButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

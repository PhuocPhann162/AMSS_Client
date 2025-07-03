import { useGetCommoditiesQuery } from '@/api';
import {
  AButton,
  ASegmented,
  ATable,
  type ATableProps,
} from '@/common/ui-common';
import { SearchInput } from '@/components/UI/search-input';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, Commodity, CommodityCategory } from '@/interfaces';
import { TableParams } from '@/utils/models/Tables';
import { useEffect, useMemo, useState } from 'react';
import {
  COMMODITIES_CATEGORY_SEGMENTED,
  COMMODITY_STATUS_FILTER,
} from '@/helper/descriptionItems';
import { CommodityStatusTag } from '@/components/UI';
import { CommodityOrderBy } from '@/models';
import { AFilterDropdown } from '@/common/ui-common/atoms/a-table/filter-dropdown';
import { ViewCommodityModal } from '@/components/UI/modal/view-commodity-modal';
import { useNavigate } from 'react-router-dom';
import { CreateIcon } from '@/components/Icon';
import { PageCommon } from '@/components/layout/page/page-common';

const getValidOrderBy = (sortField: unknown): CommodityOrderBy => {
  const value = (Array.isArray(sortField) ? sortField[0] : sortField) as string;
  switch (value) {
    case 'price':
      return 'price';
    case 'createdAt':
      return 'createdAt';
    case 'name':
      return 'name';
    case 'expirationDate':
      return 'expirationDate';
    default:
      return 'createdAt';
  }
};

export function CommodityManagement() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);
  const [segmentedCategory, setSegmentedCategory] = useState<
    CommodityCategory | string
  >('');

  const [dataTable, setDataTable] = useState<Commodity[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const { data, isLoading } = useGetCommoditiesQuery({
    ...(tableParams.filters &&
    tableParams.filters['status'] &&
    (tableParams.filters['status'] as number[]).length > 0
      ? { statuses: tableParams.filters['status'] as number[] }
      : {}),
    ...(segmentedCategory !== ''
      ? { categories: [Number(segmentedCategory)] as CommodityCategory[] }
      : {}),
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: getValidOrderBy(tableParams.sortField),
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
    search: searchValue,
  });

  const [isViewCommodityModalOpen, setIsViewCommodityModalOpen] =
    useState<boolean>(false);
  const [selectedCommodityId, setSelectedCommodityId] = useState<string>('');

  const handleViewCommodity = (commodity: Commodity) => {
    setSelectedCommodityId(commodity.id);
    setIsViewCommodityModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewCommodityModalOpen(false);
    setSelectedCommodityId('');
  };

  const commoditiesCol: ATableProps<Commodity>['columns'] = useMemo(() => {
    return [
      {
        width: '10rem',
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        ellipsis: true,
        render: (_, record) => (
          <div className='flex items-center'>
            {record.image && (
              <img
                src={record.image}
                alt={record.name}
                className='mr-2 h-8 w-8 rounded-full object-cover'
              />
            )}
            <span>{record.name}</span>
          </div>
        ),
      },
      {
        width: '6rem',
        title: 'Category',
        dataIndex: 'category',
        ellipsis: true,
        render: (value: number) => CommodityCategory[value],
      },
      {
        width: '7rem',
        title: 'Price',
        dataIndex: 'price',
        sorter: true,
        ellipsis: true,
        render: (value: number) => `$${value.toFixed(2)}`,
      },
      {
        width: '6rem',
        title: 'Expiration Date',
        dataIndex: 'expirationDate',
        sorter: true,
        ellipsis: true,
        render: (value: string) => displayDateTimeByLocale(value),
      },
      {
        width: '7rem',
        title: 'Status',
        align: 'center',
        dataIndex: 'status',
        filterDropdown: (props) => (
          <AFilterDropdown {...props} optionsFilter={COMMODITY_STATUS_FILTER} />
        ),
        render: (value: number) => <CommodityStatusTag value={value} />,
      },
      {
        title: 'Created Date',
        align: 'center',
        width: '7rem',
        dataIndex: 'createdAt',
        sorter: true,
        ellipsis: true,
        render: (value: string) => displayDateTimeByLocale(value),
      },
      {
        title: 'Action',
        width: '8rem',
        align: 'center',
        fixed: 'right',
        dataIndex: '_',
        render: (_, record) => (
          <AButton
            type='link'
            className='color-primary hover:underline'
            onClick={() => handleViewCommodity(record)}
            aria-label='View commodity'
          >
            View
          </AButton>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    const getCommodities = () => {
      try {
        setDataTable(data?.result.collection ?? []);
        setTotalRecord(data?.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getCommodities();
  }, [searchValue, data, segmentedCategory, tableParams]);

  const navigate = useNavigate();

  return (
    <>
      <ViewCommodityModal
        isOpen={isViewCommodityModalOpen}
        onClose={handleCloseViewModal}
        commodityId={selectedCommodityId}
      />
      <PageCommon
        headerTitle='Commodities'
        renderHeader={(HeaderComp, title) => (
          <HeaderComp className='flex items-center justify-between'>
            {title}
            <AButton
              variant='solid'
              color='cyan'
              onClick={() => navigate('/app/commodity/create')}
              className='mt-2'
            >
              <CreateIcon /> New Commodity
            </AButton>
          </HeaderComp>
        )}
      >
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <SearchInput
              onSearch={(value) => {
                if (value !== searchValue) {
                  setSearchValue(value);
                  setTableParams((pre) => ({
                    ...pre,
                    pagination: {
                      ...pre.pagination,
                      current: 1,
                    },
                  }));
                }
              }}
              placeholder={'Search by Name'}
              className='w-1/3 min-w-40'
            />
          </div>

          <ASegmented
            options={COMMODITIES_CATEGORY_SEGMENTED}
            value={segmentedCategory}
            onChange={(value) => {
              if (isLoading) return;
              setSegmentedCategory(value);
              setTableParams((prev) => ({
                ...prev,
                pagination: {
                  ...prev.pagination,
                  current: 1,
                },
              }));
            }}
          />
          <div className='mt-2'>
            <ATable
              columns={commoditiesCol}
              dataSource={dataTable}
              tableParams={tableParams}
              totalRecord={totalRecord}
              loading={isLoading}
              scroll={{ y: '55vh' }}
              onChange={(params: TableParams) => {
                setTableParams(params);
              }}
              rowKey={(row) => row.id}
            />
          </div>
        </div>
      </PageCommon>
    </>
  );
}

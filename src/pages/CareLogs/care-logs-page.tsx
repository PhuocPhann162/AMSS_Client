import { useGetCareLogsQuery } from '@/api/care-log-api';
import { EllipsisText } from '@/components/text/ellipsis-text';
import PaginationCommon from '@/components/pagination/pagination-common';
import { SimpleTable } from '@/components/table/simple-table';
import { useStateSearchParams } from '@/hooks/use-state-search-params';
import type { GetCareLogsRequest } from '@/models/request/care-log/get-care-logs-request';
import { CreateCareLogModal } from '@/features/care-log/components/create-care-log-modal';
import { useState } from 'react';
import { PlusCircleFilled } from '@ant-design/icons';
import { formatDateTime } from '@/utils/date-utils';
import { Button } from 'antd';
import { TypeTag } from '@/features/care-log/components/type-tag';
import { PageCommonV2 } from '@/components/layout/page-common-v2/page-common-v2';
import { PageCommonHeaderV2 } from '@/components/layout/page-common-v2/page-common-header-v2';
import { PageCommonHeaderTitleV2 } from '@/components/layout/page-common-v2/page-common-header-title-v2';
import { PageCommonMainV2 } from '@/components/layout/page-common-v2/page-common-main-v2';
import { IoIosSearch } from 'react-icons/io';
import { DebounceInput } from '@/components/input/debounce-input';
import { useIsMobile } from '@/hooks/use-mobile';
import { CopyableEllipsisText } from '@/components/text/copyable-ellipsis-text';
import { NameWithId } from '@/pages/CareLogs/components/name-with-id';
import { ListSortDirection } from '@/models';

export const CareLogsPage = () => {
  const isMobile = useIsMobile();

  const [filter, setFilter] = useStateSearchParams<GetCareLogsRequest>(
    {
      currentPage: 1,
      limit: 10,
      search: undefined,
      orderBy: 'createdAt',
      orderByDirection: ListSortDirection.Descending,
    },
    {
      currentPage: 'currentPage',
      limit: 'limit',
      search: 'search',
      orderBy: 'orderBy',
      orderByDirection: 'orderByDirection',
    },
  );

  const getCareLogs = useGetCareLogsQuery({
    currentPage: filter.currentPage,
    limit: filter.limit,
    search: filter.search,
    orderBy: filter.orderBy,
    orderByDirection: filter.orderByDirection,
  });

  const getCareLogsData =
    getCareLogs.data && !getCareLogs.isError ? getCareLogs.data : undefined;

  const [openCreateCareLogModal, setOpenCreateCareLogModal] = useState(false);

  return (
    <PageCommonV2 className='h-full'>
      <PageCommonHeaderV2 className='flex items-center justify-between'>
        <PageCommonHeaderTitleV2>Care logs</PageCommonHeaderTitleV2>
        <Button
          type='primary'
          icon={<PlusCircleFilled />}
          onClick={() => {
            setOpenCreateCareLogModal(true);
          }}
        >
          Create
        </Button>
      </PageCommonHeaderV2>
      <PageCommonMainV2 className='min-h-0 pt-0'>
        <div className='flex h-full flex-col rounded-2xl bg-white'>
          <div className='px-4 py-3'>
            <DebounceInput
              className='w-[20rem] max-w-full'
              placeholder='Search'
              prefix={<IoIosSearch className='size-5' />}
              defaultValue={filter.search}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  search: e.target.value,
                });
              }}
            />
          </div>
          <SimpleTable
            columns={[
              {
                title: 'Date',
                dataIndex: 'date',
                fixed: isMobile ? undefined : 'left',
                width: '9rem',
                render: (_, row) => (
                  <EllipsisText>{formatDateTime(row.date)}</EllipsisText>
                ),
              },
              {
                title: 'Created by',
                dataIndex: 'createdBy',
                width: '10rem',
                className: 'text-green-700',
                render: (_, row) => (
                  <EllipsisText className='font-semibold text-inherit'>
                    {row.createdBy.fullName}
                  </EllipsisText>
                ),
              },
              {
                title: 'Crop',
                dataIndex: 'cropId',
                width: '10rem',
                render: (_, row) => {
                  const cropName = row.crop.name;
                  const cropId = row.cropId;

                  if (cropName == null) return undefined;

                  return <NameWithId name={cropName} id={cropId} />;
                },
              },
              {
                title: 'Field',
                dataIndex: 'fieldId',
                width: '10rem',
                render: (_, row) => {
                  const fieldName = row.field.name;
                  const fieldId = row.fieldId;

                  if (fieldName == null) return undefined;

                  return <NameWithId name={fieldName} id={fieldId} />;
                },
              },
              {
                title: 'Type',
                dataIndex: 'type',
                width: '6rem',
                render: (_, row) => <TypeTag type={row.type} />,
              },
              {
                title: 'Created at',
                dataIndex: 'createdAt',
                width: '9rem',
                render: (_, row) => {
                  const createdAt = row.createdAt;

                  if (createdAt == null) return undefined;

                  return (
                    <EllipsisText>{formatDateTime(createdAt)}</EllipsisText>
                  );
                },
              },
              {
                title: 'Description',
                dataIndex: 'description',
                width: '10rem',
                render: (_, row) => (
                  <CopyableEllipsisText>{row.description}</CopyableEllipsisText>
                ),
              },
            ]}
            rowKey={(row) => row.id}
            loading={getCareLogs.isFetching}
            dataSource={getCareLogsData?.result.collection ?? undefined}
            className='grow'
          />
          <PaginationCommon
            page={filter.currentPage}
            size={filter.limit}
            total={getCareLogsData?.result.totalRow}
            onChange={(page, size) => {
              console.log(page, size);
              setFilter({
                ...filter,
                currentPage: page,
                limit: size,
              });
            }}
            className='px-4 py-3'
          />
        </div>
      </PageCommonMainV2>
      <CreateCareLogModal
        open={openCreateCareLogModal}
        onCancel={() => {
          setOpenCreateCareLogModal(false);
        }}
        onSuccess={() => {
          setOpenCreateCareLogModal(false);
        }}
      />
    </PageCommonV2>
  );
};

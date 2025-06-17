import { useGetCareLogsQuery } from '@/api/care-log-api';
import { EllipsisText } from '@/components/text/ellipsis-text';
import { CareLog } from '@/interfaces/care-log/care-log';
import PaginationCommon from '@/components/pagination/pagination-common';
import { SimpleTable } from '@/components/table/simple-table';
import { formatDateTime } from '@/utils/date-utils';
import Input from 'antd/es/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { ListSortDirection } from '@/models';
import { useStateSearchParams } from '@/hooks/use-state-search-params';
import type { GetCareLogsRequest } from '@/models/request/care-log/get-care-logs-request';
import PlusCircleFilled from '@ant-design/icons/lib/icons/PlusCircleFilled';
import { CreateCareLogModal } from '@/pages/CareLogs/create-care-log-modal';
import { useState } from 'react';
import Button from 'antd/es/button';
import {
  CARE_LOG_TYPE,
  type CareLogType,
} from '@/interfaces/care-log/care-log-type';
import { PageCommon } from '@/components/layout/page/page-common';

function generateCareLogs(count: number): CareLog[] {
  const careLogs: CareLog[] = [];
  const plantingActionValues = Object.values(CARE_LOG_TYPE);

  for (let i = 0; i < count; i++) {
    const randomActionIndex = Math.floor(
      Math.random() * plantingActionValues.length,
    );
    const randomAction = plantingActionValues[randomActionIndex];

    const randomId = Math.random().toString(36).substring(2, 15);
    const randomCropId = Math.random().toString(36).substring(2, 10);
    const randomFieldId = Math.random().toString(36).substring(2, 10);
    const randomCreatedBy = `user_${Math.floor(Math.random() * 100)}`;

    // Generate random date with full timestamp format
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within the last year
    );

    // Add random milliseconds (0-999)
    const randomMilliseconds = Math.floor(Math.random() * 100); // 0-99 for .XX format
    const formattedDate =
      randomDate.toISOString().slice(0, -1) +
      randomMilliseconds.toString().padStart(2, '0');

    const descriptionMap: { [key in CareLogType]: string } = {
      [CARE_LOG_TYPE.Sowing]: 'Sowed new seeds for a healthy crop.',
      [CARE_LOG_TYPE.Watering]: 'Performed routine watering of the plants.',
      [CARE_LOG_TYPE.Fertilizing]: 'Applied fertilizer to enrich the soil.',
      [CARE_LOG_TYPE.SprayingPesticides]:
        'Sprayed pesticides to control pests.',
      [CARE_LOG_TYPE.Pruning]: 'Pruned excess branches for better growth.',
      [CARE_LOG_TYPE.Harvesting]: 'Harvested mature crops from the field.',
      [CARE_LOG_TYPE.Other]: 'Performed miscellaneous care activities.',
    };

    const randomDescription = descriptionMap[randomAction];

    careLogs.push({
      id: randomId,
      type: randomAction,
      description: randomDescription,
      date: formattedDate,
      cropId: randomCropId,
      fieldId: randomFieldId,
      createdBy: randomCreatedBy,
    });
  }
  return careLogs;
}

export const CareLogsPage = () => {
  const [filter, setFilter] = useStateSearchParams<GetCareLogsRequest>(
    {
      currentPage: 1,
      limit: 10,
      search: undefined,
      orderBy: 'date',
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

  const careLogs = generateCareLogs(filter.limit ?? 10);

  const [openCreateCareLogModal, setOpenCreateCareLogModal] = useState(false);

  return (
    <PageCommon
      headerTitle='Care logs'
      renderHeader={(HeaderComp, title) => (
        <HeaderComp className='flex items-center justify-between'>
          {title}
          <Button
            type='primary'
            icon={<PlusCircleFilled />}
            onClick={() => {
              setOpenCreateCareLogModal(true);
            }}
          >
            Create
          </Button>
        </HeaderComp>
      )}
      classNames={{
        body: 'min-h-0',
      }}
    >
      <div className='flex h-full flex-col rounded-2xl bg-white'>
        <div className='px-4 py-3'>
          <Input
            className='w-[20rem] max-w-full'
            size='small'
            placeholder='Search'
            prefix={<SearchOutlined />}
            value={filter.search}
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
              fixed: 'left',
              width: '9.5rem',
              ellipsis: {
                showTitle: false,
              },
              className: 'text-green-700',
              render: (_, row) => formatDateTime(row.date),
            },
            {
              title: 'Created by',
              fixed: 'left',
              width: '12.5rem',
              ellipsis: {
                showTitle: false,
              },
              dataIndex: 'createdBy',
              render: (_, row) => <EllipsisText>{row.createdBy}</EllipsisText>,
            },
            {
              title: 'Crop ID',
              width: '7.5rem',
              dataIndex: 'cropId',
            },
            {
              title: 'Field ID',
              width: '7.5rem',
              dataIndex: 'fieldId',
            },
            {
              title: 'Type',
              width: '7.5rem',
              dataIndex: 'type',
            },
            {
              title: 'Description',
              dataIndex: 'description',
              ellipsis: {
                showTitle: false,
              },
              render: (_, row) => (
                <EllipsisText>{row.description}</EllipsisText>
              ),
            },
          ]}
          rowKey={(row) => row.id}
          dataSource={careLogs}
          className='grow'
        />
        <PaginationCommon
          page={filter.currentPage}
          size={filter.limit}
          total={getCareLogsData?.totalRow}
          onChange={(page, size) => {
            setFilter({
              ...filter,
              currentPage: page,
              limit: size,
            });
          }}
          className='px-4 py-3'
        />
      </div>
      <CreateCareLogModal
        open={openCreateCareLogModal}
        onCancel={() => {
          setOpenCreateCareLogModal(false);
        }}
      />
    </PageCommon>
  );
};

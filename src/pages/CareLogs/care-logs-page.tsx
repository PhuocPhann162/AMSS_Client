import { useGetCareLogsQuery } from '@/api/care-log-api';
import { EllipsisText } from '@/components/text/ellipsis-text';
import { CareLog, PlantingAction } from '@/interfaces/care-log';
import PaginationCommon from '@/components/pagination/pagination-common';
import { SimpleTable } from '@/components/table/simple-table';
import { formatDateTime } from '@/utils/date-utils';
import Input from 'antd/es/input';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { useState } from 'react';
import { ListSortDirection } from '@/models';

function generateCareLogs(count: number): CareLog[] {
  const careLogs: CareLog[] = [];
  const plantingActionValues = Object.values(PlantingAction).filter(
    (value) => typeof value === 'number',
  ) as PlantingAction[];

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

    const descriptionMap: { [key in PlantingAction]: string } = {
      [PlantingAction.Sowing]: 'Sowed new seeds for a healthy crop.',
      [PlantingAction.Watering]: 'Performed routine watering of the plants.',
      [PlantingAction.Fertilizing]: 'Applied fertilizer to enrich the soil.',
      [PlantingAction.SprayingPesticides]:
        'Sprayed pesticides to control pests.',
      [PlantingAction.Pruning]: 'Pruned excess branches for better growth.',
      [PlantingAction.Harvesting]: 'Harvested mature crops from the field.',
      [PlantingAction.Other]: 'Performed miscellaneous care activities.',
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
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);

  const getCareLogs = useGetCareLogsQuery({
    currentPage: page,
    limit: size,
    search: searchValue,
    orderBy: 'date',
    orderByDirection: ListSortDirection.Descending,
  });

  const getCareLogsData =
    getCareLogs.data && !getCareLogs.isError ? getCareLogs.data : undefined;

  const careLogs = generateCareLogs(10);

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-semibold'>Care logs</h1>
      <div className='flex flex-col overflow-hidden rounded-2xl bg-white'>
        <div className='px-4 py-2'>
          <Input
            className='w-[20rem] max-w-full'
            size='small'
            placeholder='Search'
            prefix={<SearchOutlined />}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
        />
        <PaginationCommon
          page={page}
          size={size}
          total={getCareLogsData?.totalRow}
          onChange={(page, size) => {
            setPage(page);
            setSize(size);
          }}
          className='px-4 py-2'
        />
      </div>
    </div>
  );
};

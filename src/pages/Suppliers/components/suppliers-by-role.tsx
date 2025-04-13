import { useGetSeedCropSuppliersQuery } from '@/api/supplierApi';
import { AButton, ATable } from '@/common/ui-common';
import { SearchInput } from '@/components/UI/search-input';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, Role } from '@/interfaces';
import { GetSuppliersResponse } from '@/models';
import { TableParams } from '@/utils/models/Tables';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

interface SuppliersByRoleProps {
  supplierRole: Role;
}

function SuppliersByRole(props: SuppliersByRoleProps) {
  const { supplierRole } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);

  const [dataTable, setDataTable] = useState<GetSuppliersResponse[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const { data, isLoading } = useGetSeedCropSuppliersQuery({
    supplierRole: supplierRole,
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: tableParams.sortField?.toString() ?? 'CreatedAt',
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
    search: searchValue,
  });

  const activityLogCol: ColumnsType = useMemo(() => {
    return [
      {
        width: '6rem',
        title: 'Company Name',
        dataIndex: 'name',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '6rem',
        title: 'Contact Name',
        dataIndex: 'contactName',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '7rem',
        title: 'Email',
        dataIndex: 'email',
        ellipsis: true,
      },
      {
        width: '6rem',
        title: 'Contact Number',
        dataIndex: 'phoneNumber',
        ellipsis: true,
        render: (_, record) => {
          const { phoneCode, phoneNumber } = record;
          return `${phoneCode || ''} ${phoneNumber || ''}`;
        },
      },
      {
        width: '5rem',
        title: 'Country',
        dataIndex: 'countryName',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '5rem',
        title: 'Province',
        dataIndex: 'provinceName',
        sorter: true,
        ellipsis: true,
        render: (value: string) => value || 'N/A',
      },
      {
        title: 'Created Date',
        align: 'center',
        width: '5rem',
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
          <AButton type='link' className='color-primary hover:underline'>
            View
          </AButton>
        ),
      },
    ];
  }, []);

  useEffect(() => {
    const getSeedCropSuppliers = () => {
      try {
        setDataTable(data?.apiResponse.result.collection ?? []);
        setTotalRecord(data?.apiResponse.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getSeedCropSuppliers();
  }, [data]);

  return (
    <div className='flex flex-col gap-1'>
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
        placeholder={'Search by supplier name'}
        className='w-1/3 min-w-40'
      />
      <ATable
        columns={activityLogCol}
        dataSource={dataTable}
        tableParams={tableParams}
        totalRecord={totalRecord}
        loading={isLoading}
        scroll={{ y: '55vh' }}
        onChange={(params: TableParams) => {
          setTableParams(params);
        }}
      />
    </div>
  );
}

export default SuppliersByRole;

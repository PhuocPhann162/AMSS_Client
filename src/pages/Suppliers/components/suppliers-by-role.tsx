import { useGetSeedCropSuppliersQuery } from '@/api';
import { AButton, ATable } from '@/common/ui-common';
import {
  AFilterDropdown,
  FilterOpstion,
} from '@/common/ui-common/atoms/a-table/filter-dropdown';
import { SearchInput } from '@/components/UI/search-input';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, Country, Role } from '@/interfaces';
import { GetSuppliersResponse } from '@/models/response';
import { RootState } from '@/storage/redux/store';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import { TableParams } from '@/utils/models/Tables';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

interface SuppliersByRoleProps {
  supplierRole: Role;
}

export function SuppliersByRole(props: SuppliersByRoleProps) {
  const { supplierRole } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);

  const [dataTable, setDataTable] = useState<GetSuppliersResponse[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const { data, isLoading } = useGetSeedCropSuppliersQuery({
    supplierRole: supplierRole,
    ...(tableParams.filters &&
    tableParams.filters['CountryName'] &&
    (tableParams.filters['CountryName'] as string[]).length > 0
      ? { countryCodes: tableParams.filters['CountryName'] as string[] }
      : {}),
    currentPage: tableParams.pagination?.current ?? 1,
    limit: tableParams.pagination?.pageSize ?? 10,
    orderBy: tableParams.sortField?.toString() ?? 'CreatedAt',
    orderByDirection: tableParams.sortOrder === 'ascend' ? 0 : 1,
    search: searchValue,
  });
  const allCountries: Country[] = useSelector(
    (state: RootState) => state.countryStore,
  );
  const [countryFilters, setCountryFilters] = useState<FilterOpstion[]>([]);

  const supplierCropCol: ColumnsType = useMemo(() => {
    return [
      {
        width: '6rem',
        title: 'Company Name',
        dataIndex: 'Name',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '6rem',
        title: 'Contact Name',
        dataIndex: 'ContactName',
        sorter: true,
        ellipsis: true,
      },
      {
        width: '7rem',
        title: 'Email',
        dataIndex: 'Email',
        ellipsis: true,
      },
      {
        width: '6rem',
        title: 'Contact Number',
        dataIndex: 'PhoneNumber',
        ellipsis: true,
        render: (_, record) => {
          const { PhoneCode, PhoneNumber } = record;
          return `${PhoneCode || ''} ${PhoneNumber || ''}`;
        },
      },
      {
        width: '6rem',
        title: 'Country',
        dataIndex: 'CountryName',
        filterDropdown: (props) => (
          <AFilterDropdown {...props} optionsFilter={countryFilters} />
        ),
        ellipsis: true,
        render: (_, record) => {
          const { CountryCode, CountryName } = record;
          return (
            <div className='flex items-center gap-2'>
              <p>{flagemojiToPNG(convertToEmoji(CountryCode as string))} </p>
              <p>{CountryName}</p>
            </div>
          );
        },
      },
      {
        width: '5rem',
        title: 'Province',
        dataIndex: 'ProvinceName',
        sorter: true,
        ellipsis: true,
        render: (value: string) => value || 'N/A',
      },
      {
        title: 'Created Date',
        align: 'center',
        width: '5rem',
        dataIndex: 'CreatedAt',
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
  }, [countryFilters]);

  useEffect(() => {
    const countryOptions = allCountries
      .map((item: Country) => {
        return {
          title: `${item.name}`,
          key: `${item.value}`,
        };
      })
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    setCountryFilters(countryOptions);
  }, [allCountries]);

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
  }, [searchValue, data, tableParams]);

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
        placeholder={'Search by Contact Name and Company Name'}
        className='w-1/3 min-w-40'
      />
      <ATable
        columns={supplierCropCol}
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

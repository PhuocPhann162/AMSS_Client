import { useGetCustomersQuery, useLockUnLockUserMutation } from '@/api';
import { AButton, ATable } from '@/common/ui-common';
import {
  AFilterDropdown,
  FilterOpstion,
} from '@/common/ui-common/atoms/a-table/filter-dropdown';
import { CreateIcon } from '@/components/Icon';
import { PageCommon } from '@/components/layout/page/page-common';
import { Breadcrumb, SearchInput } from '@/components/UI';
import { PopupConfirmation } from '@/components/UI/modal';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { toastNotify } from '@/helper';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { apiResponse, Country } from '@/interfaces';
import { GetUsersResponse } from '@/models';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import { TableParams } from '@/utils/models/Tables';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AllUsers = () => {
  const navigate = useNavigate();
  // Start State
  const [searchValue, setSearchValue] = useState<string>('');
  const [tableParams, setTableParams] =
    useState<TableParams>(INITIAL_PAGINATION);

  const [dataTable, setDataTable] = useState<GetUsersResponse[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [countryFilters, setCountryFilters] = useState<FilterOpstion[]>([]);
  const [isOpenConfirmLockModal, setIsOpenConfirmLockModal] =
    useState<boolean>(false);

  // End State
  const allCountries = useAppSelector((state) => state.countryStore);
  const { data, isLoading } = useGetCustomersQuery({
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
  const [lockUnlockUser] = useLockUnLockUserMutation();

  const handleLockUnlockUser = async (userId: string) => {
    try {
      const response: apiResponse = await lockUnlockUser(userId);
      if (response?.data && response.data?.isSuccess) {
        toastNotify(
          response?.data.successMessage ||
            'User account locked/unlocked successfully',
        );
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
    } finally {
      setIsOpenConfirmLockModal(false);
    }
  };

  const userCol: ColumnsType = useMemo(() => {
    return [
      {
        width: '6rem',
        title: 'Contact Name',
        dataIndex: 'FullName',
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
        title: 'Street Address',
        dataIndex: 'Address',
        sorter: true,
        ellipsis: true,
        render: (value: string) => value || 'N/A',
      },
      {
        width: '5rem',
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
          <>
            <PopupConfirmation
              isOpen={isOpenConfirmLockModal}
              content='Kind Reminder: This action can lock/unlock this account!'
              onConfirm={() => handleLockUnlockUser(record.Id)}
              onCancel={() => setIsOpenConfirmLockModal(false)}
            />
            {record.IsActive ? (
              <AButton
                color='danger'
                variant='link'
                onClick={() => setIsOpenConfirmLockModal(true)}
              >
                <LockOutlined style={{ fontSize: '1.25rem', color: 'red' }} />{' '}
                Lock
              </AButton>
            ) : (
              <AButton
                color='gold'
                variant='link'
                onClick={() => setIsOpenConfirmLockModal(true)}
              >
                <UnlockOutlined
                  style={{ fontSize: '1.25rem', color: 'gold' }}
                />{' '}
                Unlock
              </AButton>
            )}
          </>
        ),
      },
    ];
  }, [countryFilters, isOpenConfirmLockModal]);

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
    const getCustomers = () => {
      try {
        setDataTable(data?.apiResponse.result.collection ?? []);
        setTotalRecord(data?.apiResponse.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getCustomers();
  }, [searchValue, data, tableParams]);

  return (
    <>
      <PageCommon
        headerTitle='Customers'
        renderHeader={(HeaderComp, title) => (
          <>
            <HeaderComp className='flex flex-col gap-2'>
              <div className='flex items-center justify-between'>
                <div>
                  <div className='flex items-center gap-2'>
                    {title}
                    <span className='rounded-full bg-green-100 px-3 py-1 text-xs text-green-600 shadow-md'>
                      {totalRecord} accounts
                    </span>
                  </div>
                  <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
                    These accounts have managed in the last 12 months.
                  </p>
                </div>
                <div>
                  <AButton
                    variant='solid'
                    color='cyan'
                    onClick={() => navigate('/app/user/register')}
                  >
                    <CreateIcon />
                    <span>New Customer</span>
                  </AButton>
                </div>
              </div>
            </HeaderComp>
          </>
        )}
      >
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
            placeholder={'Search by Contact name and Email'}
            className='w-1/3 min-w-40'
          />
          <ATable
            columns={userCol}
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
      </PageCommon>
    </>
  );
};

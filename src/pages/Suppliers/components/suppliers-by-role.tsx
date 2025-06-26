import { useGetSeedCropSuppliersQuery, useChangePasswordMutation } from '@/api';
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
import { FaRedoAlt, FaRegPaperPlane } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADrawer } from '@/common/ui-common/atoms/a-drawer/a-drawer';
import { Supplier } from '@/interfaces/supplier/supplier';
import { Descriptions } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

interface SuppliersByRoleProps {
  supplierRole: Role;
}

export function SuppliersByRole(props: SuppliersByRoleProps) {
  const { supplierRole } = props;
  const navigate = useNavigate();
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null,
  );
  const [changePassword, { isLoading: isResetting }] =
    useChangePasswordMutation();

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
        width: '12rem',
        align: 'center',
        fixed: 'right',
        dataIndex: '_',
        render: (_, record) => (
          <div className='flex items-center justify-center'>
            <AButton
              type='link'
              className='color-primary hover:underline'
              aria-label='View supplier details'
              tabIndex={0}
              onClick={() => handleViewSupplier(record)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ')
                  handleViewSupplier(record);
              }}
            >
              <EyeOutlined /> View
            </AButton>
            <AButton
              type='link'
              className='color-primary hover:underline'
              aria-label='Reset supplier password'
              tabIndex={0}
              disabled={isResetting}
              onClick={() => handleResetPassword()}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !isResetting)
                  handleResetPassword();
              }}
            >
              <FaRedoAlt /> {isResetting ? 'Resetting...' : 'Reset Password'}
            </AButton>
          </div>
        ),
      },
    ];
  }, [countryFilters, isResetting]);

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

  const handleViewSupplier = (record: any) => {
    setSelectedSupplier({
      id: record.Id,
      name: record.Name,
      contactName: record.ContactName,
      phoneCode: record.PhoneCode,
      phoneNumber: record.PhoneNumber,
      email: record.Email,
      address: record.Address,
      countryCode: record.CountryCode,
      countryName: record.CountryName,
      provinceCode: record.ProvinceCode,
      provinceName: record.ProvinceName,
      supplierRole: record.SupplierRole,
      createdAt: record.CreatedAt,
      updatedAt: record.UpdatedAt,
    });
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedSupplier(null);
  };

  const handleResetPassword = async () => {
    try {
      await changePassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }).unwrap();
      toastNotify('Password reset successfully', 'success');
    } catch (e) {
      toastNotify(
        (e as apiResponse)?.data?.errorMessages?.[0] ||
          'Reset password failed!',
        'error',
      );
    }
  };

  return (
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
          placeholder={'Search by Contact Name and Company Name'}
          className='w-1/3 min-w-40'
        />
        <AButton
          variant='solid'
          color='cyan'
          onClick={() => navigate('/app/user/register')}
        >
          <FaRegPaperPlane /> Send Invitation
        </AButton>
      </div>
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
      <ADrawer
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        title='Supplier Details'
        width={480}
        aria-label='Supplier details drawer'
      >
        {selectedSupplier && (
          <Descriptions
            bordered
            column={1}
            size='middle'
            className='rounded-md bg-white'
          >
            <Descriptions.Item
              label={<span className='font-semibold'>Company Name</span>}
            >
              {selectedSupplier.name}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Contact Name</span>}
            >
              {selectedSupplier.contactName || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Email</span>}
            >
              {selectedSupplier.email || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Phone</span>}
            >
              {`${selectedSupplier.phoneCode || ''} ${selectedSupplier.phoneNumber || ''}`}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Address</span>}
            >
              {selectedSupplier.address || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Country</span>}
            >
              <span className='flex items-center gap-2'>
                {flagemojiToPNG(convertToEmoji(selectedSupplier.countryCode))}
                {selectedSupplier.countryName}
              </span>
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Province</span>}
            >
              {selectedSupplier.provinceName || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Role</span>}
            >
              {selectedSupplier.supplierRole || 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Created At</span>}
            >
              {displayDateTimeByLocale(selectedSupplier.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item
              label={<span className='font-semibold'>Updated At</span>}
            >
              {displayDateTimeByLocale(selectedSupplier.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </ADrawer>
    </div>
  );
}

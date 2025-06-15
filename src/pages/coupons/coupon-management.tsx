import { useState, useMemo, useEffect } from 'react';
import { Empty, Input, Spin } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AButton } from '@/common/ui-common/atoms/a-button';
import { CouponCard } from '@/components/Coupon/coupon-card';
import { TablePaginationConfig } from '@/utils/models/Tables';
import {
  useCreateCouponMutation,
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useUpdateCouponMutation,
} from '@/api/coupon-api';
import { Coupon } from '@/interfaces/coupons';
import { APagination } from '@/common/ui-common/atoms/a-table/a-pagination';
import { apiResponse } from '@/interfaces';
import { toastNotify } from '@/helper';
import { CreateCouponModal } from '@/components/Coupon/create-coupon-modal';
import { UpdateCouponModal } from '@/components/Coupon/update-coupon-modal';
import { ViewCouponDrawer } from '@/components/Coupon/view-coupon-drawer';
import { CreateCouponRequest } from '@/models/request/coupon/create-coupon-request';

export const CouponManagment = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
  });
  const [isOpenCreateCouponModal, setIsOpenCreateCouponModel] =
    useState<boolean>(false);
  const [isOpenUpdateCouponModal, setIsOpenUpdateCouponModal] =
    useState<boolean>(false);
  const [isOpenViewCouponDrawer, setIsOpenViewCouponDrawer] =
    useState<boolean>(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataTable, setDataTable] = useState<Coupon[]>();
  const [totalRecord, setTotalRecord] = useState<number>(0);

  const { data, isLoading, isError } = useGetCouponsQuery({
    currentPage: pagination.current,
    limit: pagination.pageSize,
    search: searchTerm,
  });

  const { data: selectedCoupon } = useGetCouponByIdQuery(
    selectedCouponId || '',
    {
      skip: !selectedCouponId,
    },
  );

  const selectedCouponData =
    selectedCoupon?.isSuccess && selectedCoupon
      ? selectedCoupon.result
      : undefined;

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const handlePaginationChange = (newPagination: TablePaginationConfig) => {
    setPagination(newPagination);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddNewCoupon = () => {
    setIsOpenCreateCouponModel(true);
  };

  const handleCreateCoupon = async (data: CreateCouponRequest) => {
    try {
      const response = await createCoupon({
        ...data,
      }).unwrap();

      if (response.isSuccess) {
        toastNotify('Coupon created successfully', 'success');
      }
    } catch (error) {
      const errMessage =
        (error as apiResponse)?.data?.errorMessages?.[0] ||
        'Something went wrong';
      toastNotify(errMessage, 'error');
    } finally {
      setIsOpenCreateCouponModel(false);
    }
  };

  const handleUpdateCoupon = async (data: CreateCouponRequest) => {
    try {
      const response = await updateCoupon({
        id: selectedCouponId!,
        data: {
          ...data,
        },
      }).unwrap();

      if (response.isSuccess) {
        toastNotify('Coupon updated successfully', 'success');
      }
    } catch (error) {
      const errMessage =
        (error as apiResponse)?.data?.errorMessages?.[0] ||
        'Something went wrong';
      toastNotify(errMessage, 'error');
    } finally {
      setIsOpenUpdateCouponModal(false);
      setSelectedCouponId(null);
    }
  };

  const handleViewCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsOpenViewCouponDrawer(true);
  };

  const handleEditCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsOpenUpdateCouponModal(true);
  };

  const handleCloseViewDrawer = () => {
    setIsOpenViewCouponDrawer(false);
    setSelectedCouponId(null);
  };

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateCouponModal(false);
    setSelectedCouponId(null);
  };

  const formattedDate = useMemo(() => {
    const date = new Date();
    return (
      date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      ' ' +
      date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    );
  }, []);

  useEffect(() => {
    const getCoupons = () => {
      try {
        setDataTable(data?.result.collection ?? []);
        setTotalRecord(data?.result.totalRow ?? 0);
      } catch (e) {
        toastNotify(
          (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        );
      }
    };
    getCoupons();
  }, [searchTerm, data, pagination]);

  return (
    <div className='min-h-screen p-6'>
      <div className='flex items-center justify-between pb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Coupon</h1>
        <div className='text-lg font-medium text-gray-600'>{formattedDate}</div>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <Input
          placeholder='Search...'
          prefix={<SearchOutlined className='text-gray-400' />}
          className='w-64 rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50'
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label='Search coupons'
        />
        <AButton
          type='primary'
          size='large'
          onClick={handleAddNewCoupon}
          tabIndex={0}
          aria-label='Add new coupon'
          className='flex items-center gap-x-2 shadow-md'
        >
          <PlusOutlined />
          Add New Coupon
        </AButton>
      </div>

      {isLoading ? (
        <div className='text-center text-lg text-gray-600'>
          <Spin />
        </div>
      ) : isError ? (
        <div className='text-center text-lg text-red-600'>
          Error loading coupons.
        </div>
      ) : dataTable && dataTable.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
          {dataTable.map((coupon: Coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              onViewEdit={handleViewCoupon}
              onDelete={handleEditCoupon}
            />
          ))}
        </div>
      ) : (
        <Empty description='No coupons found.' />
      )}

      {totalRecord !== undefined && totalRecord > 0 && (
        <APagination
          pagination={pagination}
          onChange={handlePaginationChange}
          totalRecord={totalRecord}
        />
      )}

      <CreateCouponModal
        isOpen={isOpenCreateCouponModal}
        onClose={() => setIsOpenCreateCouponModel(false)}
        onSubmit={handleCreateCoupon}
      />

      <UpdateCouponModal
        isOpen={isOpenUpdateCouponModal}
        onClose={handleCloseUpdateModal}
        onSubmit={handleUpdateCoupon}
        coupon={selectedCouponData}
      />

      <ViewCouponDrawer
        isOpen={isOpenViewCouponDrawer}
        onClose={handleCloseViewDrawer}
        coupon={selectedCouponData}
      />
    </div>
  );
};

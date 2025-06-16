import { useGetCouponsQuery } from '@/api/coupon-api';
import { INITIAL_PAGINATION } from '@/configs/component.config';
import { useState, useEffect, useRef } from 'react';
import { Input, Button, Radio } from 'antd';
import { apiResponse } from '@/interfaces';
import { Coupon } from '@/interfaces/coupons';
import { toastNotify } from '@/helper';
import { formatLocalDate } from '@/helper/dayFormat';
import { ListSortDirection } from '@/models';
import { AButton, AModal } from '@/common/ui-common';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { useApplyCouponMutation } from '@/api/cart-api';

export const CouponsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string | null>(
    null,
  );
  const [voucherCodeInput, setVoucherCodeInput] = useState('');
  const [isSectionExpanded, setIsSectionExpanded] = useState(false);

  // Infinite Scroll States
  const [vouchers, setVouchers] = useState<Coupon[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getVouchersQuery = useGetCouponsQuery({
    currentPage: page,
    limit: INITIAL_PAGINATION.pagination?.pageSize,
    orderBy: 'discountAmount',
    orderByDirection: ListSortDirection.Descending,
  });
  const [applyCoupon, { isLoading: isApplyingCoupon }] =
    useApplyCouponMutation();

  // Effect to append new data
  useEffect(() => {
    if (
      getVouchersQuery.data?.result?.collection &&
      getVouchersQuery.isSuccess
    ) {
      const newVouchers = getVouchersQuery.data.result.collection;
      setVouchers((prevVouchers) => {
        // Prevent duplicate vouchers when fetching more data
        const uniqueNewVouchers = newVouchers.filter(
          (nv) => !prevVouchers.some((pv) => pv.id === nv.id),
        );
        return [...prevVouchers, ...uniqueNewVouchers];
      });
      setHasMore(
        vouchers.length + newVouchers.length <
          (getVouchersQuery.data.result.totalRow || 0),
      );
    }
  }, [getVouchersQuery.data, getVouchersQuery.isSuccess, vouchers.length]); // Added vouchers.length to dependencies

  // Scroll detection for infinite scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        hasMore &&
        !getVouchersQuery.isFetching
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setVouchers([]);
    setPage(1);
    setHasMore(true);
    setSelectedVoucherCode(null);
    // Initial fetch when modal opens, useEffect will handle appending
    getVouchersQuery.refetch();
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleApplyVoucherCode = async () => {
    if (!voucherCodeInput) {
      toastNotify('Please enter a voucher code!');
      return;
    }
    try {
      const result = await applyCoupon({
        couponCode: voucherCodeInput,
      }).unwrap();
      if (result.isSuccess) {
        toastNotify('Voucher applied successfully!');
        // Optionally close modal or collapse section if desired after apply
        // handleCloseModal();
        // setIsSectionExpanded(false);
        setVoucherCodeInput(''); // Clear input after successful application
      }
    } catch (error) {
      console.error('Failed to apply voucher code:', error);
      toastNotify(
        (error as apiResponse).data?.errorMessages?.[0] ||
          'An error occurred while applying the voucher code.',
      );
    }
  };

  const handleOk = async () => {
    if (selectedVoucherCode) {
      try {
        const result = await applyCoupon({
          couponCode: selectedVoucherCode,
        }).unwrap();
        if (result.isSuccess) {
          toastNotify('Apply voucher successfully!');
          handleCloseModal();
        }
      } catch (error) {
        console.error('Failed to apply selected voucher:', error);
        toastNotify(
          (error as apiResponse).data?.errorMessages?.[0] ||
            'Something went wrong when applying voucher.',
        );
      }
    } else {
      // If no voucher is selected in the modal, just close it
      handleCloseModal();
    }
  };

  const handleToggleSection = () => {
    setIsSectionExpanded((prev) => !prev);
    // When collapsing, clear the input if it's not applied
    if (isSectionExpanded) {
      setVoucherCodeInput('');
    }
  };

  return (
    <div className='w-full border-t border-gray-200 py-4'>
      <div
        className='flex cursor-pointer items-center justify-between py-2'
        onClick={handleToggleSection}
        tabIndex={0}
        role='button'
        aria-expanded={isSectionExpanded}
        aria-controls='voucher-section-content'
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggleSection();
          }
        }}
      >
        <span className='font-semibold text-gray-700'>Vouchers</span>
        {isSectionExpanded ? (
          <FaArrowAltCircleUp className='h-5 w-5 text-gray-500' />
        ) : (
          <FaArrowAltCircleDown className='h-5 w-5 text-gray-500' />
        )}
      </div>

      {isSectionExpanded && (
        <div id='voucher-section-content' className='mt-4 space-y-4'>
          <div className='flex items-center gap-2'>
            <Input
              placeholder='Enter voucher code'
              className='flex-grow'
              value={voucherCodeInput}
              onChange={(e) => setVoucherCodeInput(e.target.value)}
              onPressEnter={handleApplyVoucherCode}
              aria-label='Enter voucher code'
            />
            <Button
              type='primary'
              onClick={handleApplyVoucherCode}
              disabled={isApplyingCoupon || !voucherCodeInput}
              aria-label='Apply voucher code'
            >
              APPLY
            </Button>
          </div>
          <AButton
            variant='solid'
            color='cyan'
            onClick={handleOpenModal}
            className='w-full'
            aria-label='Browse all available vouchers'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleOpenModal();
              }
            }}
          >
            Browse all vouchers
          </AButton>
        </div>
      )}

      <AModal
        title={
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>Select Shopee Voucher</span>
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCloseModal}
        footer={[
          <AButton key='back' onClick={handleCloseModal}>
            BACK
          </AButton>,
          <AButton
            key='submit'
            type='primary'
            onClick={handleOk}
            disabled={!selectedVoucherCode || isApplyingCoupon}
          >
            OK
          </AButton>,
        ]}
        width={700}
        wrapClassName='shopee-voucher-modal-wrap'
        centered
      >
        <div className='flex flex-col gap-4 p-4'>
          <div className='flex items-center justify-between'>
            <h3 className='mb-2 text-lg font-bold'>Novaris Vouchers</h3>
            <p className='mb-4 text-sm text-gray-600'>
              You can select 1 Voucher
            </p>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className='max-h-[400px] space-y-4 overflow-y-auto pr-2'
          >
            {vouchers.length > 0 ? (
              <Radio.Group
                onChange={(e) => setSelectedVoucherCode(e.target.value)}
                value={selectedVoucherCode}
                className='w-full'
              >
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className={`relative flex cursor-pointer items-center overflow-hidden rounded-lg border-2 ${selectedVoucherCode === voucher.code ? 'border-green-500' : 'border-gray-200'} transition-all duration-200 ease-in-out hover:border-green-400`}
                    onClick={() => setSelectedVoucherCode(voucher.code)}
                    tabIndex={0}
                    role='radio'
                    aria-checked={selectedVoucherCode === voucher.code}
                    aria-label={`Voucher ${voucher.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedVoucherCode(voucher.code);
                      }
                    }}
                  >
                    {/* Left part: FREE SHIP */}
                    <div className='relative z-10 flex h-full w-32 flex-col items-center justify-center rounded-l-lg bg-gradient-to-br from-teal-400 to-teal-500 py-4 text-white'>
                      <span className='line-clamp-2 w-32 px-2 text-center text-sm font-bold'>
                        {voucher.title}
                      </span>
                      <span className='text-lg font-bold'>
                        {voucher.discountAmount}%
                      </span>
                      {/* Punched holes effect - simulated with pseudo-elements or absolute divs */}
                      <div className='absolute bottom-0 right-[-8px] top-0 flex w-4 flex-col justify-between overflow-hidden'>
                        <div className='h-4 w-4 rounded-full bg-white'></div>
                        <div className='h-4 w-4 rounded-full bg-white'></div>
                      </div>
                    </div>

                    {/* Dashed separator (using border-l and absolute position for circles) */}
                    <div className='relative flex h-full w-2 items-center justify-center'>
                      <div className='absolute left-[-8px] top-[-8px] h-4 w-4 rounded-full bg-white'></div>
                      <div className='absolute bottom-[-8px] left-[-8px] h-4 w-4 rounded-full bg-white'></div>
                      <div className='h-full border-l border-dashed border-gray-300'></div>
                    </div>

                    {/* Right part: Voucher details */}
                    <div className='relative z-10 min-h-[120px] flex-grow space-y-1 p-4'>
                      <div className='flex items-center justify-between'>
                        <h4 className='text-base font-bold text-gray-800'>
                          {voucher.title}
                        </h4>
                        {vouchers.indexOf(voucher) === 0 && (
                          <span className='rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-600'>
                            Best Choice
                          </span>
                        )}
                      </div>
                      <p className='line-clamp-2 text-sm text-gray-600'>
                        {voucher.description}
                      </p>
                      <p className='text-xs text-gray-500'>
                        Running out fast - Expires:{' '}
                        {formatLocalDate(voucher.expiration) || '30.06.2025'}
                      </p>
                    </div>

                    <Radio
                      value={voucher.code}
                      className='relative z-10 pr-4'
                    />
                  </div>
                ))}
                {getVouchersQuery.isFetching && (
                  <p className='py-2 text-center text-gray-500'>
                    Loading more vouchers...
                  </p>
                )}
                {!hasMore && vouchers.length > 0 && (
                  <p className='py-2 text-center text-gray-500'>
                    No more vouchers to load.
                  </p>
                )}
              </Radio.Group>
            ) : (
              !getVouchersQuery.isFetching && (
                <p className='text-gray-500'>No vouchers available</p>
              )
            )}
          </div>
        </div>
      </AModal>
    </div>
  );
};

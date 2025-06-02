import { MakePaymentResponse } from '@/api';
import { formatLocalDate } from '@/helper/dayFormat';
import { User } from '@/interfaces';
import { ADrawer } from '@/common/ui-common/atoms/a-drawer/a-drawer';
import { AButton } from '@/common/ui-common';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FaShoppingBag, FaTruck, FaEdit } from 'react-icons/fa';
import { CommodityCategoryTag } from '@/components/UI/tag/commodity-category-tag';
import MapboxAddressSearch, {
  AddressData,
} from '@/components/Page/Maps/MapBoxAddressSearch';

interface OrderSummaryProps {
  data: MakePaymentResponse;
  userInfo?: User;
  onAddressUpdate?: (newAddress: AddressData) => void;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  data,
  userInfo,
  onAddressUpdate,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(
    null,
  );

  const handleAddressSelected = (address: AddressData | null) => {
    setSelectedAddress(address);
  };

  const handleSaveAddress = () => {
    if (selectedAddress && onAddressUpdate) {
      onAddressUpdate(selectedAddress);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div className='rounded-lg bg-white p-6 shadow-lg'>
      <div className='mb-6 flex items-center gap-2'>
        <FaShoppingBag className='text-2xl text-green-600' />
        <h2 className='text-2xl font-semibold text-gray-800'>Order Summary</h2>
      </div>

      {/* Order Items */}
      <div className='mb-6 space-y-4'>
        {data.cartItems &&
          data.cartItems?.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 rounded-lg bg-gray-50 p-3'
            >
              <img
                src={item.commodityImage}
                alt={item.commodityName}
                className='h-16 w-16 rounded-md object-cover'
              />
              <div className='flex-1'>
                <h3 className='font-medium text-gray-800'>
                  {item.commodityName}
                </h3>
                <div className='mt-1 flex items-center gap-2'>
                  <p className='text-sm text-gray-600'>
                    Quantity: {item.quantity}
                  </p>
                  {item.commodityCategory && (
                    <CommodityCategoryTag value={item.commodityCategory} />
                  )}
                </div>
              </div>
              <p className='font-semibold text-gray-900'>
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
      </div>

      {/* Delivery Information */}
      <div className='mb-6 border-t border-gray-200 pt-4'>
        <div className='mb-4 flex items-center gap-2'>
          <FaTruck className='text-green-600' />
          <h3 className='font-medium text-gray-800'>Delivery Information</h3>
        </div>
        <div className='rounded-lg bg-gray-50 p-4'>
          {/* Personal Information */}
          <div className='mb-4'>
            <h4 className='mb-2 text-sm font-semibold text-gray-600'>
              Personal Information
            </h4>
            <div className='space-y-2'>
              {userInfo?.avatar && (
                <div className='flex items-center gap-3'>
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.fullName || 'User avatar'}
                    className='h-12 w-12 rounded-full object-cover'
                  />
                  <div>
                    <p className='font-medium text-gray-800'>
                      {userInfo.fullName}
                    </p>
                    <p className='text-sm text-gray-600'>{userInfo.userName}</p>
                  </div>
                </div>
              )}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Email</p>
                  <p className='text-gray-700'>{userInfo?.email}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Phone</p>
                  <p className='text-gray-700'>
                    {userInfo?.phoneCode && userInfo?.phoneNumber
                      ? `${userInfo.phoneCode} ${userInfo.phoneNumber}`
                      : 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className='mb-4'>
            <div className='mb-2 flex items-center justify-between'>
              <h4 className='text-sm font-semibold text-gray-600'>
                Address Information
              </h4>
              <AButton
                variant='text'
                color='cyan'
                icon={<FaEdit className='text-green-600' />}
                onClick={() => setIsDrawerOpen(true)}
                className='flex items-center gap-1'
              >
                Edit Address
              </AButton>
            </div>
            <div className='space-y-2'>
              <div>
                <p className='text-sm text-gray-500'>Street Address</p>
                <p className='text-gray-700'>
                  {userInfo?.streetAddress || 'Not provided'}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Province</p>
                  <p className='text-gray-700'>
                    {userInfo?.provinceName}{' '}
                    {userInfo?.provinceCode && `(${userInfo.provinceCode})`}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Country</p>
                  <p className='text-gray-700'>
                    {userInfo?.countryName}{' '}
                    {userInfo?.countryCode && `(${userInfo.countryCode})`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Totals */}
      <div className='border-t border-gray-200 pt-4'>
        <div className='space-y-2'>
          <div className='flex justify-between text-gray-600'>
            <span>Subtotal</span>
            <span>${data.cartTotal?.toFixed(2)}</span>
          </div>
          <div className='flex justify-between text-gray-600'>
            <span>Discount</span>
            <span>- ${data.discount?.toFixed(2)}</span>
          </div>
          <div className='flex justify-between border-t pt-2 text-lg font-semibold text-gray-900'>
            <span>Total</span>
            <span>${data.cartTotal?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className='mt-6 rounded-lg bg-green-50 p-4'>
        <div className='flex items-center gap-2'>
          <FaTruck className='text-green-600' />
          <p className='text-green-800'>
            Estimated Delivery:{' '}
            {formatLocalDate(dayjs().add(7, 'day').toString())}
          </p>
        </div>
      </div>

      {/* Add Drawer at the end of the component */}
      <ADrawer
        title='Edit Delivery Address'
        placement='right'
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={600}
        extra={
          <AButton type='primary' onClick={handleSaveAddress}>
            Save Address
          </AButton>
        }
      >
        <div className='space-y-4'>
          <MapboxAddressSearch
            onAddressSelected={handleAddressSelected}
            placeholder='Search your address...'
          />
          {selectedAddress && (
            <div className='mt-4 rounded-lg bg-gray-50 p-4'>
              <h4 className='mb-2 font-medium text-gray-800'>
                Selected Address:
              </h4>
              <p className='text-gray-600'>{selectedAddress.fullAddress}</p>
            </div>
          )}
        </div>
      </ADrawer>
    </div>
  );
};

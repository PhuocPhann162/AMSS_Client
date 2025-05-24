import { MakePaymentResponse } from '@/api';
import { formatLocalDate } from '@/helper/dayFormat';
import dayjs from 'dayjs';
import React from 'react';
import { FaShoppingBag, FaTruck, FaCreditCard } from 'react-icons/fa';

interface OrderSummaryProps {
  data: MakePaymentResponse;
  userInput: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  data,
  userInput,
}) => {
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
                src={item.imageUrl}
                alt={item.productName}
                className='h-16 w-16 rounded-md object-cover'
              />
              <div className='flex-1'>
                <h3 className='font-medium text-gray-800'>
                  {item.productName}
                </h3>
                <p className='text-sm text-gray-600'>
                  Quantity: {item.quantity}
                </p>
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
          <p className='text-gray-700'>{userInput.name}</p>
          <p className='text-gray-700'>{userInput.address}</p>
          <p className='text-gray-700'>
            {userInput.city}, {userInput.country} {userInput.zipCode}
          </p>
          <p className='text-gray-700'>{userInput.email}</p>
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
            Estimated Delivery: {formatLocalDate(dayjs().toString())}
          </p>
        </div>
      </div>
    </div>
  );
};

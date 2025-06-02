import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { FaLock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { OrderDetail, OrderStatus, User } from '@/interfaces';
import { useNavigate } from 'react-router-dom';
import { CartItemDto } from '@/api';
import { useCreateOrderMutation } from '@/api/order-api';
import { toastNotify } from '@/helper';
import { CheckOutResultModal } from './checkout-result-modal';

export interface PaymentFormProps {
  data: {
    id?: string;
    cartItems?: CartItemDto[];
    couponCode?: string;
    cartTotal?: number;
    userId?: string;
    discount?: number;
    stripePaymentIntentId?: string;
    status?: OrderStatus;
  };
  userInfo?: User;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ data, userInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createOrder] = useCreateOrderMutation();
  const [isOpenPrintInvoiceModal, setIsOpenPrintInvoiceModal] =
    useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          payment_method_data: {
            billing_details: {
              name: userInfo?.fullName,
              email: userInfo?.email,
              address: {
                city: userInfo?.provinceName,
                country: userInfo?.countryName,
                line1: userInfo?.streetAddress,
              },
            },
          },
        },
        redirect: 'if_required',
      });

      if (result.error) {
        toastNotify(
          result.error.message ?? 'An unexpected error occurred',
          'error',
        );
        setIsProcessing(false);
        return;
      }

      // Place Order
      let totalItems = 0;

      const orderDetailsDTO: OrderDetail[] = [];
      data.cartItems?.map((item: CartItemDto) => {
        const tempOrderDetails: OrderDetail = {
          commodityId: item.commodityId,
          quantity: item.quantity,
          itemName: item.commodityName,
          price: item.price,
        };
        orderDetailsDTO.push(tempOrderDetails);
        totalItems += item.quantity;
        return null;
      });

      const response = await createOrder({
        pickupName: userInfo?.fullName,
        pickupPhoneNumber: userInfo?.phoneCode + ' ' + userInfo?.phoneNumber,
        pickupEmail: userInfo?.email,
        orderTotal: data.cartTotal,
        totalItems: totalItems,
        discountAmount: data.discount,
        couponCode: data.couponCode,
        applicationUserId: data.userId,
        stripePaymentIntentID: data.stripePaymentIntentId,
        status:
          result.paymentIntent.status === 'succeeded'
            ? OrderStatus.Confirmed
            : OrderStatus.Pending,
        orderDetails: orderDetailsDTO,
      });

      if (response) {
        if (response.data?.result) {
          setIsOpenPrintInvoiceModal(true);
        }
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <CheckOutResultModal
        isOpen={isOpenPrintInvoiceModal}
        onClose={() => setIsOpenPrintInvoiceModal(false)}
        order={{ data, userInfo }}
      />
      <div className='rounded-lg bg-white p-6 shadow-lg'>
        <div className='mb-6 flex items-center gap-2'>
          <FaCreditCard className='text-2xl text-green-600' />
          <h2 className='text-2xl font-semibold text-gray-800'>
            Payment Details
          </h2>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div className='rounded-lg bg-gray-50 p-4'>
              <PaymentElement />
            </div>

            {error && (
              <div className='rounded-lg bg-red-50 p-3 text-sm text-red-600'>
                {error}
              </div>
            )}

            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <FaLock className='text-green-600' />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-gray-600'>Total Amount:</span>
              <span className='text-xl font-semibold text-gray-900'>
                ${data?.cartTotal?.toFixed(2)}
              </span>
            </div>

            <button
              type='submit'
              disabled={!stripe || isProcessing}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium text-white ${
                !stripe || isProcessing
                  ? 'cursor-not-allowed bg-gray-400'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className='h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                  Processing...
                </>
              ) : (
                <>
                  <FaShieldAlt />
                  Pay ${data?.cartTotal?.toFixed(2)}
                </>
              )}
            </button>
          </div>

          <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
            <FaLock className='text-green-600' />
            <span>Secure payment powered by Stripe</span>
          </div>
        </form>
      </div>
    </>
  );
};

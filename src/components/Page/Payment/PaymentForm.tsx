import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaLock, FaCreditCard, FaShieldAlt } from 'react-icons/fa';

interface PaymentFormProps {
  data: {
    total: number;
  };
  userInput: {
    name: string;
    email: string;
  };
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  data,
  userInput,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: userInput.name,
            email: userInput.email,
          },
        });

      if (stripeError) {
        setError(stripeError.message || 'An error occurred');
        return;
      }

      // Here you would typically send the paymentMethod.id to your server
      console.log('Payment successful:', paymentMethod);
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
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
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              className='p-3'
            />
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
              ${data.total.toFixed(2)}
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
                Pay ${data.total.toFixed(2)}
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
  );
};

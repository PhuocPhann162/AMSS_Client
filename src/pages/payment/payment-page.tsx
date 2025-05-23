import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSummary } from '@/components/Page/Order/OrderSummary';
import { PaymentForm } from '@/components/Page/Payment/PaymentForm';
import { MakePaymentResponse, useMakePaymentMutation } from '@/api/payment-api';

export function PaymentPage() {
  const [paymentData, setPaymentData] = useState<MakePaymentResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialPayment] = useMakePaymentMutation();

  // Fake user input data
  const userInput = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '123 Main Street',
    city: 'New York',
    country: 'United States',
    zipCode: '10001',
  };

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await initialPayment();
        setPaymentData(response.data);
      } catch (error) {
        console.error('Failed to initialize payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePayment();
  }, []);

  const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISH_KEY as string,
  );

  if (isLoading || !paymentData) {
    return (
      <div className='container m-5 p-5'>Loading payment information...</div>
    );
  }

  const options = {
    clientSecret: paymentData.clientSecret,
    secretKey: import.meta.env.VITE_STRIPE_SECRET_KEY as string,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className='container m-5 p-5'>
        <div className='row'>
          <div className='col-md-7'>
            <OrderSummary data={paymentData} userInput={userInput} />
          </div>
          <div className='col-md-4 offset-md-1'>
            <h3 className='text-success'>Payment</h3>
            <div className='mt-5'>
              <PaymentForm
                data={{ total: paymentData.cartTotal }}
                userInput={userInput}
              />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
}

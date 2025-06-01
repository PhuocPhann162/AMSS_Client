import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { OrderSummary } from '@/components/Page/Order/OrderSummary';
import { PaymentForm } from '@/components/Page/Payment/PaymentForm';
import { MakePaymentResponse, useMakePaymentMutation } from '@/api/payment-api';
import { useAppSelector } from '@/storage/redux/hooks/use-app-selector';

export function PaymentPage() {
  const [paymentData, setPaymentData] = useState<MakePaymentResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialPayment] = useMakePaymentMutation();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    const initializePayment = async () => {
      try {
        const response = await initialPayment();
        setPaymentData(response.data?.result);
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
      <div className='container mt-16 bg-slate-100 p-5'>
        <div className='grid grid-cols-2 gap-5'>
          <div className='col-md-7'>
            <OrderSummary data={paymentData} userInfo={auth.user} />
          </div>
          <div className='col-md-4 offset-md-1'>
            <PaymentForm
              data={{ total: paymentData.cartTotal }}
              userInfo={auth.user}
            />
          </div>
        </div>
      </div>
    </Elements>
  );
}

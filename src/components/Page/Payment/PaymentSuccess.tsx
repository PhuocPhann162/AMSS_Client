import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { AButton } from '@/common/ui-common';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleContinueShopping = () => {
    navigate('/store');
  };

  const handleViewOrder = () => {
    navigate(`/orders`);
  };

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='rounded-lg bg-white p-8 text-center shadow-xl'
        >
          <div className='mb-6 flex justify-center'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <FaCheckCircle className='h-20 w-20 text-green-haze-500' />
            </motion.div>
          </div>

          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            Payment Successful!
          </h1>

          <p className='mb-8 text-lg text-gray-600'>
            Thank you for your purchase. Your order has been successfully
            processed.
          </p>

          <div className='space-y-4'>
            <div className='mb-6 rounded-lg bg-green-50 p-4'>
              <p className='font-medium text-green-800'>Order ID: {orderId}</p>
              <p className='mt-1 text-sm text-green-600'>
                A confirmation email has been sent to your email address.
              </p>
            </div>

            <div className='flex flex-col justify-center gap-4 sm:flex-row'>
              <AButton
                variant='solid'
                color='cyan'
                onClick={handleViewOrder}
                size='large'
                aria-label='View order details'
              >
                <FaShoppingBag />
                View Order Details
              </AButton>

              <AButton
                onClick={handleContinueShopping}
                size='large'
                aria-label='Continue shopping'
              >
                <FaHome />
                Continue Shopping
              </AButton>
            </div>
          </div>

          <div className='mt-8 border-t border-gray-200 pt-6'>
            <p className='text-sm text-gray-500'>
              If you have any questions about your order, please contact our
              customer support.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

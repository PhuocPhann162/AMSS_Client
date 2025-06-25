import React, { useRef } from 'react';
import { PaymentFormProps } from './PaymentForm';
import { CartItemDto } from '@/api';
import { useReactToPrint } from 'react-to-print';
import { AButton, AModal } from '@/common/ui-common';
import { FaPrint } from 'react-icons/fa';

interface PrintComponentProps {
  order: PaymentFormProps;
}

const PrintComponent: React.FC<PrintComponentProps> = ({ order }) => {
  const totalPrice =
    order.data.cartTotal! - (order.data.discount ? order.data.discount : 0);
  return (
    <div className='container mt-3'>
      <div className='card ml-5 mr-5'>
        <div className='card-header'>
          Invoice <strong>#{order.data.id}</strong>
          <span className='float-right'>
            {' '}
            <strong>Status:</strong>{' '}
          </span>
        </div>
        <div className='card-body'>
          <div className='mt-2'>
            <div className='border px-2 py-3'>
              Name : {order.userInfo?.fullName}
            </div>
            <div className='border px-2 py-3'>
              Email : {order.userInfo?.email}
            </div>
            <div className='border px-2 py-3'>
              Phone : {order.userInfo?.phoneNumber}
            </div>
            <div className='border px-2 py-3'>
              <h4 className='text-emerald-600'>Menu Items</h4>
              <div className='p-3'>
                {order.data.cartItems?.map(
                  (cartItem: CartItemDto, index: number) => (
                    <div className='d-flex' key={index}>
                      <div className='d-flex w-100 justify-content-between'>
                        <p>{cartItem.commodityName}</p>
                        <p>
                          ${cartItem.price} x {cartItem.quantity} =
                        </p>
                      </div>
                      <p style={{ width: '70px', textAlign: 'right' }}>
                        ${(cartItem.price ?? 0) * (cartItem.quantity ?? 0)}
                      </p>
                    </div>
                  ),
                )}

                <hr />
                <div className='d-flex align-items-center justify-content-between'>
                  <span>Total Cart Price: </span>
                  <h4 className='' style={{ textAlign: 'right' }}>
                    ${order.data.cartTotal?.toFixed(2)}
                  </h4>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                  <span>Discount Amount: </span>
                  <h4 className='' style={{ textAlign: 'right' }}>
                    ${order.data.discount?.toFixed(2)}
                  </h4>
                </div>
                <div className='d-flex align-items-center justify-content-between'>
                  <span>Total Price After Discount: </span>
                  <h4 className='text-red-500' style={{ textAlign: 'right' }}>
                    ${totalPrice.toFixed(2)}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card-footer'>
          <strong>Note:</strong> Payment is due within 30 days
        </div>
      </div>
    </div>
  );
};

export const CheckOutResultModal: React.FC<{
  order: PaymentFormProps;
  isOpen: boolean;
  onClose: () => void;
}> = (props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className='container'>
      <AModal
        open={props.isOpen}
        onCancel={() => {
          props.onClose();
        }}
        title={<h3 style={{ color: 'var(--blue-color)' }}>Invoice</h3>}
      >
        <AButton onClick={handlePrint} aria-label='Print invoice'>
          <FaPrint />
        </AButton>
        <div ref={contentRef}>
          <PrintComponent order={props.order} />
        </div>
      </AModal>
    </div>
  );
};

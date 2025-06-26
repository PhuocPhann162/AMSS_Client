import { useState } from 'react';
import { AButton } from '@/common/ui-common/atoms/a-button/a-button';
import { AModal } from '@/common/ui-common/atoms/a-modal/a-modal';
import { OrderStatus } from '@/interfaces/orders/order-header-model';
import { useUpdateOrderMutation } from '@/api/order-api';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  TruckOutlined,
  CheckOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { toastNotify } from '@/helper';
import { apiResponse } from '@/interfaces';

export type OrderStatusActionButtonProps = {
  orderId: string;
  currentStatus: OrderStatus;
  onStatusChanged?: (newStatus: OrderStatus) => void;
};

const statusFlow: Record<
  OrderStatus,
  {
    next?: OrderStatus;
    label?: string;
    buttonType?: 'primary' | 'default' | 'dashed';
    buttonColor?: string;
    icon?: JSX.Element;
    description?: string;
  }
> = {
  [OrderStatus.Pending]: {
    next: OrderStatus.Confirmed,
    label: 'Confirm Order',
    buttonType: 'primary',
    buttonColor: '#1890ff',
    icon: <CheckCircleOutlined />,
    description: 'Mark this order as confirmed and ready for processing',
  },
  [OrderStatus.Confirmed]: {
    next: OrderStatus.Processing,
    label: 'Start Processing',
    buttonType: 'primary',
    buttonColor: '#722ed1',
    icon: <PlayCircleOutlined />,
    description: 'Begin processing the order for shipment preparation',
  },
  [OrderStatus.Processing]: {
    next: OrderStatus.ReadyForShipment,
    label: 'Ready for Shipment',
    buttonType: 'primary',
    buttonColor: '#13c2c2',
    icon: <TruckOutlined />,
    description: 'Order is processed and ready to be shipped',
  },
  [OrderStatus.ReadyForShipment]: {
    next: OrderStatus.Delivered,
    label: 'Mark as Delivered',
    buttonType: 'primary',
    buttonColor: '#52c41a',
    icon: <CheckOutlined />,
    description: 'Confirm that the order has been delivered to customer',
  },
  [OrderStatus.Delivered]: {
    next: OrderStatus.Completed,
    label: 'Complete Order',
    buttonType: 'primary',
    buttonColor: '#52c41a',
    icon: <CheckCircleOutlined />,
    description: 'Finalize the order as completed',
  },
  [OrderStatus.Completed]: {},
  [OrderStatus.Cancelled]: {},
};

const getStatusDisplayName = (status: OrderStatus): string => {
  const statusNames: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: 'Pending',
    [OrderStatus.Confirmed]: 'Confirmed',
    [OrderStatus.Processing]: 'Processing',
    [OrderStatus.ReadyForShipment]: 'Ready for Shipment',
    [OrderStatus.Delivered]: 'Delivered',
    [OrderStatus.Completed]: 'Completed',
    [OrderStatus.Cancelled]: 'Cancelled',
  };
  return statusNames[status];
};

export const OrderStatusActionButton = ({
  orderId,
  currentStatus,
  onStatusChanged,
}: OrderStatusActionButtonProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const nextStatus = statusFlow[currentStatus]?.next;
  const buttonConfig = statusFlow[currentStatus];

  if (nextStatus === undefined || !buttonConfig.label) return null;

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleConfirm = async () => {
    try {
      // Only send the status property as required by UpdateOrderRequest
      await updateOrder({ orderId, status: nextStatus }).unwrap();
      setModalOpen(false);
      onStatusChanged?.(nextStatus);
      toastNotify('Update order status successfully');
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
    }
  };

  return (
    <>
      <AButton
        type={buttonConfig.buttonType || 'primary'}
        onClick={handleOpenModal}
        loading={isLoading}
        icon={buttonConfig.icon}
        style={{
          backgroundColor: buttonConfig.buttonColor,
          borderColor: buttonConfig.buttonColor,
          color: '#fff',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          minWidth: '140px',
          justifyContent: 'center',
        }}
        className='transition-opacity hover:opacity-90'
      >
        {buttonConfig.label}
      </AButton>
      <AModal
        open={modalOpen}
        onCancel={handleCloseModal}
        onOk={handleConfirm}
        confirmLoading={isLoading}
        okText='Confirm'
        cancelText='Cancel'
        title={
          <div className='flex items-center gap-2'>
            {buttonConfig.icon}
            <span>Confirm Status Change</span>
          </div>
        }
        okButtonProps={{
          style: {
            backgroundColor: buttonConfig.buttonColor,
            borderColor: buttonConfig.buttonColor,
          },
        }}
      >
        <div className='py-4'>
          <div className='mb-3'>
            <p className='mb-2 text-gray-700'>
              Are you sure you want to change the order status?
            </p>
            <div className='rounded-md bg-gray-50 p-3'>
              <div className='mb-2 flex items-center justify-between'>
                <span className='text-sm text-gray-600'>Current Status:</span>
                <span className='font-medium text-gray-800'>
                  {getStatusDisplayName(currentStatus)}
                </span>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-600'>New Status:</span>
                <span className='font-medium text-green-600'>
                  {getStatusDisplayName(nextStatus)}
                </span>
              </div>
            </div>
          </div>
          <p className='text-sm italic text-gray-600'>
            {buttonConfig.description}
          </p>
        </div>
      </AModal>
    </>
  );
};

import { ATag } from '@/common/ui-common';
import { OrderStatus } from '@/interfaces';

interface OrderStatusTagProps {
  value: number;
}

export const OrderStatusTag = ({ value }: OrderStatusTagProps) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return 'warning';
      case OrderStatus.Confirmed:
        return 'processing';
      case OrderStatus.Processing:
        return 'warning';
      case OrderStatus.ReadyForShipment:
        return 'processing';
      case OrderStatus.Delivered:
        return '#53D2CE';
      case OrderStatus.Completed:
        return 'success';
      case OrderStatus.Cancelled:
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Pending:
        return 'Pending';
      case OrderStatus.Confirmed:
        return 'Confirmed';
      case OrderStatus.Processing:
        return 'Processing';
      case OrderStatus.ReadyForShipment:
        return 'Ready For Shipment';
      case OrderStatus.Delivered:
        return 'Delivered';
      case OrderStatus.Completed:
        return 'Completed';
      case OrderStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return <ATag color={getStatusColor(value)}>{getStatusText(value)}</ATag>;
};

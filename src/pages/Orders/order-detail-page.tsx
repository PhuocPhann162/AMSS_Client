import { useGetOrderDetailQuery } from '@/api/order-api';
import {
  ABadge,
  ADivider,
  AHomeCard,
  ARawImage,
  ATag,
} from '@/common/ui-common';
import { AHomeButton } from '@/common/ui-common/atoms/a-button/a-home-button';
import { OrderStatus } from '@/interfaces/orders/order-header-model';
import { formatCurrency } from '@/utils/format-currency';
import {
  CreditCardOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Skeleton from 'antd/es/skeleton';
import Typography from 'antd/es/typography';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const statusMap: Record<
    OrderStatus,
    { color: string; icon: JSX.Element; text: string }
  > = {
    [OrderStatus.Pending]: {
      color: 'orange',
      icon: <ClockCircleOutlined />,
      text: 'Pending',
    },
    [OrderStatus.Confirmed]: {
      color: 'blue',
      icon: <CheckCircleOutlined />,
      text: 'Confirmed',
    },
    [OrderStatus.Processing]: {
      color: 'purple',
      icon: <ClockCircleOutlined />,
      text: 'Processing',
    },
    [OrderStatus.ReadyForShipment]: {
      color: 'geekblue',
      icon: <TruckOutlined />,
      text: 'Ready for shipment',
    },
    [OrderStatus.Delivered]: {
      color: 'green',
      icon: <CheckCircleOutlined />,
      text: 'Delivered',
    },
    [OrderStatus.Completed]: {
      color: 'green',
      icon: <CheckCircleOutlined />,
      text: 'Completed',
    },
    [OrderStatus.Cancelled]: {
      color: 'red',
      icon: <CloseCircleOutlined />,
      text: 'Cancelled',
    },
  };

  const statusInfo = statusMap[status];

  return <ABadge color={statusInfo.color} text={statusInfo.text} />;
};

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: orderResponse, isLoading } = useGetOrderDetailQuery(
    { id: id ?? '' },
    { skip: !id },
  );

  const order = orderResponse?.result;
  const orderDate = order?.orderDate ? new Date(order.orderDate) : null;
  const formattedDate = orderDate
    ? format(orderDate, 'MMMM d, yyyy h:mm a')
    : '';

  if (isLoading) {
    return (
      <div className='container mx-auto p-4'>
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className='container mx-auto p-4'>
        <div className='flex flex-col items-center justify-center py-10'>
          <Typography.Title level={3}>Order not found</Typography.Title>
          <AHomeButton type='primary' onClick={() => navigate('/orders')}>
            Back to Orders
          </AHomeButton>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 p-6 pt-0'>
      <AHomeButton
        type='link'
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        className='self-start p-0'
      >
        Back
      </AHomeButton>

      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <Typography.Title level={3}>
              Order #{id?.substring(0, 8).toUpperCase()}
            </Typography.Title>
            <Typography.Text type='secondary'>
              Placed on {formattedDate}
            </Typography.Text>
          </div>
          {order.status && <OrderStatusBadge status={order.status} />}
        </div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left Column - Order Items */}
          <div className='flex flex-col gap-6 lg:col-span-2'>
            <AHomeCard
              title='Order Items'
              classNames={{
                body: 'flex flex-col gap-4',
              }}
            >
              {order.orderDetails?.map((item, index) => (
                <div
                  key={index}
                  className='flex items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0'
                >
                  <div className='h-20 w-20 shrink-0 overflow-hidden rounded-md bg-gray-100'>
                    {item.commodity?.image ? (
                      <ARawImage
                        src={item.commodity.image}
                        alt={item.itemName}
                      />
                    ) : (
                      <div className='flex h-full w-full items-center justify-center bg-gray-200'>
                        <ShoppingCartOutlined className='text-2xl text-gray-400' />
                      </div>
                    )}
                  </div>
                  <div className='ml-4 flex-1'>
                    <div className='flex justify-between'>
                      <Typography.Text strong className='block'>
                        {item.itemName}
                      </Typography.Text>
                      <Typography.Text strong>
                        {formatCurrency(item.price || 0)}
                      </Typography.Text>
                    </div>
                    <Typography.Text type='secondary' className='block'>
                      Qty: {item.quantity}
                    </Typography.Text>
                    {item.commodity?.specialTag && (
                      <ATag color='blue' className='mt-1'>
                        {item.commodity.specialTag}
                      </ATag>
                    )}
                  </div>
                </div>
              ))}
            </AHomeCard>

            <AHomeCard
              title='Shipping Information'
              classNames={{
                body: 'flex flex-col gap-4',
              }}
            >
              <div className='flex items-start'>
                <div className='w-32 flex-shrink-0 text-gray-500'>
                  <EnvironmentOutlined className='mr-2' />
                  Location
                </div>
                <div>
                  <Typography.Text strong className='block'>
                    {order.location?.address || 'N/A'}
                  </Typography.Text>
                  <Typography.Text type='secondary' className='block'>
                    {order.location?.road}
                    {order.location?.district && `, ${order.location.district}`}
                  </Typography.Text>
                  <Typography.Text type='secondary'>
                    {order.location?.city}, {order.location?.state}{' '}
                    {order.location?.postCode}
                  </Typography.Text>
                </div>
              </div>
              <ADivider />
              <div className='flex items-start'>
                <div className='w-32 flex-shrink-0 text-gray-500'>
                  <TruckOutlined className='mr-2' />
                  Shipping Method
                </div>
                <div>
                  <Typography.Text strong>Standard Shipping</Typography.Text>
                  <Typography.Text type='secondary' className='block'>
                    Estimated delivery:{' '}
                    {orderDate &&
                      format(
                        new Date(orderDate.setDate(orderDate.getDate() + 3)),
                        'EEEE, MMM d, yyyy',
                      )}
                  </Typography.Text>
                </div>
              </div>
            </AHomeCard>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div className='flex flex-col gap-6 lg:sticky lg:top-[--navbar-height]'>
              <AHomeCard
                title='Customer Information'
                classNames={{ body: 'flex flex-col gap-3' }}
              >
                <div className='flex items-center'>
                  <UserOutlined className='mr-2 text-gray-500' />
                  <Typography.Text strong>
                    {order.pickupName || 'N/A'}
                  </Typography.Text>
                </div>
                <div className='flex items-center'>
                  <MailOutlined className='mr-2 text-gray-500' />
                  <Typography.Text>
                    {order.pickupEmail || 'N/A'}
                  </Typography.Text>
                </div>
                <div className='flex items-center'>
                  <PhoneOutlined className='mr-2 text-gray-500' />
                  <Typography.Text>
                    {order.pickupPhoneNumber || 'N/A'}
                  </Typography.Text>
                </div>
              </AHomeCard>

              <AHomeCard
                title='Order Summary'
                classNames={{ body: 'flex flex-col gap-3' }}
              >
                <div className='flex justify-between'>
                  <Typography.Text className='font-medium'>
                    Subtotal ({order.totalItems} items)
                  </Typography.Text>
                  <Typography.Text>
                    {formatCurrency(
                      order.orderDetails?.reduce(
                        (total, item) =>
                          total + (item.price || 0) * (item.quantity || 0),
                        0,
                      ) ?? 0,
                    )}
                  </Typography.Text>
                </div>
                {typeof order.discountAmount === 'number' && (
                  <div className='flex justify-between'>
                    <Typography.Text className='font-medium'>
                      Discount
                    </Typography.Text>
                    <Typography.Text type='success'>
                      -{formatCurrency(order.discountAmount)}
                    </Typography.Text>
                  </div>
                )}
                <ADivider className='my-2' />
                <div className='flex justify-between text-lg font-bold'>
                  <Typography.Text>Total</Typography.Text>
                  <Typography.Text>
                    {formatCurrency(order.orderTotal || 0)}
                  </Typography.Text>
                </div>
                <ADivider className='my-2' />
                <div className='flex items-center text-gray-500'>
                  <CreditCardOutlined className='mr-2' />
                  <Typography.Text type='secondary'>
                    Paid with Credit Card
                  </Typography.Text>
                </div>
              </AHomeCard>

              {/* <div className='flex flex-col gap-3'>
              <Button type='primary' block>
                Track Order
              </Button>
              <Button block>Print Receipt</Button>
              {order.status === 'Pending' && (
                <Button type='primary' danger block>
                  Cancel Order
                </Button>
              )}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

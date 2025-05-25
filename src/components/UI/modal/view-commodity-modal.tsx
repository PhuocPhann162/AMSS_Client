import { FC } from 'react';
import { AModal, ADescriptions } from '@/common/ui-common';
import { CommodityCategory } from '@/interfaces';
import { CommodityStatusTag } from '@/components/UI';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { useGetCommodityByIdQuery } from '@/api/commodity-api';

export type ViewCommodityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  commodityId: string;
};

export const ViewCommodityModal: FC<ViewCommodityModalProps> = ({
  isOpen,
  onClose,
  commodityId,
}) => {
  const { data, isLoading, error } = useGetCommodityByIdQuery(
    { id: commodityId },
    { skip: !commodityId },
  );
  const commodity = data?.result;
  const supplier = commodity?.supplier;
  const crop = commodity?.crop;

  return (
    <AModal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      aria-label='View Commodity Details'
      title={<h4 className='text-lg font-semibold'>Details</h4>}
      width={'60rem'}
      style={{ top: 20 }}
    >
      {isLoading && <div className='py-8 text-center'>Loading...</div>}
      {error && (
        <div className='py-8 text-center text-red-500'>
          Failed to load commodity details.
        </div>
      )}
      {!isLoading && !error && commodity && (
        <div className='flex flex-col'>
          <h5 className='mb-2 text-center font-semibold'>Commodity</h5>

          <ADescriptions
            layout='vertical'
            bordered
            items={[
              {
                label: 'Name',
                children: (
                  <div className='flex items-center gap-2'>
                    {commodity.image && (
                      <img
                        src={commodity.image}
                        alt={commodity.name}
                        className='h-10 w-10 rounded-full border object-cover'
                      />
                    )}
                    <span>{commodity.name}</span>
                  </div>
                ),
              },
              {
                label: 'Category',
                children: CommodityCategory[commodity.category],
              },
              {
                label: 'Price',
                children: `$ ${commodity.price.toFixed(2)}`,
              },
              {
                label: 'Expiration Date',
                children: displayDateTimeByLocale(commodity.expirationDate),
              },
              {
                label: 'Status',
                children: <CommodityStatusTag value={commodity.status} />,
              },
              {
                label: 'Created Date',
                children: displayDateTimeByLocale(commodity.createdAt),
              },
            ]}
            column={4}
            className='rounded-lg bg-white p-2'
          />

          {supplier && (
            <div>
              <h5 className='mb-2 text-center font-semibold'>Supplier</h5>
              <ADescriptions
                layout='vertical'
                bordered
                items={[
                  { label: 'Name', children: supplier.name },
                  {
                    label: 'Phone',
                    children: `${supplier.phoneCode + ' ' + supplier.phoneNumber}`,
                  },
                  { label: 'Email', children: supplier.email },
                  { label: 'Address', children: supplier.address },
                ]}
                column={4}
                className='rounded-lg bg-white p-2'
              />
            </div>
          )}

          {crop && (
            <div>
              <h5 className='mb-2 text-center font-semibold'>Crop</h5>
              <ADescriptions
                layout='vertical'
                bordered
                items={[
                  { label: 'Name', children: crop.name },
                  { label: 'Cycle', children: crop.cycle },
                  { label: 'Care Level', children: crop.careLevel },
                ]}
                column={4}
                className='rounded-lg bg-white p-2'
              />
            </div>
          )}
        </div>
      )}
    </AModal>
  );
};

import { FC } from 'react';
import { AModal, ADescriptions } from '@/common/ui-common';
import { CommodityCategory } from '@/interfaces';
import { CommodityStatusTag } from '@/components/UI';
import { displayDateTimeByLocale } from '@/helper/dayFormat';
import { useGetCommodityByIdQuery } from '@/api/commodity-api';
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineCurrencyDollar,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineCheckCircle,
  HiOutlineTag,
} from 'react-icons/hi';

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
      title={<h4 className='text-lg font-semibold'>Commodity Details</h4>}
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
        <div className='flex flex-col gap-6'>
          {/* Commodity Section */}
          <div className='flex flex-col items-center gap-4 rounded-xl border bg-white p-6 shadow'>
            <div className='flex flex-col items-center gap-2'>
              {commodity.image ? (
                <img
                  src={commodity.image}
                  alt={commodity.name}
                  className='mb-2 h-24 w-24 rounded-full border-2 border-gray-200 object-cover shadow'
                />
              ) : (
                <div className='mb-2 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-100'>
                  <HiOutlineTag
                    className='text-4xl text-gray-400'
                    aria-label='No image'
                  />
                </div>
              )}
              <span className='text-xl font-bold'>{commodity.name}</span>
              <span className='text-sm text-gray-500'>
                {CommodityCategory[commodity.category]}
              </span>
            </div>
            <div className='mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='flex items-center gap-2'>
                <HiOutlineCurrencyDollar
                  className='text-lg text-green-600'
                  aria-label='Price'
                />
                <span className='font-semibold'>Price:</span>
                <span className='text-base'>
                  $ {commodity.price.toFixed(2)}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <HiOutlineCalendar
                  className='text-lg text-blue-600'
                  aria-label='Expiration Date'
                />
                <span className='font-semibold'>Expiration:</span>
                <span>{displayDateTimeByLocale(commodity.expirationDate)}</span>
              </div>
              <div className='flex items-center gap-2'>
                <HiOutlineCheckCircle
                  className='text-lg text-emerald-600'
                  aria-label='Status'
                />
                <span className='font-semibold'>Status:</span>
                <CommodityStatusTag value={commodity.status} />
              </div>
              <div className='flex items-center gap-2'>
                <HiOutlineCalendar
                  className='text-lg text-gray-500'
                  aria-label='Created Date'
                />
                <span className='font-semibold'>Created:</span>
                <span>{displayDateTimeByLocale(commodity.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Supplier Section */}
          {supplier && (
            <div className='rounded-xl border bg-gray-50 p-6 shadow'>
              <h5 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <HiOutlineUser
                  className='text-blue-500'
                  aria-label='Supplier'
                />{' '}
                Supplier
              </h5>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='flex items-center gap-2'>
                  <HiOutlineUser className='text-gray-500' aria-label='Name' />
                  <span className='font-semibold'>Name:</span>
                  <span>{supplier.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <HiOutlinePhone
                    className='text-green-600'
                    aria-label='Phone'
                  />
                  <span className='font-semibold'>Phone:</span>
                  <span>{supplier.phoneCode + ' ' + supplier.phoneNumber}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <HiOutlineMail className='text-red-500' aria-label='Email' />
                  <span className='font-semibold'>Email:</span>
                  <span>{supplier.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <HiOutlineLocationMarker
                    className='text-yellow-600'
                    aria-label='Address'
                  />
                  <span className='font-semibold'>Address:</span>
                  <span>{supplier.address}</span>
                </div>
              </div>
            </div>
          )}

          {/* Crop Section */}
          {crop && (
            <div className='rounded-xl border bg-green-50 p-6 shadow'>
              <h5 className='mb-4 flex items-center gap-2 text-lg font-semibold'>
                <HiOutlineTag className='text-green-600' aria-label='Crop' />{' '}
                Crop
              </h5>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Name:</span>
                  <span>{crop.name}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Cycle:</span>
                  <span>{crop.cycle}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Care Level:</span>
                  <span>{crop.careLevel}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Edible:</span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${crop.edible ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {crop.edible ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Soil:</span>
                  <span>{crop.soil}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Watering:</span>
                  <span>{crop.watering}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Maintenance:</span>
                  <span>{crop.maintenance}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Hardiness Zone:</span>
                  <span>{crop.hardinessZone}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Indoor:</span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-bold ${crop.indoor ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {crop.indoor ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Propagation:</span>
                  <span>{crop.propagation}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='font-semibold'>Growth Rate:</span>
                  <span>{crop.growthRate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AModal>
  );
};

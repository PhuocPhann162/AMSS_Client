import { LuCalendar, LuFileCheck, LuLeaf, LuPackage } from 'react-icons/lu';
import {
  CardInfo,
  CardInfoContent,
  CardInfoHeader,
  CardInfoIcon,
  CardInfoTitle,
} from '@/pages/commodity-origin/components/card-info';
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionInfoTitle,
} from '@/pages/commodity-origin/components/section-info';
import type { CropOrigin } from '@/interfaces/origin/crop-origin';
import { formatISODate } from '@/utils/date-utils';
import { EllipsisText } from '@/components/text/ellipsis-text';
import { GrCycle } from 'react-icons/gr';
import { GiGroundSprout } from 'react-icons/gi';
import { IoWaterOutline } from 'react-icons/io5';
import { FaHouse } from 'react-icons/fa6';
import { cloneElement, isValidElement, type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CropInfoProps {
  crop: CropOrigin;
}

export const CropInfo = ({ crop }: CropInfoProps) => {
  return (
    <SectionInfo>
      <SectionInfoHeader>
        <SectionInfoTitle>Crop Information</SectionInfoTitle>
        <SectionInfoDescription>
          Origin and quality details of our cultivation materials
        </SectionInfoDescription>
      </SectionInfoHeader>
      <div className='grid gap-8 md:grid-cols-2'>
        <CardInfo>
          <CardInfoHeader>
            <CardInfoIcon asChild>
              <LuLeaf />
            </CardInfoIcon>
            <CardInfoTitle>Crop Details</CardInfoTitle>
          </CardInfoHeader>
          <CardInfoContent className='flex flex-col gap-6'>
            <div className='flex flex-col'>
              <h3 className='font-semibold'>{crop.name}</h3>
              <p className='text-muted-foreground'>{crop.description}</p>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {[
                {
                  icon: LuCalendar,
                  label: 'Planted Date',
                  value: crop.plantedDate
                    ? formatISODate(crop.plantedDate, 'MMM dd, yyyy')
                    : undefined,
                },
                {
                  icon: LuPackage,
                  label: 'Quantity',
                  value: crop.quantity ? `${crop.quantity} seeds` : undefined,
                },
                {
                  icon: GrCycle,
                  label: 'Cycle',
                  value: crop.cycle,
                },
                {
                  icon: GiGroundSprout,
                  label: 'Soil',
                  value: crop.soil,
                },
                {
                  icon: IoWaterOutline,
                  label: 'Watering',
                  value: crop.watering,
                },
                {
                  icon: FaHouse,
                  label: 'Indoor',
                  value:
                    typeof crop.indoor === 'boolean'
                      ? crop.indoor
                        ? 'Yes'
                        : 'No'
                      : undefined,
                },
              ].map((item, index) => (
                <div key={index} className='flex items-center gap-2'>
                  <item.icon className='h-4 w-4 shrink-0 text-green-700' />
                  <div className='flex min-w-0 flex-col text-xs'>
                    <EllipsisText className='text-xs font-medium uppercase text-muted-foreground'>
                      {item.label}
                    </EllipsisText>
                    <EllipsisText className='text-sm font-semibold'>
                      {item.value?.toString() || 'N/A'}
                    </EllipsisText>
                  </div>
                </div>
              ))}
            </div>
          </CardInfoContent>
        </CardInfo>

        <CardInfo>
          <CardInfoHeader>
            <CardInfoIcon asChild>
              <LuFileCheck />
            </CardInfoIcon>
            <CardInfoTitle>Origin & Quality</CardInfoTitle>
          </CardInfoHeader>
          <CardInfoContent className='flex flex-col gap-6'>
            <div className='flex flex-col items-start gap-0.5'>
              <h3 className='font-semibold'>Supplier: {crop.supplier.name}</h3>
              <p className='cursor-pointer text-xs text-muted-foreground hover:underline'>
                {crop.supplier.email}
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              {[
                { label: 'Address', value: crop.supplier.address },
                {
                  label: 'Contact Person',
                  value: (
                    <div className='flex flex-col gap-0.5'>
                      <p className='text-sm font-medium'>
                        {crop.supplier.contactName}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {crop.supplier.phoneCode}
                        {crop.supplier.phoneNumber}
                      </p>
                    </div>
                  ),
                  asChild: true,
                },
                {
                  label: 'Quality Inspection',
                  value: (
                    <div className='flex flex-col'>
                      <p className='text-sm'>Quality inspected and certified</p>
                      <p className='text-xs font-medium text-green-600 hover:underline'>
                        View inspection documents →
                      </p>
                    </div>
                  ),
                  asChild: true,
                },
              ].map((item, index) => {
                const sharedContentClassName = 'text-sm font-medium';

                return (
                  <div key={index} className='flex flex-col gap-0.5'>
                    <p className='text-xs font-medium uppercase text-muted-foreground'>
                      {item.label}
                    </p>
                    {item.asChild &&
                    isValidElement<HTMLAttributes<HTMLElement>>(item.value) ? (
                      cloneElement(item.value, {
                        className: twMerge(
                          sharedContentClassName,
                          item.value.props.className,
                        ),
                      })
                    ) : (
                      <div className={sharedContentClassName}>
                        {item.value !== undefined && item.value !== null
                          ? item.value
                          : 'N/A'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardInfoContent>
        </CardInfo>
      </div>
    </SectionInfo>
  );
};

import { AImage } from '@/common/ui-common';
import { Badge } from '@/components/ui/badge';
import { COMMODITY_CATEGORY_NAME } from '@/interfaces/commodity/commodity-category-v2';
import { COMMODITY_STATUS_NAME } from '@/interfaces/commodity/commodity-status-v2';
import type { CommodityOrigin } from '@/interfaces/origin/commodity-origin';
import type { ReactNode } from 'react';
import { LuStar, LuCheck, LuPhone, LuMail, LuMapPin } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

export interface CommodityHeaderProps {
  commodity: CommodityOrigin;
}

export const CommodityHeader = ({ commodity }: CommodityHeaderProps) => {
  return (
    <div>
      <div className='sticky top-0 h-screen bg-gradient-to-br from-green-600 via-green-500 to-green-400'>
        <div className='absolute inset-0 bg-black/30' />
      </div>

      <div className='relative z-10 -mt-[100vh] grid min-h-screen items-center gap-8 p-4 text-white md:grid-cols-2 md:p-8'>
        <div className='flex flex-col gap-10'>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2'>
                {[
                  COMMODITY_CATEGORY_NAME[commodity.category],
                  COMMODITY_STATUS_NAME[commodity.status],
                  commodity.specialTag,
                ].reduce<ReactNode[]>((acc, item, index) => {
                  if (item) {
                    acc.push(
                      <Badge
                        key={index}
                        className='w-fit border-white/30 bg-white/20 text-sm text-white hover:bg-white/30'
                      >
                        {item}
                      </Badge>,
                    );
                  }
                  return acc;
                }, [])}
              </div>
              <div className='flex flex-col gap-1'>
                <h1 className='text-4xl font-bold md:text-5xl'>
                  {commodity.name}
                </h1>
                <p className='text-xl text-white/90'>{commodity.description}</p>
              </div>
            </div>

            <div className='flex flex-wrap gap-3'>
              <Badge className='flex items-center gap-2 rounded-full bg-amber-400 text-orange-950 hover:bg-amber-400/90'>
                <LuCheck className='h-4 w-4' />
                <p>VietGAP Certified</p>
              </Badge>
              <Badge className='flex items-center gap-2 rounded-full border-white/30 bg-white/20 text-white hover:bg-white/30'>
                <LuCheck className='h-4 w-4' />
                <p>GlobalGAP</p>
              </Badge>
              <Badge className='flex items-center gap-2 rounded-full border-white/30 bg-white/20 text-white hover:bg-white/30'>
                <LuStar className='h-4 w-4' />
                <p>Organic</p>
              </Badge>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              <p className='text-sm font-medium text-neutral-200'>Producer</p>
              <p className='text-3xl font-bold'>{commodity.supplier.name}</p>
            </div>

            <div className='flex flex-col gap-2'>
              {[
                {
                  Icon: LuMapPin,
                  label: 'Headquarters',
                  value: commodity.supplier?.address,
                },
                {
                  Icon: LuPhone,
                  label: 'Phone',
                  value: `${commodity.supplier.phoneCode} ${commodity.supplier.phoneNumber}`,
                },
                {
                  Icon: LuMail,
                  label: 'Email',
                  value: commodity.supplier?.email,
                },
              ].map((item, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <item.Icon className='h-4 w-4 flex-shrink-0 text-green-400' />
                  <div>
                    <p className='text-lg font-medium'>{item.label}</p>
                    <p className='text-sm text-neutral-100'>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={twMerge(
            'flex items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm',
            !commodity.image ? 'aspect-square' : '',
          )}
        >
          {!commodity.image ? (
            <div className='text-center text-white/70'>
              <div className='mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/20'>
                <span className='text-3xl'>🐲</span>
              </div>
              <p>Product Image</p>
            </div>
          ) : (
            <AImage
              src={commodity.image}
              alt={commodity.name}
              rootClassName='w-full'
            />
          )}
        </div>
      </div>
    </div>
  );
};

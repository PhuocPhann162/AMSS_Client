import { Badge } from '@/components/ui/badge';
import { LuPhone, LuMail, LuStar, LuUser } from 'react-icons/lu';
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionInfoTitle,
} from '@/pages/commodity-origin/components/section-info';
import {
  CardInfo,
  CardInfoContent,
  CardInfoHeader,
  CardInfoIcon,
  CardInfoTitle,
} from '@/pages/commodity-origin/components/card-info';
import type { SupplierOrigin } from '@/interfaces/origin/supplier-origin';

export interface FarmerProfileProps {
  farmer?: SupplierOrigin;
}

export const FarmerProfile = ({ farmer }: FarmerProfileProps) => {
  if (farmer == null) return null;

  return (
    <SectionInfo>
      <SectionInfoHeader>
        <SectionInfoTitle>Meet Your Farmer</SectionInfoTitle>
        <SectionInfoDescription>
          The passionate grower behind your fresh produce
        </SectionInfoDescription>
      </SectionInfoHeader>

      <CardInfo className='border-green-100 shadow-lg transition-shadow hover:shadow-xl'>
        <CardInfoHeader>
          <CardInfoIcon asChild>
            <LuUser />
          </CardInfoIcon>
          <CardInfoTitle>Meet Your Farmer</CardInfoTitle>
        </CardInfoHeader>

        <CardInfoContent className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4 md:flex-row'>
            <div className='flex-shrink-0'>
              <div className='flex h-32 w-32 items-center justify-center rounded-full border-4 border-green-700/20 bg-gradient-to-br from-green-600/20 to-green-400/40'>
                <span className='text-4xl'>👨‍🌾</span>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col items-start gap-2 text-2xl md:flex-row md:items-center'>
                <h1 className='font-bold'>{farmer.name}</h1>
                <Badge className='flex items-center gap-1 rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-100'>
                  <LuStar className='h-3 w-3 fill-current' />
                  <p>Master Farmer</p>
                </Badge>
              </div>
              <p className='font-medium text-green-700'>
                Farm Owner & Agricultural Specialist
              </p>
            </div>
          </div>

          <div className='grid gap-6 md:grid-cols-2'>
            <div className='flex flex-col gap-4'>
              <h3 className='text-lg font-semibold'>Contact Information</h3>

              <div className='flex flex-col gap-3'>
                {[
                  { icon: LuPhone, label: 'Phone', value: farmer.phoneNumber },
                  { icon: LuMail, label: 'Email', value: farmer.email },
                ].map((item, index) => (
                  <div key={index} className='flex items-center space-x-3'>
                    <item.icon className='h-4 w-4 flex-shrink-0 text-green-600' />
                    <div>
                      <p className='text-sm font-medium'>{item.label}</p>
                      <p className='text-sm text-muted-foreground'>
                        {item.value != null ? item.value : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex flex-col gap-4'>
              <h3 className='text-lg font-semibold'>Experience & Awards</h3>

              <div className='flex flex-col gap-3'>
                {[
                  { value: '🏆 Best Organic Farmer 2023' },
                  { value: '🌱 Sustainable Agriculture Pioneer' },
                  { value: '📜 VietGAP Certified Producer' },
                  { value: '⭐ 20+ Years Experience' },
                ].map((item, index) => (
                  <Badge
                    key={index}
                    variant='outline'
                    className='w-full justify-start rounded-full border-green-200 p-3 text-green-700'
                  >
                    {item.value}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardInfoContent>
      </CardInfo>
    </SectionInfo>
  );
};

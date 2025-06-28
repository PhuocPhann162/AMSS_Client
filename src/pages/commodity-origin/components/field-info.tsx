import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LuMapPin, LuRuler, LuSprout } from 'react-icons/lu';
import { MapComponent } from '@/pages/commodity-origin/components/map-component';
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
import type { fieldModel } from '@/interfaces';
import { EllipsisText } from '@/components/text/ellipsis-text';

interface FieldInfoProps {
  field: fieldModel;
}

export const FieldInfo = ({ field }: FieldInfoProps) => {
  return (
    <SectionInfo>
      <SectionInfoHeader>
        <SectionInfoTitle>Field Information</SectionInfoTitle>
        <SectionInfoDescription>
          Detailed location and cultivation data
        </SectionInfoDescription>
      </SectionInfoHeader>

      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='flex flex-col gap-6'>
          <CardInfo>
            <CardInfoHeader>
              <CardInfoIcon asChild>
                <LuMapPin />
              </CardInfoIcon>
              <CardInfoTitle>Field Details</CardInfoTitle>
            </CardInfoHeader>
            <CardInfoContent className='flex flex-col gap-5'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='font-semibold'>{field.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    Field ID: {field.internalId}
                  </p>
                </div>
                {field.status != null && (
                  <Badge className='rounded-full bg-orange-100 text-orange-800 shadow-sm'>
                    {field.status}
                  </Badge>
                )}
              </div>

              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-0.5'>
                  <p className='text-xs font-medium uppercase text-muted-foreground'>
                    Location
                  </p>
                  <div>
                    {[
                      field.location?.road,
                      field.location?.district,
                      field.location?.city,
                    ].reduce<JSX.Element[]>((acc, curr) => {
                      if (curr != null) {
                        return [
                          ...acc,
                          <p className='text-sm' key={curr}>
                            {curr}
                          </p>,
                        ];
                      }

                      return acc;
                    }, [])}
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  {[
                    {
                      icon: LuRuler,
                      label: 'Plot Area',
                      value:
                        field.area != null
                          ? Math.round(field.area).toLocaleString() + ' m²'
                          : null,
                    },
                    {
                      icon: LuSprout,
                      label: 'Location Type',
                      value:
                        field.locationType != null ? field.locationType : null,
                    },
                  ].map((item, index) => (
                    <div className='flex items-center gap-2' key={index}>
                      <item.icon className='h-4 w-4 shrink-0 text-green-600' />
                      <div className='flex min-w-0 flex-col'>
                        <EllipsisText className='text-xs font-medium uppercase text-muted-foreground'>
                          {item.label}
                        </EllipsisText>
                        <EllipsisText className='text-sm font-semibold'>
                          {item.value != null ? item.value : 'N/A'}
                        </EllipsisText>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col gap-0.5'>
                  <p className='text-xs font-medium uppercase text-muted-foreground'>
                    GPS Coordinates
                  </p>
                  <code className='text-sm'>
                    {field.location?.lat}, {field.location?.lng}
                  </code>
                </div>
              </div>

              <Button
                variant='outline'
                className='hidden w-full border-green-200 text-green-700 hover:bg-green-50'
              >
                Open in Maps App
              </Button>
            </CardInfoContent>
          </CardInfo>

          <CardInfo>
            <CardInfoHeader>
              <CardInfoIcon asChild>
                <LuSprout />
              </CardInfoIcon>
              <CardInfoTitle>Managing Farm</CardInfoTitle>
            </CardInfoHeader>
            <CardInfoContent className='flex flex-col gap-5'>
              <div className='flex flex-col'>
                <h3 className='font-semibold'>{field.farm?.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  Owner: {field.farm?.ownerName}
                </p>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center space-x-2'>
                  <LuRuler className='h-4 w-4 text-green-600' />
                  <div>
                    <p className='text-xs font-medium uppercase text-muted-foreground'>
                      Total Farm Area
                    </p>
                    <p className='text-sm font-semibold'>
                      {field.farm?.area != null
                        ? Math.round(field.farm.area).toLocaleString() + ' m²'
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </CardInfoContent>
          </CardInfo>
        </div>

        <div className='lg:sticky lg:top-24 lg:h-fit'>
          <CardInfo>
            <CardInfoHeader>
              <CardInfoIcon asChild>
                <LuSprout />
              </CardInfoIcon>
              <CardInfoTitle>Interactive Map</CardInfoTitle>
            </CardInfoHeader>
            <CardInfoContent className='p-0'>
              <MapComponent
                lng={field.location?.lng ?? 0}
                lat={field.location?.lat ?? 0}
              />
            </CardInfoContent>
          </CardInfo>
        </div>
      </div>
    </SectionInfo>
  );
};

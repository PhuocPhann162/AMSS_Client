import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LuMapPin } from 'react-icons/lu';

export const CultivationMap = () => {
  return (
    <Card className='transition-all duration-500 ease-out hover:shadow-lg'>
      <CardHeader>
        <CardTitle className='text-2xl text-green-600'>
          🗺️ Cultivation Location
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='flex flex-col gap-4 md:col-span-2'>
            <div className='flex flex-col gap-2'>
              <h4 className='font-semibold text-primary'>Field Information</h4>
              <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Field ID:
                  </span>
                  <Badge variant='outline'>BT-2024-007</Badge>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>Area:</span>
                  <span className='font-medium'>2.5 hectares</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-muted-foreground'>
                    Soil Type:
                  </span>
                  <span className='font-medium'>Red Basaltic Soil</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <h4 className='flex items-center gap-2 font-semibold text-primary'>
                <LuMapPin className='h-4 w-4' />
                Address
              </h4>
              <p className='text-muted-foreground'>
                Ham Thuan Nam District, Binh Thuan Province, Vietnam
              </p>
              <div className='rounded-lg bg-secondary/30 p-3'>
                <p className='text-sm'>
                  <span className='font-medium'>GPS Coordinates:</span>
                  <br />
                  Latitude: 11.0451° N, Longitude: 108.0976° E
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <h4 className='font-semibold text-primary'>Interactive Map</h4>
            <div className='flex aspect-square items-center justify-center rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/20'>
              <div className='flex flex-col gap-2 text-center text-primary/60'>
                <LuMapPin className='mx-auto h-12 w-12' />
                <p className='text-sm'>Map Integration</p>
                <p className='text-xs'>Click to view in maps</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className='flex flex-col gap-2 rounded-lg bg-secondary/30 p-4'>
          <h4 className='flex items-center gap-2 font-semibold text-primary'>
            <LuInfo className='h-4 w-4' />
            Cultivation History
          </h4>
          <p className='text-sm text-muted-foreground'>
            Previous crops: Rice (2022-2023), followed by soil restoration
            period. This rotation ensures optimal soil health and nutrient
            balance for dragon fruit cultivation.
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  LuCalendar,
  LuDroplets,
  LuSprout,
  LuSun,
  LuScissors,
} from 'react-icons/lu';
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionInfoTitle,
} from '@/pages/commodity-origin/components/section-info';
import {
  CardInfo,
  CardInfoDescription,
  CardInfoHeader,
  CardInfoIcon,
  CardInfoTitle,
} from '@/pages/commodity-origin/components/card-info';
import { GiProgression } from 'react-icons/gi';

const cultivationSteps = [
  {
    date: '2024-03-15',
    title: 'Planting',
    description: 'Seeds planted in prepared soil with optimal spacing',
    icon: LuSprout,
    type: 'planting',
    details: 'High-quality seeds planted at 15cm intervals with proper depth',
  },
  {
    date: '2024-03-20',
    title: 'First Fertilization',
    description: 'Organic compost applied (2kg per m²)',
    icon: LuSun,
    type: 'fertilization',
    details: 'Organic compost rich in nitrogen and phosphorus',
  },
  {
    date: '2024-04-01',
    title: 'Initial Watering',
    description: 'Drip irrigation system activated',
    icon: LuDroplets,
    type: 'irrigation',
    details: 'Automated drip irrigation providing 2L per plant daily',
  },
  {
    date: '2024-04-15',
    title: 'Pest Control',
    description: 'Natural pest control methods applied',
    icon: LuSprout,
    type: 'pest-control',
    details: 'Beneficial insects introduced, neem oil spray applied',
  },
  {
    date: '2024-05-01',
    title: 'Mid-Season Care',
    description: 'Pruning and soil conditioning',
    icon: LuScissors,
    type: 'maintenance',
    details: 'Selective pruning for optimal growth, soil pH adjusted',
  },
  {
    date: '2024-06-15',
    title: 'Pre-Harvest',
    description: 'Final quality checks and preparation',
    icon: LuCalendar,
    type: 'preparation',
    details: 'Quality assessment, harvest tools sterilized',
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'planting':
      return 'bg-green-100 text-green-800';
    case 'fertilization':
      return 'bg-yellow-100 text-yellow-800';
    case 'irrigation':
      return 'bg-blue-100 text-blue-800';
    case 'pest-control':
      return 'bg-purple-100 text-purple-800';
    case 'maintenance':
      return 'bg-orange-100 text-orange-800';
    case 'preparation':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const CultivationProcess = () => {
  return (
    <SectionInfo>
      <SectionInfoHeader>
        <SectionInfoTitle>Cultivation Process</SectionInfoTitle>
        <SectionInfoDescription>
          Complete transparency in our farming practices
        </SectionInfoDescription>
      </SectionInfoHeader>

      <div className='grid gap-6'>
        <CardInfo className='border-green-100 shadow-lg'>
          <CardInfoHeader className='grid grid-cols-[auto_1fr]'>
            <CardInfoIcon asChild>
              <GiProgression className='self-center' />
            </CardInfoIcon>
            <CardInfoTitle className='text-green-800'>
              Cultivation Timeline
            </CardInfoTitle>
            <div />
            <CardInfoDescription>
              From planting to harvest - every step documented
            </CardInfoDescription>
          </CardInfoHeader>
          <CardContent className='p-6'>
            <div className='relative'>
              {/* Timeline line */}
              <div className='absolute bottom-0 left-8 top-0 w-0.5 bg-green-200'></div>

              <div className='space-y-6'>
                {cultivationSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={index}
                      className='group relative flex items-start space-x-4'
                    >
                      {/* Timeline dot */}
                      <div className='flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-4 border-green-200 bg-white shadow-md transition-colors group-hover:border-green-400'>
                        <Icon className='h-6 w-6 text-green-600' />
                      </div>

                      {/* Content */}
                      <div className='min-w-0 flex-1 pb-8'>
                        <div className='mb-2 flex items-center space-x-2'>
                          <h3 className='text-lg font-semibold text-gray-900'>
                            {step.title}
                          </h3>
                          <Badge className={getTypeColor(step.type)}>
                            {step.type.replace('-', ' ')}
                          </Badge>
                        </div>

                        <div className='mb-2 flex items-center text-sm text-gray-500'>
                          <LuCalendar className='mr-1 h-4 w-4' />
                          {new Date(step.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>

                        <p className='mb-2 text-gray-700'>{step.description}</p>
                        <p className='text-sm italic text-gray-600'>
                          {step.details}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </CardInfo>

        <div className='grid hidden gap-6 md:grid-cols-2'>
          <Card className='border-green-100 shadow-lg transition-shadow hover:shadow-xl'>
            <CardHeader className='bg-gradient-to-r from-green-50 to-green-100'>
              <CardTitle className='text-green-800'>
                Harvest Information
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 p-6'>
              <div className='space-y-3'>
                <div>
                  <p className='text-sm font-medium uppercase text-gray-500'>
                    Harvest Method
                  </p>
                  <p className='text-gray-900'>
                    Manual harvesting to ensure product quality
                  </p>
                </div>

                <div>
                  <p className='text-sm font-medium uppercase text-gray-500'>
                    Estimated Harvest
                  </p>
                  <p className='text-gray-900'>October 15-30, 2024</p>
                </div>

                <div>
                  <p className='text-sm font-medium uppercase text-gray-500'>
                    Processing
                  </p>
                  <p className='text-gray-900'>
                    Immediate washing, sorting, and cold storage
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className='border-green-100 shadow-lg transition-shadow hover:shadow-xl'>
            <CardHeader className='bg-gradient-to-r from-green-50 to-green-100'>
              <CardTitle className='text-green-800'>
                Quality Standards
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 p-6'>
              <div className='space-y-3'>
                <Badge className='w-full justify-center bg-green-600 py-2 text-white'>
                  VietGAP Compliant
                </Badge>
                <Badge
                  variant='outline'
                  className='w-full justify-center border-green-200 py-2 text-green-700'
                >
                  Organic Methods
                </Badge>
                <Badge
                  variant='outline'
                  className='w-full justify-center border-green-200 py-2 text-green-700'
                >
                  No Harmful Pesticides
                </Badge>
                <Badge
                  variant='outline'
                  className='w-full justify-center border-green-200 py-2 text-green-700'
                >
                  Water Quality Tested
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SectionInfo>
  );
};

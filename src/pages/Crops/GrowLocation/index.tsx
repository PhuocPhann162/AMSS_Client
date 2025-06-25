import GrowLocationForm from '@/components/UI/grow-location-form';
import GrowLocationMap from '@/components/Page/Maps/GrowLocationMap';
import GrowLocationModal, {
  CreateGrowLocationFieldRequest,
} from '@/components/Page/Maps/GrowLocationModal';
import AddPlanting from '@/components/Page/Plantings/AddPlanting';
import { Steps, Result, Button } from 'antd';
import { useMemo, useState } from 'react';
import { apiResponse, locationModel, pointModel } from '@/interfaces';
import { toastNotify } from '@/helper';
import { CheckCircleOutlined } from '@ant-design/icons';
import { GrowLocationModel } from '@/interfaces/growLocationModel';
import {
  useCreateFieldMutation,
  useCreateGrowLocationMutation,
  useGetAllFarmsQuery,
} from '@/api';
import { CreateLocationDto, CreatePolygonDto } from '@/models';
import { PageCommon } from '@/components/layout/page/page-common';

const growLocationSteps = [
  {
    title: 'Details',
  },
  {
    title: 'Map Location',
  },
  {
    title: 'Add Plantings',
  },
  {
    title: 'Complete',
  },
];

const getGrowLocationId = () => localStorage.getItem('nov-location-id') || '';

export const GrowLocation = () => {
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('nov-growlocation-step');
    return savedStep ? Number(savedStep) : 0;
  });
  const [isCreateGrowLocationLoading, setIsCreateGrowLocationLoading] =
    useState<boolean>(false);
  const [fieldInfo, setFielInfo] = useState<GrowLocationModel>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<locationModel | null>(null);
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const [selectedPoints, setSelectedPoints] = useState<pointModel[]>([]);

  const { data: dataFarm, isLoading: isLoadingFarms } = useGetAllFarmsQuery('');
  const [createGrowLocation] = useCreateGrowLocationMutation();
  const [createField] = useCreateFieldMutation();

  const handleSetCurrentStep = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem('nov-growlocation-step', step.toString());
  };

  // Step 0
  const handleOnFinishDetails = async (values: GrowLocationModel) => {
    setFielInfo(values);
    setIsCreateGrowLocationLoading(true);
    try {
      const response = await createGrowLocation(values).unwrap();
      if (response.result && response.isSuccess) {
        toastNotify(response.successMessage || 'Field created successfully');
        handleSetCurrentStep(1);
        localStorage.setItem('nov-location-id', response.result);
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
    } finally {
      setIsCreateGrowLocationLoading(false);
    }
  };

  // Step 1
  const handleLocationSelected = (
    location: locationModel,
    area: number,
    points: pointModel[],
  ) => {
    setSelectedLocation(location);
    setSelectedArea(area);
    setSelectedPoints(points);
    setIsModalOpen(true);
  };

  const handleGrowLocationMapModalSubmit = async (
    values: CreateGrowLocationFieldRequest,
  ) => {
    setIsModalOpen(false);

    const locationRequest: CreateLocationDto = {
      address: values.location.address ?? '',
      lat: values.location.lat ?? 0,
      lng: values.location.lng ?? 0,
      city: values.location.city,
      state: values.location.state,
      district: values.location.district,
      road: values.location.road,
      postCode: values.location.postCode,
      countryCode: values.location.countryCode,
    };

    const polygonRequest: CreatePolygonDto = {
      color: values.color,
      type: 0,
      positions: values.points,
    };
    try {
      const response = await createField({
        name: values.name,
        area: values.area ?? 0,
        farmId: values.farmId ?? '',
        fieldId: getGrowLocationId(),
        location: locationRequest,
        polygon: polygonRequest,
      });

      if (response.data && response.data.isSuccess) {
        toastNotify('Grow location created successfully!');
        handleSetCurrentStep(2);
      }
    } catch (e) {
      toastNotify(
        (e as apiResponse).data?.errorMessages?.[0] ?? 'Something wrong!',
        'error',
      );
    } finally {
      setIsCreateGrowLocationLoading(false);
    }
  };

  // Step 2
  const handlePlantingAdded = () => {};

  const handleComplete = () => {
    toastNotify('Grow location setup completed!', 'success');
    handleSetCurrentStep(3);
    localStorage.removeItem('nov-location-id');
    localStorage.removeItem('nov-growlocation-step');
  };

  const renderStepContent = useMemo(() => {
    const StepContent = () => {
      switch (currentStep) {
        case 0:
          return (
            <GrowLocationForm
              onFinish={handleOnFinishDetails}
              isLoading={isCreateGrowLocationLoading}
              farmsData={dataFarm?.apiResponse?.result}
              isLoadingFarms={isLoadingFarms}
            />
          );
        case 1:
          return (
            <>
              <div className='mb-4'>
                <h3 className='text-lg font-semibold'>
                  Draw Your Grow Location
                </h3>
                <p className='text-gray-600'>
                  Use the drawing tools to outline your field, bed, or
                  greenhouse on the map.
                </p>
              </div>
              <GrowLocationMap
                onLocationSelected={handleLocationSelected}
                farmsData={dataFarm?.apiResponse?.result}
              />
              {selectedLocation && (
                <GrowLocationModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onSubmit={handleGrowLocationMapModalSubmit}
                  location={selectedLocation}
                  area={selectedArea}
                  points={selectedPoints}
                  fieldName={fieldInfo?.name}
                  farmsData={dataFarm?.apiResponse?.result}
                />
              )}
            </>
          );
        case 2:
          return (
            <div className='mb-4'>
              <div className='mb-6 flex items-center justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>
                    Add Plantings to Your Location
                  </h3>
                  <p className='text-gray-600'>
                    Select crops to plant in your new grow location.
                  </p>
                </div>
                <Button type='primary' onClick={handleComplete}>
                  Complete Setup
                </Button>
              </div>

              <AddPlanting
                locationId={getGrowLocationId()}
                locationName={fieldInfo?.name || 'New Location'}
                onPlantingAdded={handlePlantingAdded}
              />
            </div>
          );
        case 3:
          return (
            <Result
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title='Grow Location Created Successfully!'
              subTitle={`Your new grow location "${fieldInfo?.name}" has been set up and is ready for use.`}
              extra={[
                <Button
                  type='primary'
                  key='dashboard'
                  onClick={() => (window.location.href = '/app/dashboard')}
                >
                  Go to Dashboard
                </Button>,
                <Button
                  key='view'
                  onClick={() =>
                    (window.location.href = `/app/map?fieldId=${getGrowLocationId()}`)
                  }
                >
                  View Location
                </Button>,
              ]}
            />
          );
        default:
          return null;
      }
    };

    StepContent.displayName = 'StepContent';
    return StepContent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentStep,
    isModalOpen,
    selectedLocation,
    selectedArea,
    selectedPoints,
    fieldInfo,
    isCreateGrowLocationLoading,
    dataFarm,
    isLoadingFarms,
  ]);

  return (
    <PageCommon headerTitle='New Grow Location'>
      <Steps
        current={currentStep}
        items={growLocationSteps}
        className='max-w-4xl py-4'
      />
      {renderStepContent()}
    </PageCommon>
  );
};

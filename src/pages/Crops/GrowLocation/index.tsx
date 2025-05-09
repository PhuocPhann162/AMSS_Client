import GrowLocationForm from '@/components/UI/grow-location-form';
import GrowLocationMap from '@/components/Page/Maps/GrowLocationMap';
import GrowLocationModal from '@/components/Page/Maps/GrowLocationModal';
import AddPlanting from '@/components/Page/Plantings/AddPlanting';
import { Steps, Result, Button } from 'antd';
import { useMemo, useState } from 'react';
import { apiResponse, locationModel, pointModel } from '@/interfaces';
import { toastNotify } from '@/helper';
import { CheckCircleOutlined } from '@ant-design/icons';
import { GrowLocationModel } from '@/interfaces/growLocationModel';
import { useCreateGrowLocationMutation, useGetAllFarmsQuery } from '@/api';

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

export const GrowLocation = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCreateGrowLocationLoading, setIsCreateGrowLocationLoading] =
    useState<boolean>(false);
  const [fieldInfo, setFielInfo] = useState<GrowLocationModel>();
  const [growLocationId, setGrowLocationId] = useState<string>('');
  const [formData, setFormData] = useState<GrowLocationModel>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<locationModel | null>(null);
  const [selectedArea, setSelectedArea] = useState<number>(0);
  const [selectedPoints, setSelectedPoints] = useState<pointModel[]>([]);
  const [createdLocationId, setCreatedLocationId] = useState<string>('');

  // Lấy dữ liệu farm một lần ở component cha
  const { data: dataFarm, isLoading: isLoadingFarms } = useGetAllFarmsQuery('');
  const [createGrowLocation] = useCreateGrowLocationMutation();

  const handleOnFinishDetails = async (values: GrowLocationModel) => {
    setFielInfo(values);
    setIsCreateGrowLocationLoading(true);
    try {
      const response = await createGrowLocation(values).unwrap();
      if (response.result && response.isSuccess) {
        toastNotify(response.successMessage || 'Field created successfully');
        setCurrentStep(1);
        setGrowLocationId(response.result);
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

  const handleModalSubmit = (values: any) => {
    // Giả định rằng API trả về ID của location mới tạo
    const newLocationId = `loc-${Date.now()}`;

    setFormData({
      ...formData,
      ...values,
      id: newLocationId,
    });

    setCreatedLocationId(newLocationId);
    setIsModalOpen(false);
    toastNotify('Grow location created successfully!', 'success');
    setCurrentStep(2);
  };

  const handlePlantingAdded = () => {
    // Có thể thêm logic xử lý sau khi thêm planting
    toastNotify('Planting added successfully!', 'success');
  };

  const handleComplete = () => {
    toastNotify('Grow location setup completed!', 'success');
    setCurrentStep(3);
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
                  onSubmit={handleModalSubmit}
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
                locationId={createdLocationId}
                locationName={formData?.name || 'New Location'}
                onPlantingAdded={handlePlantingAdded}
              />
            </div>
          );
        case 3:
          return (
            <Result
              icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              title='Grow Location Created Successfully!'
              subTitle={`Your new grow location "${formData?.name}" has been set up and is ready for use.`}
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
                    (window.location.href = `/app/crop/growLocation/${createdLocationId}`)
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
    formData,
    createdLocationId,
    isCreateGrowLocationLoading,
    dataFarm, // Thêm dataFarm vào dependencies
    isLoadingFarms, // Thêm isLoadingFarms vào dependencies
  ]);

  return (
    <div className='px-4'>
      <p className='mb-4 font-semibold'>New Grow Location</p>
      <Steps
        current={currentStep}
        items={growLocationSteps}
        className='max-w-4xl py-4'
      />
      {renderStepContent()}
    </div>
  );
};

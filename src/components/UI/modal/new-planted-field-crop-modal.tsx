import { useEffect, useMemo, useState } from 'react';
import { AButton, AInput, AModal, ASelect } from '@/common/ui-common';
import { SearchIcon } from '@/components/Icon';
import { motion } from 'framer-motion';
import { Spin, Tooltip } from 'antd';
import { getScrollAnimation, toastNotify } from '@/helper';
import { useAddCropPlatingMutation, useGetAllCropTypesQuery } from '@/api';
import { cropModel } from '@/interfaces';
import { AddPlatingCropsRequest } from '@/models/response/crop-response';

export interface CropTypeModel {
  id: string;
  name: string;
  description?: string;
  crops: cropModel[];
  icon?: string;
  type?: string;
}

interface GetAllCropTypesResponse {
  apiResponse: {
    result: CropTypeModel[];
  };
  totalRecords: any;
}

interface NewPlantedFieldCropModalProps {
  fieldId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const NewPlantedFieldCropModal = ({
  fieldId,
  isOpen,
  setIsOpen,
}: NewPlantedFieldCropModalProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCropType, setSelectedCropType] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const { data, isLoading } = useGetAllCropTypesQuery('', {
    selectFromResult: (result) =>
      result as { data?: GetAllCropTypesResponse; isLoading: boolean },
  });
  const [filteredCrops, setFilteredCrops] = useState<
    (cropModel & { type?: string; typeName?: string })[]
  >([]);
  const [cropTypes, setCropTypes] = useState<string[]>([]);
  const [allCrops, setAllCrops] = useState<
    (cropModel & { type?: string; typeName?: string })[]
  >([]);
  const [createPlanting] = useAddCropPlatingMutation();
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  useEffect(() => {
    if (data?.apiResponse?.result) {
      // Extract unique crop types
      const types = [
        ...new Set(data.apiResponse.result.map((cropType) => cropType?.type)),
      ].filter(Boolean) as string[];
      setCropTypes(types);

      // Flatten all crops and attach type/typeName
      const crops: (cropModel & { type?: string; typeName?: string })[] = [];
      data.apiResponse.result.forEach((cropType) => {
        cropType.crops.forEach((crop) => {
          crops.push({ ...crop, type: cropType.type, typeName: cropType.name });
        });
      });
      setAllCrops(crops);

      // Apply filters
      let filtered = [...crops];
      if (searchTerm) {
        filtered = filtered.filter((crop) =>
          crop.name?.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }
      if (selectedCropType) {
        filtered = filtered.filter((crop) => crop?.type === selectedCropType);
      }
      setFilteredCrops(filtered);
    } else {
      setFilteredCrops([]);
      setCropTypes([]);
      setAllCrops([]);
    }
  }, [data, searchTerm, selectedCropType]);

  const handlePlantCrop = async () => {
    if (!selectedCrop) {
      toastNotify('Please select a crop to plant', 'error');
      return;
    }

    const newPlanting: AddPlatingCropsRequest = {
      fieldId: fieldId,
      cropId: selectedCrop,
      quantity: 1,
      notes: '',
      status: 'planned',
      unit: 'seeds',
    };

    try {
      await createPlanting(newPlanting).unwrap();
      setIsOpen(false);
      setSelectedCrop('');
      setSearchTerm('');
      setSelectedCropType('');

      toastNotify('Crop planted successfully!', 'success');
    } catch {
      toastNotify('Failed to add planting', 'error');
    }
  };

  return (
    <AModal
      open={isOpen}
      title={
        <div className='flex items-center gap-2 px-4'>
          <h3 className='text-base font-bold tracking-wide text-black'>
            Plant New Crop
          </h3>
        </div>
      }
      onCancel={() => setIsOpen(false)}
      footer={[
        <AButton key='cancel' onClick={() => setIsOpen(false)}>
          Cancel
        </AButton>,
        <AButton
          key='plant'
          type='primary'
          color='cyan'
          onClick={handlePlantCrop}
          disabled={!selectedCrop}
        >
          Plant Crop
        </AButton>,
      ]}
      width={800}
    >
      <div className='p-4'>
        <div className='mb-6 flex flex-wrap gap-4'>
          {/* Search input */}
          <div className='relative min-w-[250px] flex-1'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <SearchIcon />
            </div>
            <AInput
              placeholder='Search crops...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pl-10'
            />
          </div>

          {/* Crop type filter */}
          <div className='w-40'>
            <ASelect
              placeholder='Filter by type'
              value={selectedCropType}
              onChange={(value) => setSelectedCropType(value as string)}
              allowClear
              options={cropTypes.map((type) => ({ label: type, value: type }))}
              className='w-full'
            />
          </div>
        </div>

        {isLoading ? (
          <div className='flex justify-center py-12'>
            <Spin size='large' />
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>
            No crops found matching your criteria
          </div>
        ) : (
          <div className='grid max-h-[400px] grid-cols-2 gap-4 overflow-y-auto p-2 md:grid-cols-3 lg:grid-cols-4'>
            {filteredCrops.map((crop) => (
              <Tooltip
                key={crop.id}
                title={crop.description || crop.typeName}
                placement='bottom'
              >
                <motion.div
                  className={`flex cursor-pointer flex-col items-center rounded-lg border-2 p-3 transition-all ${
                    selectedCrop === crop.id
                      ? 'border-cyan-600 bg-cyan-50'
                      : 'border-gray-200 hover:border-cyan-300'
                  }`}
                  onClick={() => setSelectedCrop(crop.id || '')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className='mb-2 h-16 w-16 overflow-hidden rounded-full'>
                    <motion.img
                      variants={scrollAnimation}
                      src={crop?.icon}
                      className='h-12 w-12 rounded-full'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      loading='lazy'
                    />
                  </div>
                  <h4 className='text-center text-sm font-medium'>
                    {crop.name}
                  </h4>
                  <span className='mt-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-[#7b7b7b]'>
                    {crop?.type || 'Unknown'}
                  </span>
                </motion.div>
              </Tooltip>
            ))}
          </div>
        )}
      </div>
    </AModal>
  );
};

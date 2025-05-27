import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getScrollAnimation } from '@/helper';
import { motion } from 'framer-motion';
import { useGetCropsByFieldIdQuery } from '@/api';
import { fieldCropModel } from '@/interfaces';
import { PlusOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { NewPlantedFieldCropModal } from '@/components/UI/modal/new-planted-field-crop-modal';

interface PopupCropProps {
  fieldId: string;
  isPlantedCrop?: boolean;
}

export const PopupCrop = ({ fieldId, isPlantedCrop }: PopupCropProps) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [fieldCrop, setFieldCrop] = useState<fieldCropModel[]>();
  const [isOpenNewPlantedCrop, setIsOpenNewPlantedCrop] =
    useState<boolean>(false);

  const { data, isLoading } = useGetCropsByFieldIdQuery(fieldId);

  useEffect(() => {
    if (data) {
      setFieldCrop(data.result);
    }
  }, [data]);

  return (
    <>
      <NewPlantedFieldCropModal
        isOpen={isOpenNewPlantedCrop}
        fieldId={fieldId}
        setIsOpen={setIsOpenNewPlantedCrop}
      />
      {isLoading && <Spin />}
      {!isLoading && (
        <div className='flex items-center gap-1'>
          {fieldCrop?.map((fc) => (
            <Link
              key={fc.cropId}
              to={`/app/crop/myCrops/cropDetail/${fc.cropId}`}
            >
              <motion.img
                variants={scrollAnimation}
                src={fc.crop?.icon}
                className='h-12 w-12 rounded-full'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                loading='lazy'
              />
            </Link>
          ))}
          {isPlantedCrop && (
            <div
              className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-black hover:border-green-haze-500 hover:text-green-500'
              onClick={() => setIsOpenNewPlantedCrop(true)}
            >
              <PlusOutlined />
            </div>
          )}
        </div>
      )}
    </>
  );
};

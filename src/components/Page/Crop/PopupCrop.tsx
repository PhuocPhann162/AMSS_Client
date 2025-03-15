import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getScrollAnimation } from '@/helper';
import { motion } from 'framer-motion';
import { useGetCropsByFieldIdQuery } from '@/api/cropApi';
import { MiniLoader } from '../common';
import { fieldCropModel } from '@/interfaces';

interface PopupCropProps {
  fieldId: string;
}

export const PopupCrop = ({ fieldId }: PopupCropProps) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [fieldCrop, setFieldCrop] = useState<fieldCropModel[]>();

  const { data, isLoading } = useGetCropsByFieldIdQuery(fieldId);

  useEffect(() => {
    if (data) {
      setFieldCrop(data.result);
    }
  }, [data]);

  return (
    <>
      {isLoading && <MiniLoader />}
      {!isLoading && (
        <div className='flex items-center gap-1'>
          {fieldCrop?.map((fc) => (
            <Link key={fc.cropId} to={`/app/crop/myCrops/cropDetail/${fc.cropId}`}>
              <motion.img
                variants={scrollAnimation}
                src={fc.crop?.icon}
                className='w-12 h-12 rounded-full'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                loading='lazy'
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

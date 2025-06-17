import { useGetCropsBySupplierQuery } from '@/api';
import type { cropModel } from '@/interfaces';
import Modal, { type ModalProps } from 'antd/es/modal';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectCropModalProps extends Omit<ModalProps, 'onOk'> {
  defaultValue?: cropModel;
  onOk?: (data: cropModel) => void;
}

export const SelectCropModal = ({
  defaultValue,
  onOk,
  ...props
}: SelectCropModalProps) => {
  const getCropsBySupplier = useGetCropsBySupplierQuery(undefined, {
    skip: !props.open,
  });
  const getCropsBySupplierData =
    getCropsBySupplier.data && !getCropsBySupplier.isError
      ? getCropsBySupplier.data
      : undefined;

  const [selectedCrop, setSelectedCrop] = useState<cropModel | undefined>(
    defaultValue,
  );

  return (
    <Modal
      title='Select Crop'
      {...props}
      classNames={{
        ...props.classNames,
        content: twMerge('flex flex-col gap-4', props.classNames?.content),
      }}
      okButtonProps={{
        disabled: !selectedCrop,
        ...props.okButtonProps,
      }}
      onOk={() => {
        if (selectedCrop && onOk) {
          onOk(selectedCrop);
        }
      }}
    >
      {!!getCropsBySupplierData?.collection?.length &&
        getCropsBySupplierData.collection.map((crop) => (
          <div
            key={crop.id}
            onClick={() => {
              setSelectedCrop(crop);
            }}
            className='flex items-center gap-2'
          >
            <img src={crop.icon} alt={crop.name} />
            <span>{crop.name}</span>
          </div>
        ))}
    </Modal>
  );
};

import { useGetCropsBySupplierQuery } from '@/api';
import type { cropModel } from '@/interfaces';
import Modal, { type ModalProps } from 'antd/es/modal';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectCropModalProps extends Omit<ModalProps, 'onOk'> {
  defaultValue?: cropModel['id'];
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

  const findCrop = useCallback(
    (id: cropModel['id']) => {
      return getCropsBySupplierData?.collection?.find((crop) => crop.id === id);
    },
    [getCropsBySupplierData?.collection],
  );

  const [selectedCrop, setSelectedCrop] = useState<cropModel | undefined>(
    () => {
      if (defaultValue) {
        return findCrop(defaultValue);
      }

      return undefined;
    },
  );

  useEffect(() => {
    if (props.open) {
      if (!getCropsBySupplier.isFetching) {
        setSelectedCrop(() => {
          if (defaultValue) {
            return findCrop(defaultValue);
          }

          return undefined;
        });
      }
    }
  }, [defaultValue, findCrop, getCropsBySupplier.isFetching, props.open]);

  return (
    <Modal
      title='Select Crop 🌱'
      destroyOnHidden
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

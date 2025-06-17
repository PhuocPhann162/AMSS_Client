import { useGetFieldsByCropQuery } from '@/api';
import type { cropModel, fieldModel } from '@/interfaces';
import Modal, { type ModalProps } from 'antd/es/modal';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectFieldModalProps extends Omit<ModalProps, 'onOk'> {
  cropId?: string;
  defaultValue?: fieldModel;
  onOk?: (data: cropModel) => void;
}

export const SelectFieldModal = ({
  cropId,
  defaultValue,
  onOk,
  ...props
}: SelectFieldModalProps) => {
  const getFieldsByCrop = useGetFieldsByCropQuery(
    { id: cropId ?? '' },
    {
      skip: !props.open,
    },
  );
  const getFieldsByCropData =
    getFieldsByCrop.data && !getFieldsByCrop.isError
      ? getFieldsByCrop.data
      : undefined;

  const [selectedField, setSelectedField] = useState<fieldModel | undefined>(
    defaultValue,
  );

  return (
    <Modal
      title='Select Field'
      {...props}
      classNames={{
        ...props.classNames,
        content: twMerge('flex flex-col gap-4', props.classNames?.content),
      }}
      okButtonProps={{
        disabled: !selectedField,
        ...props.okButtonProps,
      }}
      onOk={() => {
        if (selectedField && onOk) {
          onOk(selectedField);
        }
      }}
    >
      {!!getFieldsByCropData?.collection?.length &&
        getFieldsByCropData.collection.map((field) => (
          <div
            key={field.id}
            onClick={() => {
              setSelectedField(field);
            }}
          >
            {field.name}
          </div>
        ))}
    </Modal>
  );
};

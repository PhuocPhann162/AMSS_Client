import { useGetFieldsByCropQuery } from '@/api';
import type { fieldModel } from '@/interfaces';
import Modal, { type ModalProps } from 'antd/es/modal';
import { useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectFieldModalProps extends Omit<ModalProps, 'onOk'> {
  cropId?: string;
  defaultValue?: fieldModel['id'];
  onOk?: (data: fieldModel) => void;
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

  const findField = useCallback(
    (id: fieldModel['id']) => {
      return getFieldsByCropData?.collection?.find((field) => field.id === id);
    },
    [getFieldsByCropData?.collection],
  );

  const [selectedField, setSelectedField] = useState<fieldModel | undefined>(
    () => {
      if (defaultValue) {
        return findField(defaultValue);
      }

      return undefined;
    },
  );

  useEffect(() => {
    if (props.open) {
      if (!getFieldsByCrop.isFetching) {
        setSelectedField(() => {
          if (defaultValue) {
            return findField(defaultValue);
          }

          return undefined;
        });
      }
    }
  }, [defaultValue, findField, getFieldsByCrop.isFetching, props.open]);

  return (
    <Modal
      title='Select Field 🌾'
      destroyOnClose
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
      {getFieldsByCropData?.collection?.length ? (
        getFieldsByCropData.collection.map((field) => (
          <div
            key={field.id}
            onClick={() => {
              setSelectedField(field);
            }}
          >
            {field.name}
          </div>
        ))
      ) : (
        <p className='text-3xl font-medium'>No fields found</p>
      )}
    </Modal>
  );
};

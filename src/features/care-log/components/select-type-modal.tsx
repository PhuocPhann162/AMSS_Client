import { TypeTag } from '@/features/care-log/components/type-tag';
import {
  CARE_LOG_TYPE,
  type CareLogType,
} from '@/interfaces/care-log/care-log-type';
import Modal, { type ModalProps } from 'antd/es/modal';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export interface SelectTypeModalProps extends Omit<ModalProps, 'onOk'> {
  defaultValue?: CareLogType;
  onOk?: (data: CareLogType) => void;
}

export const SelectTypeModal = ({
  defaultValue,
  onOk,
  ...props
}: SelectTypeModalProps) => {
  const [selectedType, setSelectedType] = useState<CareLogType | undefined>(
    defaultValue,
  );

  useEffect(() => {
    if (props.open) {
      setSelectedType(defaultValue);
    }
  }, [defaultValue, props.open]);

  return (
    <Modal
      title='Select Type 💧'
      destroyOnClose
      {...props}
      classNames={{
        ...props.classNames,
        body: twMerge('flex flex-wrap gap-4', props.classNames?.body),
      }}
      okButtonProps={{
        disabled: typeof selectedType === 'undefined',
        ...props.okButtonProps,
      }}
      onOk={() => {
        if (typeof selectedType === 'number' && onOk) {
          onOk(selectedType);
        }
      }}
    >
      {Object.values(CARE_LOG_TYPE).map((type) => (
        <TypeTag
          key={type}
          type={type}
          onClick={() => {
            setSelectedType(type);
          }}
          className={twMerge(
            'cursor-pointer transition-[box-shadow,opacity] hover:opacity-100',
            typeof selectedType === 'number' ? 'opacity-50' : '',
            selectedType === type ? 'opacity-100 shadow-lg' : '',
          )}
        />
      ))}
    </Modal>
  );
};

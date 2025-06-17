import {
  CARE_LOG_TYPE,
  CARE_LOG_TYPE_LABEL,
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
      title='Select Type'
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
        if (selectedType && onOk) {
          onOk(selectedType);
        }
      }}
    >
      {Object.values(CARE_LOG_TYPE).map((type) => (
        <div
          key={type}
          onClick={() => {
            setSelectedType(type);
          }}
          className={twMerge(
            'cursor-pointer rounded-2xl border border-white/20 px-4 py-2 shadow-lg transition-colors duration-500 hover:bg-gray-100',
            selectedType === type && 'bg-gray-100',
          )}
        >
          {CARE_LOG_TYPE_LABEL[type]}
        </div>
      ))}
    </Modal>
  );
};

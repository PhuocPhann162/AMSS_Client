import { AModal, type AModalProps } from '@/common/ui-common';
import MapboxAddressSearch from '@/components/Page/Maps/MapBoxAddressSearch';
import type { UpdateAddressRequest } from '@/models';
import { useState } from 'react';

export interface UpdateAddressModalProps extends Omit<AModalProps, 'onOk'> {
  onOk?: (data: UpdateAddressRequest) => void;
}

export const UpdateAddressModal = ({
  onOk,
  ...props
}: UpdateAddressModalProps) => {
  const [internalData, setInternalData] = useState<
    UpdateAddressRequest | undefined
  >(undefined);

  return (
    <AModal
      title='Update Address'
      onOk={() => {
        if (internalData) {
          onOk?.(internalData);
        }
      }}
      {...props}
      okButtonProps={{ disabled: !internalData, ...props.okButtonProps }}
    >
      <MapboxAddressSearch
        onAddressSelected={(data) => {
          if (data) {
            setInternalData({
              streetAddress: data.fullAddress,
              lat: data.coordinates.lat,
              lng: data.coordinates.lng,
            });
          } else {
            setInternalData(undefined);
          }
        }}
      />
    </AModal>
  );
};

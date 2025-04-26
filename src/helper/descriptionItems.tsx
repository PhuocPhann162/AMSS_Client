import { DescriptionsProps } from 'antd';
import { format } from 'date-fns';
import { ATag } from '@/common/ui-common';
import { farmModel, fieldModel, locationModel } from '@/interfaces';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import getStatusColor from './getStatusColor';

export const farmDescriptionItems = (farmValue: farmModel) => {
  return [
    {
      key: '1',
      label: 'Name',
      children: farmValue.name,
    },
    {
      key: '2',
      label: 'Total Area',
      children: farmValue.area,
    },
    {
      key: '3',
      label: 'Owner Name',
      children: farmValue.ownerName,
    },

    {
      key: '4',
      label: 'Created Date',
      children: format(new Date(farmValue.createdAt!.toString()), 'dd/MM/yyyy'),
    },
  ];
};

export const fieldDescriptionItems = (fieldValue: fieldModel) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Name',
      children: fieldValue.name,
    },
    {
      key: '2',
      label: 'Farm Name',
      children: fieldValue.farm?.name,
    },
    {
      key: '3',
      label: 'Total Area',
      children: fieldValue.area?.toFixed(2),
    },
    {
      key: '4',
      label: 'Status',
      children: (
        <ATag color={getStatusColor(fieldValue.status!)}>
          {fieldValue.status}
        </ATag>
      ),
    },
    {
      key: '5',
      label: 'Created Date',
      children: format(
        new Date(fieldValue.createdAt!.toString()),
        'hh:mm a - dd/MM/yyyy',
      ),
    },
  ];
  return items;
};

export const locationDescriptionItems = (locationValue: locationModel) => {
  return [
    {
      key: '1',
      label: 'Road',
      children: locationValue.road,
    },
    {
      key: '2',
      label: 'State',
      children: locationValue.state,
    },
    {
      key: '3',
      label: 'District',
      children: locationValue.district,
    },
    {
      key: '4',
      label: 'City',
      children: locationValue.city,
    },
    {
      key: '5',
      label: 'Postal Code',
      children: locationValue.postCode,
    },
    {
      key: '6',
      label: 'Country',
      children: flagemojiToPNG(
        convertToEmoji(locationValue.countryCode?.toUpperCase() ?? ''),
      ),
    },
  ];
};

export const fieldEditDescriptionItems = (fieldValue?: fieldModel) => {
  const formatDateSafely = (dateValue: string) => {
    if (!dateValue) return 'N/A';

    try {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) return 'N/A';
      return format(date, 'hh:mm a - dd/MM/yyyy');
    } catch {
      return 'N/A';
    }
  };

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Name',
      children: fieldValue?.name,
    },
    {
      key: '2',
      label: 'Farm Name',
      children: fieldValue?.farm?.name,
    },
    {
      key: '3',
      label: 'Total Area',
      children:
        fieldValue?.area !== undefined
          ? fieldValue.area.toFixed(2) + ' m²'
          : 'N/A',
    },
    {
      key: '4',
      label: 'Location',
      children: fieldValue?.location?.address,
    },
    {
      key: '5',
      label: 'Owner Name',
      children: fieldValue?.farm?.ownerName,
    },
    {
      key: '6',
      label: 'Created Date',
      children: formatDateSafely(fieldValue?.createdAt ?? ''),
    },
  ];
  return items;
};

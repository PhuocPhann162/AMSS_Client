import { DescriptionsProps } from 'antd';
import { ATag } from '~/common/ui-common';
import { farmModel, fieldModel, locationModel } from '~/interfaces';
import { convertToEmoji, flagemojiToPNG } from '~/utils/convertEmoji';

export const farmDescriptionItems = (farmValue: farmModel) => {
  return [
    {
      key: '1',
      label: 'Name',
      children: farmValue.name
    },
    {
      key: '2',
      label: 'Total Area',
      children: farmValue.area
    },
    {
      key: '3',
      label: 'Owner Name',
      children: farmValue.ownerName
    },

    {
      key: '4',
      label: 'Created Date',
      children: farmValue.createdAt
    }
  ];
};

export const fieldDescriptionItems = (fieldValue: fieldModel) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Name',
      children: fieldValue.name
    },
    {
      key: '2',
      label: 'Farm Name',
      children: fieldValue.farm?.name
    },
    {
      key: '3',
      label: 'Total Area',
      children: fieldValue.area?.toFixed(2)
    },
    {
      key: '4',
      label: 'Status',
      children: <ATag color='green'>{fieldValue.status}</ATag>
    },
    {
      key: '5',
      label: 'Created Date',
      children: fieldValue.createdAt
    }
  ];
  return items;
};

export const locationDescriptionItems = (locationValue: locationModel) => {
  return [
    {
      key: '1',
      label: 'Road',
      children: locationValue.road
    },
    {
      key: '2',
      label: 'State',
      children: locationValue.state
    },
    {
      key: '3',
      label: 'District',
      children: locationValue.district
    },
    {
      key: '4',
      label: 'City',
      children: locationValue.city
    },
    {
      key: '5',
      label: 'Postal Code',
      children: locationValue.postCode
    },
    {
      key: '6',
      label: 'Country',
      children: flagemojiToPNG(convertToEmoji(locationValue.countryCode?.toUpperCase() ?? ''))
    }
  ];
};

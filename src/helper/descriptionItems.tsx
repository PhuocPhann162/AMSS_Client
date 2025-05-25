import { DescriptionsProps } from 'antd';
import { format } from 'date-fns';
import { ATag } from '@/common/ui-common';
import {
  CommodityCategory,
  CommodityStatus,
  farmModel,
  fieldModel,
  locationModel,
} from '@/interfaces';
import { convertToEmoji, flagemojiToPNG } from '@/utils/convertEmoji';
import { supplierModel } from '@/interfaces/supplierModel';
import { CropResponse } from '@/models/response/crop-response';
import { FilterOpstion } from '@/common/ui-common/atoms/a-table/filter-dropdown';
import { getStatusColor } from './getStatusColor';

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

export const supplierDescriptionItems = (supplierValue: supplierModel) => {
  return [
    {
      key: '1',
      label: 'Company Name',
      children: supplierValue.name,
    },
    {
      key: '2',
      label: 'Contact Name',
      children: supplierValue.contactName,
    },
    {
      key: '3',
      label: 'Country',
      children: (
        <div className='flex items-center gap-2'>
          {flagemojiToPNG(
            convertToEmoji(supplierValue.countryCode?.toUpperCase() ?? ''),
          )}
          {' ' + supplierValue.countryName}
        </div>
      ),
    },
    {
      key: '4',
      label: 'Email',
      children: supplierValue.email,
    },
    {
      key: '5',
      label: 'Contact Number',
      children: supplierValue.phoneCode + ' ' + supplierValue.phoneNumber,
    },
  ];
};

export const cropDescriptionItems = (crop: CropResponse) => {
  return [
    {
      key: '1',
      label: 'Crop Name',
      children: crop.name,
    },
    {
      key: '2',
      label: 'Description',
      children: crop.description || '-',
    },
    {
      key: '3',
      label: 'Crop Type',
      children: crop.cropTypeName || '-',
    },
    {
      key: '4',
      label: 'Cycle',
      children: crop.cycle || '-',
    },
    {
      key: '5',
      label: 'Edible',
      children: crop.edible ? 'true' : 'false',
    },
    {
      key: '6',
      label: 'Soil',
      children: crop.soil || '-',
    },
    {
      key: '7',
      label: 'Watering',
      children: crop.watering || '-',
    },
    {
      key: '8',
      label: 'Maintenance',
      children: crop.maintenance || '-',
    },
    {
      key: '9',
      label: 'Hardiness Zone',
      children: crop.hardinessZone !== undefined ? crop.hardinessZone : '-',
    },
    {
      key: '10',
      label: 'Indoor',
      children: crop.indoor ? 'true' : 'false',
    },
    {
      key: '11',
      label: 'Propagation',
      children: crop.propagation || '-',
    },
    {
      key: '12',
      label: 'Care Level',
      children: crop.careLevel || '-',
    },
    {
      key: '13',
      label: 'Growth Rate',
      children: crop.growthRate || '-',
    },
  ];
};

export const COMMODITIES_CATEGORY_SEGMENTED = [
  { label: 'All', value: '' },
  {
    label: 'Vegetable',
    value: CommodityCategory.Vegetable,
  },
  {
    label: 'Fruit',
    value: CommodityCategory.Fruit,
  },
  {
    label: 'Grain',
    value: CommodityCategory.Grain,
  },
  {
    label: 'Seed',
    value: CommodityCategory.Seed,
  },
];

export const COMMODITY_STATUS_FILTER: FilterOpstion[] = [
  {
    title: 'Active',
    key: CommodityStatus.Active,
  },
  {
    title: 'Coming Soon',
    key: CommodityStatus.ComingSoon,
  },
  {
    title: 'Discontinued',
    key: CommodityStatus.Discontinued,
  },
  {
    title: 'Limited',
    key: CommodityStatus.Limited,
  },
  {
    title: 'Out Of Stock',
    key: CommodityStatus.OutOfStock,
  },
  {
    title: 'Pre-Order',
    key: CommodityStatus.PreOrder,
  },
];

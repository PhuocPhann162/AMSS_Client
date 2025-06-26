import CropIcon from '@/components/Icon/icon-svg/crop-sidebar.svg?react';
import DashboardIcon from '@/components/Icon/icon-svg/dashboard-sidebar.svg?react';
import FarmIcon from '@/components/Icon/icon-svg/farm-sidebar.svg?react';
import FarmMapIcon from '@/components/Icon/icon-svg/farmmap_sidebar.svg?react';
import FieldIcon from '@/components/Icon/icon-svg/field-sidebase.svg?react';
import LandIcon from '@/components/Icon/icon-svg/land-sidebar.svg?react';
import OwnerFarmIcon from '@/components/Icon/icon-svg/owner-farm-sidebar.svg?react';
import CommoditySupplierIcon from '@/components/Icon/icon-svg/supplier-commodity-sidebar.svg?react';
import SupplierCropIcon from '@/components/Icon/icon-svg/supplier-crop-sidebar.svg?react';
import SupplierIcon from '@/components/Icon/icon-svg/supplier-sidebar.svg?react';
import UserIcon from '@/components/Icon/icon-svg/user-sidebar.svg?react';
import { type Item } from '@/components/layout/sidebar/sidebar';
import {
  BarChartOutlined,
  CloudUploadOutlined,
  ShopOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { FaChartLine } from 'react-icons/fa';

export const sidebarOptions: Item[] = [
  {
    label: 'Dashboard',
    isGroup: true,
    children: [
      {
        path: '/app/dashBoard',
        label: 'Dashboard',
        icon: <DashboardIcon />,
      },
      {
        path: '/app/reports',
        label: 'Reports',
        icon: <FaChartLine />,
      },
    ],
  },
  {
    label: 'Resources',
    isGroup: true,
    children: [
      {
        label: 'Plantings',
        icon: <CropIcon className='size-4' />,
        children: [
          {
            path: '/app/crop/myCrops',
            label: 'My Crops',
          },
          {
            path: '/app/crop/grow-location',
            label: 'Grow Locations',
          },
          {
            path: '/app/crop/identification',
            label: 'Identification',
          },
          {
            path: '/app/crop/care-logs',
            label: 'Care Logs',
          },
        ],
      },
      {
        label: 'Lands',
        icon: <LandIcon className='size-4' />,
        children: [
          {
            label: 'Farms',
            path: '/app/land/farm/allFarms',
            icon: <FarmIcon className='size-4' />,
          },
          {
            label: 'Fields',
            path: '/app/land/field/allFields',
            icon: <FieldIcon className='size-4' />,
          },
        ],
      },
      {
        label: 'Market',
        icon: <ShopOutlined className='size-4' />,
        children: [
          {
            path: '/store',
            label: 'Online Store',
          },
          {
            path: '/app/commodity/managment',
            label: 'Products',
          },
          {
            path: '/app/market/orders',
            label: 'Orders',
          },
          {
            path: '/app/market/coupons',
            label: 'Coupons',
          },
        ],
      },
    ],
  },
  {
    label: 'Socials',
    isGroup: true,
    children: [
      {
        label: 'Social Metrics',
        path: '/app/gpaSearch/home',
        icon: <BarChartOutlined className='size-4' />,
      },
      {
        label: 'Import Data',
        path: '/app/gpaSearch/importData',
        icon: <CloudUploadOutlined className='size-4' />,
      },
    ],
  },
  {
    label: 'Map',
    isGroup: true,
    children: [
      {
        path: '/app/map',
        label: 'Farm Map',
        icon: <FarmMapIcon className='size-4' />,
      },
    ],
  },

  {
    label: 'Accounts',
    isGroup: true,
    children: [
      {
        path: '/app/user/allUsers',
        label: 'Customer',
        icon: <UserIcon className='size-4' />,
      },
      {
        label: 'Suppliers',
        icon: <SupplierIcon className='size-4' />,
        children: [
          {
            label: 'Seed Crop',
            path: '/app/supplier/seedCrop',
            icon: <SupplierCropIcon className='size-4' />,
          },
          {
            label: 'Owner Farm',
            path: '/app/supplier/owner-farm',
            icon: <OwnerFarmIcon className='size-4' />,
          },
          {
            label: 'Commodities',
            path: '/app/supplier/commodity',
            icon: <CommoditySupplierIcon className='size-4' />,
          },
        ],
      },
      {
        path: '/app/user/register',
        icon: <SnippetsOutlined className='size-4' />,
        label: 'Registration Form',
      },
    ],
  },
];

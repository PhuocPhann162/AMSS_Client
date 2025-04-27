import {
  BarChartOutlined,
  ShoppingCartOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import DashboardIcon from '@/components/Icon/icon-svg/dashboard-sidebar.svg?react';
import CropIcon from '@/components/Icon/icon-svg/crop-sidebar.svg?react';
import FarmMapIcon from '@/components/Icon/icon-svg/farmmap_sidebar.svg?react';
import UserIcon from '@/components/Icon/icon-svg/user-sidebar.svg?react';
import FarmIcon from '@/components/Icon/icon-svg/farm-sidebar.svg?react';
import FieldIcon from '@/components/Icon/icon-svg/field-sidebase.svg?react';
import ImportDataIcon from '@/components/Icon/icon-svg/import-sidebar.svg?react';
import SupplierCropIcon from '@/components/Icon/icon-svg/supplier-crop-sidebar.svg?react';
import { type Item } from '@/components/Layout/SideBar/SideBar';

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
      // {
      //   name: 'Schedule',
      //   path: '/app/schedule',
      //   icon: <LaptopOutlined />,
      // },
      // {
      //   name: 'Tasks',
      //   path: '/app/task',
      //   icon: <LaptopOutlined />,
      // },
    ],
  },
  {
    label: 'Resources',
    isGroup: true,
    children: [
      {
        path: '/app/crop/myCrops',
        label: 'My Crops',
        icon: <CropIcon className='size-4' />,
      },
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
      {
        label: 'Social Metrics',
        path: '/app/gpaSearch/home',
        icon: <BarChartOutlined />,
      },
      {
        label: 'Import Data',
        path: '/app/gpaSearch/importData',
        icon: <ImportDataIcon className='size-4' />,
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
    label: 'Market',
    isGroup: true,
    children: [
      {
        label: 'Online Store',
        path: '/app/market/onlineStore',
        icon: <ShoppingCartOutlined />,
      },
    ],
  },
  {
    label: 'Suppliers',
    isGroup: true,
    children: [
      {
        label: 'Seed Crop',
        path: '/app/supplier/seedCrop',
        icon: <SupplierCropIcon className='size-4' />,
      },
    ],
  },
  {
    label: 'Account',
    isGroup: true,
    children: [
      {
        path: '/app/user/register',
        icon: <SnippetsOutlined />,
        label: 'Registration Form',
      },
      {
        path: '/app/user/allUsers',
        label: 'Customer',
        icon: <UserIcon className='size-4' />,
      },
    ],
  },
];

import { type ReactNode } from 'react';
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
import { type Route } from '@/route';

export const sidebarOptions: {
  groupLabel: string;
  routes: (Route & { icon: ReactNode })[];
}[] = [
  {
    groupLabel: 'Dashboard',
    routes: [
      {
        name: 'Dashboard',
        path: '/app/dashBoard',
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
    groupLabel: 'Resources',
    routes: [
      {
        name: 'My Crops',
        path: '/app/crop/myCrops',
        icon: <CropIcon />,
      },
      {
        name: 'Farms',
        path: 'land/farm/allFarms',
        icon: <FarmIcon />,
      },
      {
        name: 'Fields',
        path: 'land/field/allFields',
        icon: <FieldIcon />,
      },
      {
        name: 'Social Metrics',
        path: 'gpaSearch/home',
        icon: <BarChartOutlined />,
      },
      {
        name: 'Import Data',
        path: 'gpaSearch/importData',
        icon: <ImportDataIcon />,
      },
    ],
  },
  {
    groupLabel: 'Map',
    routes: [
      {
        name: 'Farm Map',
        path: '/app/map',
        icon: <FarmMapIcon />,
      },
    ],
  },
  {
    groupLabel: 'Market',
    routes: [
      {
        name: 'Online Store',
        path: 'market/onlineStore',
        icon: <ShoppingCartOutlined />,
        children: [],
      },
    ],
  },
  {
    groupLabel: 'Suppliers',
    routes: [
      {
        name: 'Seed Crop',
        path: 'supplier/seedCrop',
        icon: <SupplierCropIcon />,
        children: [],
      },
    ],
  },
  {
    groupLabel: 'Account',
    routes: [
      {
        name: 'Registration Form',
        path: '/app/user/register',
        icon: <SnippetsOutlined />,
      },
      {
        name: 'Customer',
        path: '/app/user/allUsers',
        icon: <UserIcon />,
      },
    ],
  },
];

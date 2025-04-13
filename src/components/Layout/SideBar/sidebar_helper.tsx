import { type Route } from '@/interfaces/route';
import { type ReactNode } from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import DashboardIcon from '@/components/Icon/icon-svg/dashboard-sidebar.svg?react';
import CropIcon from '@/components/Icon/icon-svg/crop-sidebar.svg?react';
import FarmMapIcon from '@/components/Icon/icon-svg/farmmap_sidebar.svg?react';
import UserIcon from '@/components/Icon/icon-svg/user-sidebar.svg?react';

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
        icon: <LaptopOutlined />,
      },
      {
        name: 'Fields',
        path: 'land/field/allFields',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Weather Search',
        path: '/app/weatherSearch',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Social Metrics',
        path: 'gpaSearch/home',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Import Data',
        path: 'gpaSearch/importData',
        icon: <LaptopOutlined />,
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
        icon: <LaptopOutlined />,
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
        icon: <LaptopOutlined />,
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
        icon: <LaptopOutlined />,
      },
      {
        name: 'Users',
        path: '/app/user/allUsers',
        icon: <UserIcon />,
      },
    ],
  },
];

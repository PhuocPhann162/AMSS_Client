import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { Logo } from '@/common';
import { GPAHomeIcon } from '@/components/Icon';
import {
  ClimateIcon,
  CropIcon,
  DashBoardIcon,
  LandIcon,
  ScheduleIcon,
  TaskIcon,
  ResourcesIcon,
  FarmMapIcon,
  UsersIcon,
  ExpandSidebarIcon,
  MarketIcon,
} from '@/components/Icon/SideBarIcon';
import { Route } from '@/interfaces/route';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';

const routes: Route[] = [
  {
    title: 'Dashboard',
    path: '/app/dashBoard',
    icon: <DashBoardIcon />,
  },
  {
    title: 'Schedule',
    path: '/app/schedule',
    icon: <ScheduleIcon />,
  },
  {
    title: 'Tasks',
    path: '/app/task',
    icon: <TaskIcon />,
  },
  {
    title: 'My Crops',
    path: '/app/crop/myCrops',
    icon: <ResourcesIcon />,
  },
  {
    title: 'Grow Locations',
    path: '/app/crop/growLocations',
    icon: <FarmMapIcon />,
  },
  {
    title: 'Crop',
    path: '/app/crop',
    icon: <UsersIcon />,
  },
  {
    title: 'Farms',
    path: 'land/farm/allFarms',
    icon: <MarketIcon />,
  },
  {
    title: 'Fields',
    path: 'land/field/allFields',
    icon: <CropIcon />,
  },
  {
    title: 'Weather Search',
    path: '/app/weatherSearch',
    icon: <ClimateIcon />,
  },
  {
    title: 'Weather Map',
    path: '/app/map/weather',
    icon: <LandIcon />,
  },
  {
    title: 'Social Metrics',
    path: 'gpaSearch/home',
    icon: <CropIcon />,
  },
  {
    title: 'Import Data',
    path: 'gpaSearch/importData',
    icon: <CropIcon />,
  },
  {
    title: 'Farm Map',
    path: '/app/map',
    icon: <CropIcon />,
  },
  {
    title: 'Online Store',
    path: 'market/onlineStore',
    icon: <CropIcon />,
  },
  {
    title: 'Registration Form',
    path: '/app/user/register',
    icon: <CropIcon />,
  },
  {
    title: 'Accounts',
    path: '/app/user/allUsers',
    icon: <CropIcon />,
  },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const AppSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton asChild>
                    <a href={route.path}>
                      {route.icon}
                      <span>{route.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;

import { type Route } from '@/interfaces/route';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';
import { NavLink } from 'react-router-dom';
import { Fragment, type ReactNode } from 'react';
import { LaptopOutlined } from '@ant-design/icons';

const labels: {
  groupLabel: string;
  routes: (Route & { icon: ReactNode })[];
}[] = [
  {
    groupLabel: 'Dashboard',
    routes: [
      {
        name: 'Dashboard',
        path: '/app/dashBoard',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Schedule',
        path: '/app/schedule',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Tasks',
        path: '/app/task',
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    groupLabel: 'Resources',
    routes: [
      {
        name: 'My Crops',
        path: '/app/crop/myCrops',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Grow Locations',
        path: '/app/crop/growLocations',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Crop',
        path: '/app/crop',
        icon: <LaptopOutlined />,
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
    ],
  },
  {
    groupLabel: 'Data',
    routes: [
      {
        name: 'Weather Search',
        path: '/app/weatherSearch',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Weather Map',
        path: '/app/map/weather',
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
      {
        name: 'Farm Map',
        path: '/app/map',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Online Store',
        path: 'market/onlineStore',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Registration Form',
        path: '/app/user/register',
        icon: <LaptopOutlined />,
      },
      {
        name: 'Accounts',
        path: '/app/user/allUsers',
        icon: <LaptopOutlined />,
      },
    ],
  },
];

export const AppSidebar = () => {
  return (
    <Sidebar className='[border:initial] md:pt-16'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {labels.map((label) => (
            <Fragment key={label.groupLabel}>
              <SidebarGroupLabel>{label.groupLabel}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {label.routes.map((route) => (
                    <SidebarMenuItem key={route.name}>
                      <SidebarMenuButton asChild>
                        <NavLink to={route.path}>
                          {route.icon}
                          <span>{route.name}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </Fragment>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

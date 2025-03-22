import { Route } from '@/interfaces/route';
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
import { Fragment } from 'react';
import { LaptopOutlined } from '@ant-design/icons';

const labels: {
  groupLabel: string;
  routes: Route[];
}[] = [
  {
    groupLabel: 'Dashboard',
    routes: [
      {
        title: 'Dashboard',
        path: '/app/dashBoard',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Schedule',
        path: '/app/schedule',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Tasks',
        path: '/app/task',
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    groupLabel: 'Resources',
    routes: [
      {
        title: 'My Crops',
        path: '/app/crop/myCrops',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Grow Locations',
        path: '/app/crop/growLocations',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Crop',
        path: '/app/crop',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Farms',
        path: 'land/farm/allFarms',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Fields',
        path: 'land/field/allFields',
        icon: <LaptopOutlined />,
      },
    ],
  },
  {
    groupLabel: 'Data',
    routes: [
      {
        title: 'Weather Search',
        path: '/app/weatherSearch',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Weather Map',
        path: '/app/map/weather',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Social Metrics',
        path: 'gpaSearch/home',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Import Data',
        path: 'gpaSearch/importData',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Farm Map',
        path: '/app/map',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Online Store',
        path: 'market/onlineStore',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Registration Form',
        path: '/app/user/register',
        icon: <LaptopOutlined />,
      },
      {
        title: 'Accounts',
        path: '/app/user/allUsers',
        icon: <LaptopOutlined />,
      },
    ],
  },
];

const AppSidebar = () => {
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
                    <SidebarMenuItem key={route.title}>
                      <SidebarMenuButton asChild>
                        <NavLink to={route.path}>
                          {route.icon}
                          <span>{route.title}</span>
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

export default AppSidebar;

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
import { NavLink } from 'react-router-dom';

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

const AppSidebar = () => {
  return (
    <Sidebar className='[border:initial] md:pt-16'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
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
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;

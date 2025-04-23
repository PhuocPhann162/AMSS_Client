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
import { sidebarOptions } from './sidebar_helper';

export const AppSidebar = () => {
  return (
    <Sidebar className='z-50 [border:initial] md:pt-16'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          {sidebarOptions.map((label) => (
            <Fragment key={label.groupLabel}>
              <SidebarGroupLabel>{label.groupLabel}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {label.routes.map((route) => (
                    <SidebarMenuItem key={route.name}>
                      <NavLink to={route.path}>
                        {({ isActive }) => (
                          <SidebarMenuButton isActive={isActive}>
                            {route.icon}
                            <span>{route.name}</span>
                          </SidebarMenuButton>
                        )}
                      </NavLink>
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

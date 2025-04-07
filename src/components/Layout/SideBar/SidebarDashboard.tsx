import { DropdownUser } from '@/components/Layout/Header';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { useIsMobile } from '@/hooks';
import { dashboardRoutes } from '@/routes';
import { Link } from 'react-router-dom';

export const SidebarDashboard = () => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className='[border:initial] md:pt-16'>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {dashboardRoutes.map((route) => (
              <SidebarMenuItem
                key={route.name}
                onClick={() => isMobile && setOpenMobile(false)}
              >
                <SidebarMenuButton asChild>
                  <Link to={route.path}>
                    <p>{route.name}</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter>
        <DropdownUser showName />
      </SidebarFooter>
    </Sidebar>
  );
};

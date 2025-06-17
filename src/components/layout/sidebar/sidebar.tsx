import { AMenu, type AMenuProps } from '@/common/ui-common';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/Sidebar';
import { useIsMobile } from '@/hooks';
import { type SubMenuType } from 'antd/es/menu/interface';
import { type FC, type ReactNode, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export interface Item {
  path?: string;
  label: string;
  icon?: ReactNode;
  isGroup?: boolean;
  children?: Item[];
}

export interface AppSidebarProps {
  header?: ReactNode;
  content?: {
    items?: Item[];
  };
  footer?: ReactNode;
  className?: string;
}

export const AppSidebar: FC<AppSidebarProps> = ({
  header,
  content,
  footer,
  className,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const sidebar = useSidebar();

  const contentItems = useMemo(() => {
    const contentItems = content?.items;

    if (!contentItems?.length) {
      return [];
    }

    const internalItems: AMenuProps['items'] = [];

    const renderItem = (option: Item) => {
      const item: (typeof internalItems)[number] = {
        key: option.path || Math.random(),
        label: option.label,
        icon: option.icon,
      };

      if (option.isGroup) {
        item.type = 'group' as never;
      }

      if (option.children) {
        (item as SubMenuType).children = option.children.map(renderItem);
      }

      return item;
    };

    contentItems.forEach((option) => {
      internalItems.push(renderItem(option));
    });

    return internalItems;
  }, [content?.items]);

  const handleClickNav: AMenuProps['onClick'] = (e) => {
    navigate(e.key);
    if (isMobile) {
      sidebar.setOpenMobile(false);
    }
  };

  return (
    <Sidebar className={twMerge('[border:initial]', className)}>
      {!!header && <SidebarHeader>{header}</SidebarHeader>}
      <SidebarContent>
        <AMenu
          mode='inline'
          selectedKeys={[location.pathname]}
          onClick={handleClickNav}
          items={contentItems}
          className='grow [&.ant-menu-root.ant-menu-inline]:[border-inline-end:initial]'
        />
      </SidebarContent>
      {!!footer && <SidebarFooter>{footer}</SidebarFooter>}
    </Sidebar>
  );
};

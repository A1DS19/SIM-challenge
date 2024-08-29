import { SidebarHeader } from './sidebar-header';
import { Plane } from 'lucide-react';
import { SidebarMenuData } from '~/data';
import { useLocation } from '@remix-run/react';
import { SidebarMenuItem } from './sidebar-menu-item';
import { MenuItemGroup } from './sidebar-menu-item-group';

type SidebarMenuProps = {
  toggleSidebar: () => void;
};

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ toggleSidebar }) => {
  const location = useLocation();
  return (
    <div className="fixed min-h-screen w-[300px] min-w-[300px] border-r bg-white p-4">
      <SidebarHeader />
      {SidebarMenuData.map((data) => (
        <MenuItemGroup title={data.title} key={data.title}>
          {data.items.map((item) => (
            <div onClick={toggleSidebar}>
              <SidebarMenuItem
                {...item}
                icon={<Plane />}
                isActive={item.url === location.pathname}
                key={item.url}
              />
            </div>
          ))}
        </MenuItemGroup>
      ))}
    </div>
  );
};

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "./badge";
import { LinkItem } from "./types";

interface Props {
  item: LinkItem;
  href: string;
  // pathname: string;
}

export function MenuLink({ href, item }: Props): React.JSX.Element {
  const { setOpenMobile } = useSidebar();
  // const to = pathname.concat(item?.url?.toString() ?? "/").replace(/\/$/, "");
  const to = String(item?.url?.toString() ?? "/").replace(/\/$/, "");

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        // className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
        asChild
        isActive={to === href}
        tooltip={item.title}
      >
        <NavLink to={to} onClick={() => setOpenMobile(false)}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
          {item.badge && <Badge>{item.badge}</Badge>}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import React from "react";
import { useLocation } from "react-router-dom";
import { MenuCollapsible } from "./collapsible";
import { MenuDropdown } from "./dropdown";
import { MenuLink } from "./link";
import { MenuGroupItem } from "./types";

export function Menu({ items, title }: MenuGroupItem): React.JSX.Element {
  const { state } = useSidebar();
  const href = useLocation().pathname;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return <MenuLink key={key} item={item} href={href} />;

          if (state === "collapsed")
            return <MenuDropdown key={key} item={item} href={href} />;

          return <MenuCollapsible key={key} item={item} href={href} />;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

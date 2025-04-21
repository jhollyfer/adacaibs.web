import {
  CollapsibleContent,
  CollapsibleTrigger,
  Collapsible as Root,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "./badge";
import { CollapsibleItem } from "./types";

interface Props {
  item: CollapsibleItem;
  href: string;
  // pathname: string;
}
export function MenuCollapsible({ item, href }: Props): React.JSX.Element {
  const { setOpenMobile } = useSidebar();
  // const to = pathname.concat(item?.url?.toString() ?? "/").replace(/\/$/, "");
  const to = String(item?.url?.toString() ?? "/").replace(/\/$/, "");

  // const defaultOpen = item.items.some(
  //   (i) => pathname.concat(i.url?.toString() ?? "/") === href
  // );

  const defaultOpen = item.items.some(
    (i) => String(i.url?.toString() ?? "/") === href
  );

  return (
    <Root asChild defaultOpen={defaultOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <Badge>{item.badge}</Badge>}
            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="CollapsibleContent">
          <SidebarMenuSub>
            {item.items.map((subItem) => {
              const subTo = to
                .concat(subItem?.url?.toString() ?? "/")
                .replace(/\/$/, "");

              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    // className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
                    asChild
                    isActive={subTo === href}
                  >
                    <NavLink to={subTo} onClick={() => setOpenMobile(false)}>
                      {subItem.icon && <subItem.icon />}
                      <span>{subItem.title}</span>
                      {subItem.badge && <Badge>{subItem.badge}</Badge>}
                    </NavLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Root>
  );
}

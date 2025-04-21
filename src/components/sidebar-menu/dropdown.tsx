import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenuButton,
  SidebarMenuItem,
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
export function MenuDropdown({ item, href }: Props): React.JSX.Element {
  const { setOpenMobile } = useSidebar();
  // const to = pathname.concat(item?.url?.toString() ?? "/").replace(/\/$/, "");
  const to = String(item?.url?.toString() ?? "/").replace(/\/$/, "");

  // const isActive = item.items.some(
  //   (i) => pathname.concat(i.url?.toString() ?? "/") === href
  // );
  const isActive = item.items.some(
    (i) => String(i.url?.toString() ?? "/") === href
  );

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton
            // className="data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
            tooltip={item.title}
            isActive={isActive}
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            {item.badge && <Badge>{item.badge}</Badge>}
            <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start" sideOffset={4}>
          <DropdownMenuLabel>
            {item.title} {item.badge ? `(${item.badge})` : ""}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {item.items.map((sub) => {
            const subTo = to
              .concat(sub?.url?.toString() ?? "/")
              .replace(/\/$/, "");

            return (
              <DropdownMenuItem key={`${sub.title}-${sub.url}`} asChild>
                <NavLink
                  className="[&.active]:bg-primary [&.active]:text-primary-foreground"
                  to={subTo}
                  onClick={() => setOpenMobile(false)}
                >
                  {sub.icon && <sub.icon />}
                  <span>{sub.title}</span>
                  {sub.badge && <Badge>{sub.badge}</Badge>}
                </NavLink>
                {/* </SidebarMenuButton> */}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}

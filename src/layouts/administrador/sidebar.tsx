// import { LogoSmall } from "@/components/logo-small";
import {
  Sidebar as Root,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Menu } from "@/components/sidebar-menu";
import { useAuthentication } from "@/hooks/autenticacao";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { MenuRouteMap } from "./menu";

export function Sidebar(): React.JSX.Element {
  const { state } = useSidebar();
  const authentication = useAuthentication();

  const menu = MenuRouteMap;

  return (
    <Root collapsible="icon" variant="inset" className="border-r">
      <SidebarHeader
        className={cn("flex flex-col w-full justify-center items-center py-5")}
      >
        <Link to={"/dashboard"} replace className="inline-flex gap-1">
          {/* <LogoSmall /> */}
          <span>
            {!(state === "collapsed") && "ADACAIBS"}
            {state === "collapsed" && "AD"}
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {menu?.map((props) => (
          <Menu key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className="p-0">
        <SidebarGroup>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    variant={"outline"}
                    onClick={() => authentication.signOut()}
                    className="w-full justify-center h-10 gap-3 rounded-lg"
                  >
                    <LogOutIcon />
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        state === "collapsed" && "sr-only"
                      )}
                    >
                      Sair
                    </p>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </TooltipTrigger>
            {state === "collapsed" && (
              <TooltipContent side="right">Sair</TooltipContent>
            )}
          </Tooltip>
        </SidebarGroup>
      </SidebarFooter>
    </Root>
  );
}

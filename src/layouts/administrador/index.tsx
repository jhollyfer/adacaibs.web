import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Administrator(): React.ReactElement {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset className="relative flex flex-col h-screen w-full overflow-hidden">
          <Header />
          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}

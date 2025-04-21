import { Layout } from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { RouteObject } from "react-router-dom";

const DashboardPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/dashboard");
  return {
    default: module.Dashboard,
  };
});

const NoticePage = React.lazy(async () => {
  const module = await import("@/pages/administrador/noticias");
  return {
    default: module.Notice,
  };
});

export const route: RouteObject = {
  path: "/administrador",
  // index: true,
  element: (
    <SidebarProvider>
      <Layout.Administrator />
    </SidebarProvider>
  ),
  children: [
    {
      // path: "/",
      index: true,
      element: <DashboardPage />,
    },
    {
      path: "noticias",
      element: <NoticePage />,
    },
  ],
};

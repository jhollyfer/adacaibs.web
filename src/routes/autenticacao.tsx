import React from "react";
import { Outlet, RouteObject } from "react-router-dom";

const SignInPage = React.lazy(async () => {
  const module = await import("@/pages/autenticacao/sign-in");
  return {
    default: module.SignIn,
  };
});

export const route: RouteObject = {
  path: "/autenticacao",
  // index: true,
  element: (
    <div>
      <Outlet />
    </div>
    // <SidebarProvider>
    //   <Layout.Administrator />
    // </SidebarProvider>
  ),
  children: [
    {
      // path: "/",
      index: true,
      element: <SignInPage />,
    },
  ],
};

import { AUTHENTICATION_ID } from "@/context/autenticacao";
import React from "react";
import { Outlet, redirect, RouteObject } from "react-router-dom";

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
    <div className="w-full h-screen flex justify-center items-center overflow-y-hidden">
      <Outlet />
    </div>
  ),
  loader: () => {
    const token = sessionStorage.getItem(AUTHENTICATION_ID);
    if (token || token !== null) {
      return redirect("/administrador");
    }
    return null; // precisa retornar algo quando a autenticação for válida
  },
  children: [
    {
      // path: "/",
      index: true,
      element: <SignInPage />,
    },
  ],
};

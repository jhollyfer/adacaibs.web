// import { useAuthentication } from "@/hooks/use-authentication";
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export function Administrator(): React.ReactElement {
  // const { isAuthenticated } = useAuthentication();

  // if (!isAuthenticated)
  //   return <Navigate to="/authentication/sign-in" replace />;

  return (
    <React.Fragment>
      <Sidebar />
      <main className="flex-1 h-screen overflow-hidden">
        <Header />
        <section className="flex-1 h-full p-8 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </React.Fragment>
  );
}

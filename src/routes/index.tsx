import { createBrowserRouter, RouteObject } from "react-router-dom";
import { route as administradorRoute } from "./administrador";
import { route as authenticationRoute } from "./autenticacao";
import { route as landingPageRoute } from "./landing-page";

const routes: RouteObject[] = [
  landingPageRoute,
  authenticationRoute,
  administradorRoute,
];

export const Router = createBrowserRouter(routes);

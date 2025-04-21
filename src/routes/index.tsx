import { createBrowserRouter, RouteObject } from "react-router-dom";
import { route as administrador } from "./administrador";
import { route as landingPage } from "./landing-page";

const routes: RouteObject[] = [landingPage, administrador];

export const Router = createBrowserRouter(routes);

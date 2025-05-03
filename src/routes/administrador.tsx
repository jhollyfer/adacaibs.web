import { SidebarProvider } from "@/components/ui/sidebar";
import { AUTHENTICATION_ID } from "@/context/autenticacao";
import { Layout } from "@/layouts";
import React from "react";
import { redirect, RouteObject } from "react-router-dom";

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

const PodcastPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/podcast");
  return {
    default: module.Podcast,
  };
});

const VideoPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/videos");
  return {
    default: module.Video,
  };
});

const GalleryPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/albuns");
  return {
    default: module.Gallery,
  };
});

const EventPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/eventos");
  return {
    default: module.Events,
  };
});

const TestimonialPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/depoimentos");
  return {
    default: module.Testimonials,
  };
});

const UserPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/usuarios");
  return {
    default: module.Users,
  };
});

export const route: RouteObject = {
  path: "/administrador",
  loader: () => {
    const token = sessionStorage.getItem(AUTHENTICATION_ID);
    console.log(token);
    if (!token || token === null) {
      return redirect("/autenticacao");
    }
    return null; // precisa retornar algo quando a autenticação for válida
  },
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
    {
      path: "podcasts",
      element: <PodcastPage />,
    },
    {
      path: "videos",
      element: <VideoPage />,
    },
    {
      path: "galeria",
      element: <GalleryPage />,
    },
    {
      path: "eventos",
      element: <EventPage />,
    },
    {
      path: "depoimentos",
      element: <TestimonialPage />,
    },
    {
      path: "usuarios",
      element: <UserPage />,
    },
  ],
};

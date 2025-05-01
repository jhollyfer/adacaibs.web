import { SidebarProvider } from "@/components/ui/sidebar";
import { Layout } from "@/layouts";
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

const PodcastPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/podcast");
  return {
    default: module.Podcast,
  };
});

const VideoPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/video");
  return {
    default: module.Video,
  };
});

const GalleryPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/galeria");
  return {
    default: module.Gallery,
  };
});

const EventPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/events");
  return {
    default: module.Events,
  };
});

const TestimonialPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/testimonial");
  return {
    default: module.Testimonials,
  };
});

const UserPage = React.lazy(async () => {
  const module = await import("@/pages/administrador/user");
  return {
    default: module.Users,
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
    }
  ],
};

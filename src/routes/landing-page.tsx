import { Layout } from "@/components/layout";
import React from "react";
import { RouteObject } from "react-router-dom";

const HomePage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/home");
  return {
    default: module.Home,
  };
});

const AboutPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/about");
  return {
    default: module.About,
  };
});

const NoticePage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/notice");
  return {
    default: module.Notice,
  };
});

const NoticeDetailPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/notice-detail");
  return {
    default: module.NoticeDetail,
  };
});

const PodcastPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/podcast");
  return {
    default: module.Podcast,
  };
});

const PodcastDetailPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/podcast-detail");
  return {
    default: module.PodcastDetail,
  };
});

const VideoPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/video");
  return {
    default: module.Video,
  };
});

const VideoDetailPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/video-detail");
  return {
    default: module.VideoDetail,
  };
});

const GalleryPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/gallery");
  return {
    default: module.Gallery,
  };
});

const ContactPage = React.lazy(async () => {
  const module = await import("@/pages/landing-page/contact");
  return {
    default: module.Contact,
  };
});

export const route: RouteObject = {
  path: "/",
  // index: true,
  element: <Layout.LandingPage />,
  children: [
    {
      // path: "/",
      index: true,
      element: <HomePage />,
    },
    {
      path: "sobre",
      element: <AboutPage />,
    },
    {
      path: "noticias",
      element: <NoticePage />,
    },
    {
      path: "noticias/:id",
      element: <NoticeDetailPage />,
    },
    {
      path: "podcasts",
      element: <PodcastPage />,
    },
    {
      path: "podcasts/:id",
      element: <PodcastDetailPage />,
    },
    {
      path: "videos",
      element: <VideoPage />,
    },
    {
      path: "videos/:id",
      element: <VideoDetailPage />,
    },
    {
      path: "galeria",
      element: <GalleryPage />,
    },
    {
      path: "contato",
      element: <ContactPage />,
    },
  ],
};

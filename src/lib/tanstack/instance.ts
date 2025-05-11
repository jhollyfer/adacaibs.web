import { QueryClient } from "@tanstack/react-query";

export const TanstackQuery = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,

      // staleTime: 5000 * 60 // 1 minute
    },
  },
});

export enum QUERY {
  USER_PAGINATE = "USER_PAGINATE",
  USER_SHOW = "USER_SHOW",
  NOTICE_PAGINATE = "NOTICE_PAGINATE",
  NOTICE_SHOW = "NOTICE_SHOW",
  PODCAST_PAGINATE = "PODCAST_PAGINATE",
  PODCAST_SHOW = "PODCAST_SHOW",
  VIDEO_PAGINATE = "VIDEO_PAGINATE",
  VIDEO_SHOW = "VIDEO_SHOW",
  ALBUM_PAGINATE = "ALBUM_PAGINATE",
  ALBUM_SHOW = "ALBUM_SHOW",
  EVENT_PAGINATE = "EVENT_PAGINATE",
  EVENT_SHOW = "EVENT_SHOW",
  TESTIMONIAL_PAGINATE = "TESTIMONIAL_PAGINATE",
  TESTIMONIAL_SHOW = "TESTIMONIAL_SHOW",
}

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
}

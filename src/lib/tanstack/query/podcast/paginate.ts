import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { PaginateMetaQuery, PaginateMetaResponse, Podcast } from "@/lib/model";
import { QUERY } from "../../instance";

export function usePodcastPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Podcast[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.PODCAST_PAGINATE, query],
    queryFn: async () => await API_SERVICE["PODCAST"]["paginate"](query),
  });
}

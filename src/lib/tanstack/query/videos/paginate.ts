import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { PaginateMetaQuery, PaginateMetaResponse, Video } from "@/lib/model";
import { QUERY } from "../../instance";

export function useVideoPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Video[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.VIDEO_PAGINATE, query],
    queryFn: async () => await API_SERVICE["VIDEO"]["paginate"](query),
  });
}

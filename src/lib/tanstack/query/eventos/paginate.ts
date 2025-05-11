import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { PaginateMetaQuery, PaginateMetaResponse, Events } from "@/lib/model";
import { QUERY } from "../../instance";

export function useEventsPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Events[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.EVENT_PAGINATE, query],
    queryFn: async () => await API_SERVICE["EVENT"]["paginate"](query),
  });
}

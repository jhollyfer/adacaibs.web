import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Notice, PaginateMetaQuery, PaginateMetaResponse } from "@/lib/model";
import { QUERY } from "../../instance";

export function useNoticePaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Notice[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.NOTICE_PAGINATE, query],
    queryFn: async () => await API_SERVICE["NOTICE"]["paginate"](query),
  });
}

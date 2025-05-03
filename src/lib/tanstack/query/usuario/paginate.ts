import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { QUERY } from "@/lib/constant";
import { PaginateMetaQuery, PaginateMetaResponse, User } from "@/lib/model";

export function useUserPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<User[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.USER_PAGINATE, query],
    queryFn: async () => await API_SERVICE["USER"]["paginate"](query),
  });
}

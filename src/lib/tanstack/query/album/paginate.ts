import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { PaginateMetaQuery, PaginateMetaResponse, Album } from "@/lib/model";
import { QUERY } from "../../instance";

export function useAlbumPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Album[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.ALBUM_PAGINATE, query],
    queryFn: async () => await API_SERVICE["ALBUM"]["paginate"](query),
  });
}

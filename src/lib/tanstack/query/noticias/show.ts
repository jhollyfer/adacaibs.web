import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Notice } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function useNoticeShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Notice, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.NOTICE_SHOW, id],
    queryFn: async () => await API_SERVICE["NOTICE"]["show"](id),
    enabled: !!id && enabled,
  });
}

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Events } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function useEventShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Events, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.EVENT_SHOW, id],
    queryFn: async () => await API_SERVICE["EVENT"]["show"](id),
    enabled: !!id && enabled,
  });
}

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { QUERY } from "@/lib/constant";
import { User } from "@/lib/model";

interface Props {
  id: string;
  enabled: boolean;
}

export function useUserShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<User, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.USER_SHOW, id],
    queryFn: async () => await API_SERVICE["USER"]["show"](id),
    enabled: !!id && enabled,
  });
}

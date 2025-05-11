import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Video } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function useVideoShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Video, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.VIDEO_SHOW, id],
    queryFn: async () => await API_SERVICE["VIDEO"]["show"](id),
    enabled: !!id && enabled,
  });
}

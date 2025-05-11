import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Podcast } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function usePodcastShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Podcast, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.PODCAST_SHOW, id],
    queryFn: async () => await API_SERVICE["PODCAST"]["show"](id),
    enabled: !!id && enabled,
  });
}

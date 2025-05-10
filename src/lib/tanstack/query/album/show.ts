import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Album } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function useAlbumShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Album, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.ALBUM_SHOW, id],
    queryFn: async () => await API_SERVICE["ALBUM"]["show"](id),
    enabled: !!id && enabled,
  });
}

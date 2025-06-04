import { API_SERVICE } from "@/lib/api";
import { Album } from "@/lib/model";
import { AlbumUpdatePayload } from "@/schemas/albums";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Album) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useAlbumUpdateMutation(
  props: Props
): UseMutationResult<Album, Error | AxiosError, AlbumUpdatePayload> {
  return useMutation({
    mutationFn: async function (payload: AlbumUpdatePayload) {
      return await API_SERVICE.ALBUM["update"](payload);
    },
    ...props,
  });
}

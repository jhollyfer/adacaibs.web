import { API_SERVICE } from "@/lib/api";
import { Album } from "@/lib/model";
import { AlbumCreatePayload } from "@/schemas/albums";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Album) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useAlbumCreateMutation(
  props: Props
): UseMutationResult<Album, Error | AxiosError, AlbumCreatePayload> {
  return useMutation({
    mutationFn: async function create(payload: AlbumCreatePayload) {
      return await API_SERVICE.ALBUM["create"](payload);
    },
    ...props,
  });
}

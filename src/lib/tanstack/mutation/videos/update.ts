import { API_SERVICE } from "@/lib/api";
import { Video } from "@/lib/model";
import { VideoUpdatePayload } from "@/schemas/videos";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Video) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useVideoUpdateMutation(
  props: Props
): UseMutationResult<Video, Error | AxiosError, VideoUpdatePayload> {
  return useMutation({
    mutationFn: async function create(payload: VideoUpdatePayload) {
      return await API_SERVICE.VIDEO["update"](payload);
    },
    ...props,
  });
}

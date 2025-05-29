import { API_SERVICE } from "@/lib/api";
import { Video } from "@/lib/model";
import { VideoCreatePayload } from "@/schemas/videos";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Video) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useVideoCreateMutation(
  props: Props
): UseMutationResult<Video, Error | AxiosError, VideoCreatePayload> {
  return useMutation({
    mutationFn: async function create(payload: VideoCreatePayload) {
      return await API_SERVICE.VIDEO["create"](payload);
    },
    ...props,
  });
}

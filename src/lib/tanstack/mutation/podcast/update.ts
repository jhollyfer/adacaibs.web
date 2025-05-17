import { API_SERVICE } from "@/lib/api";
import { Podcast } from "@/lib/model";
import { PodcastUpdatePayload } from "@/schemas/podcast";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Podcast) => void;
  onError: (error: Error | AxiosError) => void;
}

export function usePodcastUpdateMutation(
  props: Props
): UseMutationResult<
  Podcast,
  Error | AxiosError,
  PodcastUpdatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: PodcastUpdatePayload) {
      return await API_SERVICE.PODCAST["update"](payload);
    },
    ...props,
  });
}

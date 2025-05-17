import { API_SERVICE } from "@/lib/api";
import { Podcast } from "@/lib/model";
import { PodcastCreatePayload } from "@/schemas/podcast";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Podcast) => void;
  onError: (error: Error | AxiosError) => void;
}

export function usePodcastCreateMutation(
  props: Props
): UseMutationResult<
  Podcast,
  Error | AxiosError,
  PodcastCreatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: PodcastCreatePayload) {
      return await API_SERVICE.PODCAST["create"](payload);
    },
    ...props,
  });
}

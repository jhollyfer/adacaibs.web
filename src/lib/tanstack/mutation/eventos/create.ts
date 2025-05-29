import { API_SERVICE } from "@/lib/api";
import { Events } from "@/lib/model";
import { EventCreatePayload } from "@/schemas/eventos";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Events) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useEventCreateMutation(
  props: Props
): UseMutationResult<Events, Error | AxiosError, EventCreatePayload> {
  return useMutation({
    mutationFn: async function create(payload: EventCreatePayload) {
      return await API_SERVICE.EVENT["create"](payload);
    },
    ...props,
  });
}

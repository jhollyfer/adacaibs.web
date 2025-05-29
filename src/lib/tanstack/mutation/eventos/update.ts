import { API_SERVICE } from "@/lib/api";
import { Events } from "@/lib/model";
import { EventUpdatePayload } from "@/schemas/eventos";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Events) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useEventUpdateMutation(
  props: Props
): UseMutationResult<Events, Error | AxiosError, EventUpdatePayload> {
  return useMutation({
    mutationFn: async function create(payload: EventUpdatePayload) {
      return await API_SERVICE.EVENT["update"](payload);
    },
    ...props,
  });
}

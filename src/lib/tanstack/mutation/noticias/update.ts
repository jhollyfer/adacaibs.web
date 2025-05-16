import { API_SERVICE } from "@/lib/api";
import { Notice } from "@/lib/model";
import { NoticeUpdatePayload } from "@/schemas/noticias";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Notice) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useNoticeUpdateMutation(
  props: Props
): UseMutationResult<
  Notice,
  Error | AxiosError,
  NoticeUpdatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: NoticeUpdatePayload) {
      return await API_SERVICE.NOTICE["update"](payload);
    },
    ...props,
  });
}

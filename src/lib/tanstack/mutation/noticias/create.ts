import { API_SERVICE } from "@/lib/api";
import { Notice } from "@/lib/model";
import { NoticeCreatePayload } from "@/schemas/noticias";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Notice) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useNoticeCreateMutation(
  props: Props
): UseMutationResult<
  Notice,
  Error | AxiosError,
  NoticeCreatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: NoticeCreatePayload) {
      return await API_SERVICE.NOTICE["create"](payload);
    },
    ...props,
  });
}

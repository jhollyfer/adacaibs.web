import { API_SERVICE } from "@/lib/api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUserRemoveMutation(
  props: Props
): UseMutationResult<void, Error | AxiosError, string> {
  return useMutation({
    mutationFn: async function (id: string) {
      return await API_SERVICE.USER["delete"](id);
    },
    ...props,
  });
}

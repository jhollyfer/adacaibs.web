import { API_SERVICE } from "@/lib/api";
import { Storage } from "@/lib/model";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Storage[]) => void;
  onError: (error: Error | AxiosError) => void;
  mutationKey: string[];
}

export function useUploadMutation(
  props: Props
): UseMutationResult<Storage[], Error | AxiosError, FormData> {
  return useMutation({
    mutationFn: async function upload(payload: FormData) {
      return await API_SERVICE.STORAGE["upload"](payload);
    },
    ...props,
  });
}

import { API_SERVICE } from "@/lib/api";
import { UploadResponse } from "@/schemas/storage";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: UploadResponse) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUploadMutation(
  props: Props
): UseMutationResult<UploadResponse, Error | AxiosError, FormData> {
  return useMutation({
    mutationFn: async function upload(payload: FormData) {
      return await API_SERVICE.STORAGE["upload"](payload);
    },
    ...props,
  });
}

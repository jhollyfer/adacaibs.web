import { API_SERVICE } from "@/lib/api";
import { SignInPayload, SingInResponse } from "@/schemas/autenticacao";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: SingInResponse) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useSignInMutation(
  props: Props
): UseMutationResult<SingInResponse, Error | AxiosError, SignInPayload> {
  return useMutation({
    mutationFn: async function signIn(payload: SignInPayload) {
      return await API_SERVICE.AUTHENTICATION["signIn"](payload);
    },
    ...props,
  });
}

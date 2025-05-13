import { API_SERVICE } from "@/lib/api";
import { AXIOS_INSTANCE } from "@/lib/api/axios-instance";
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
      const data = await API_SERVICE.AUTHENTICATION["signIn"](payload);
      AXIOS_INSTANCE.defaults.headers["Authorization"] = `Bearer ${data.token}`;
      return data;
    },
    ...props,
  });
}

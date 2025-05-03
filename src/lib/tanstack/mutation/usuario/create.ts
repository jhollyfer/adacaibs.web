import { API_SERVICE } from "@/lib/api";
import { User } from "@/lib/model";
import { UserCreatePayload } from "@/schemas/usuario";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: User) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUserCreateMutation(
  props: Props
): UseMutationResult<User, Error | AxiosError, UserCreatePayload> {
  return useMutation({
    mutationFn: async function create(payload: UserCreatePayload) {
      return await API_SERVICE.USER["create"](payload);
    },
    ...props,
  });
}

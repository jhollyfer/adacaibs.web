import { API_SERVICE } from "@/lib/api";
import { User } from "@/lib/model";
import { UserUpdatePayload } from "@/schemas/usuario";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: User) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUserUpdateMutation(
  props: Props
): UseMutationResult<User, Error | AxiosError, UserUpdatePayload> {
  return useMutation({
    mutationFn: async function create(payload: UserUpdatePayload) {
      return await API_SERVICE.USER["update"](payload);
    },
    ...props,
  });
}

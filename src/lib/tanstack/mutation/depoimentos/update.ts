import { API_SERVICE } from "@/lib/api";
import { Testimonial } from "@/lib/model";
import { TestimonialUpdatePayload } from "@/schemas/depoimento";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Testimonial) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useTestimonialUpdateMutation(
  props: Props
): UseMutationResult<
  Testimonial,
  Error | AxiosError,
  TestimonialUpdatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: TestimonialUpdatePayload) {
      return await API_SERVICE.TESTIMONIAL["update"](payload);
    },
    ...props,
  });
}

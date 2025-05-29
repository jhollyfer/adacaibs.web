import { API_SERVICE } from "@/lib/api";
import { Testimonial } from "@/lib/model";
import { TestimonialCreatePayload } from "@/schemas/depoimentos";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Props {
  onSuccess: (response: Testimonial) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useTestimonialCreateMutation(
  props: Props
): UseMutationResult<
  Testimonial,
  Error | AxiosError,
  TestimonialCreatePayload
> {
  return useMutation({
    mutationFn: async function create(payload: TestimonialCreatePayload) {
      return await API_SERVICE.TESTIMONIAL["create"](payload);
    },
    ...props,
  });
}

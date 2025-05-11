import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { Testimonial } from "@/lib/model";
import { QUERY } from "../../instance";

interface Props {
  id: string;
  enabled: boolean;
}

export function useTestimonialShowQuery({
  id,
  enabled,
}: Props): UseQueryResult<Testimonial, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.TESTIMONIAL_SHOW, id],
    queryFn: async () => await API_SERVICE["TESTIMONIAL"]["show"](id),
    enabled: !!id && enabled,
  });
}

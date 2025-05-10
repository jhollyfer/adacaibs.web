import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { PaginateMetaQuery, PaginateMetaResponse, Testimonial } from "@/lib/model";
import { QUERY } from "../../instance";

export function useTestimonialPaginateQuery(
  query: PaginateMetaQuery
): UseQueryResult<PaginateMetaResponse<Testimonial[]>, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.TESTIMONIAL_PAGINATE, query],
    queryFn: async () => await API_SERVICE["TESTIMONIAL"]["paginate"](query),
  });
}

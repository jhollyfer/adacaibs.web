import {
  PaginateMetaResponse,
  PaginateQuerySearch,
  Testimonial,
} from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedTestimonial(payload: Testimonial): void {
  TanstackQuery.setQueryData<Testimonial>(
    [QUERY.TESTIMONIAL_SHOW, payload.id],
    (old) => {
      if (!old) return payload;
      return {
        ...old,
        ...payload,
      };
    }
  );
}

export function addedTestimonialToPagination(
  payload: Testimonial,
  query: PaginateQuerySearch
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
    [QUERY.TESTIMONIAL_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: {
            total: 1,
            per_page: 10,
            page: 1,
            last_page: 1,
            first_page: 1,
          },
          data: [payload],
        };
      }

      const data = [payload, ...old.data];

      return {
        meta: {
          ...old.meta,
          total: data.length,
        },
        data,
      };
    }
  );
}

export function updatedTestimonialToPagination(
  payload: Testimonial,
  query: PaginateQuerySearch
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
    [QUERY.TESTIMONIAL_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: {
            total: 1,
            per_page: 10,
            page: 1,
            last_page: 1,
            first_page: 1,
          },
          data: [payload],
        };
      }

      const data = old.data.map((row) => {
        if (row.id?.toString() === payload.id?.toString()) {
          updatedTestimonial(payload);
          return payload;
        }
        return row;
      });

      return {
        meta: old?.meta,
        data,
      };
    }
  );
}

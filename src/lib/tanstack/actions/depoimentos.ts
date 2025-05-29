import { MetaBase } from "@/lib/constant";
import {
  PaginateMetaQuery,
  PaginateMetaResponse,
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
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
    [QUERY.TESTIMONIAL_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
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
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
    [QUERY.TESTIMONIAL_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
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

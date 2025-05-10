import { PaginateMetaResponse, Testimonial } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export const ACTION = {
  PAGINATE: {
    ADDED(payload: Testimonial) {
      TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
        [
          QUERY.TESTIMONIAL_PAGINATE,
          {
            page: "1",
            per_page: "10",
          },
        ],
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

          return {
            meta: old.meta,
            data: [payload, ...old.data],
          };
        }
      );
    },
    UPDATE(payload: Testimonial) {
      TanstackQuery.setQueryData<PaginateMetaResponse<Testimonial[]>>(
        [
          QUERY.TESTIMONIAL_PAGINATE,
          {
            page: "1",
            per_page: "10",
          },
        ],
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

          return {
            meta: old?.meta,
            data: old?.data.map((testimonial) => {
              if (testimonial.id?.toString() === payload.id?.toString()) {
                return { ...payload };
              }

              return testimonial;
            }),
          };
        }
      );
    },
  },
  SHOW: {
    UPDATE(payload: Testimonial) {
      TanstackQuery.setQueryData<Testimonial>(
        [QUERY.TESTIMONIAL_SHOW, payload.id], 
        payload
      );
    },
  },
} as const;
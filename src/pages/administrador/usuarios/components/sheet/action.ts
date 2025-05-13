import { PaginateMetaResponse, PaginateQuerySearch, User } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export const ACTION = {
  PAGINATE: {
    ADDED(payload: User, query: PaginateQuerySearch) {
      TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
        [QUERY.USER_PAGINATE, query],
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
    },
    UPDATE(payload: User, query: PaginateQuerySearch) {
      TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
        [QUERY.USER_PAGINATE, query],
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
            if (row.id?.toString() === payload.id?.toString()) return payload;
            return row;
          });

          return {
            meta: old?.meta,
            data,
          };
        }
      );
    },
  },

  SHOW: {
    UPDATE(payload: User) {
      TanstackQuery.setQueryData<User>([QUERY.USER_SHOW, payload.id], (old) => {
        if (!old) return payload;
        return {
          ...old,
          ...payload,
        };
      });
    },
  },
} as const;

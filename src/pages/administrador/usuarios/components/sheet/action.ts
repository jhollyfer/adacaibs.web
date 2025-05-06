import { PaginateMetaResponse, User } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export const ACTION = {
  PAGINATE: {
    ADDED(payload: User) {
      TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
        [
          QUERY.USER_PAGINATE,
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
    UPDATE(payload: User) {
      TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
        [
          QUERY.USER_PAGINATE,
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
            data: old?.data.map((user) => {
              if (user.id?.toString() === payload.id?.toString()) {
                return { ...payload };
              }

              return user;
            }),
          };
        }
      );
    },
  },
  SHOW: {
    UPDATE(payload: User) {
      TanstackQuery.setQueryData<User>([QUERY.USER_SHOW, payload.id], payload);
    },
  },
} as const;

import { MetaBase } from "@/lib/constant";
import { PaginateMetaQuery, PaginateMetaResponse, User } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedUser(payload: User): void {
  TanstackQuery.setQueryData<User>([QUERY.USER_SHOW, payload.id], (old) => {
    if (!old) return payload;
    return {
      ...old,
      ...payload,
    };
  });
}

export function addedUserToPagination(
  payload: User,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
    [QUERY.USER_PAGINATE, query],
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

export function updatedUserToPagination(
  payload: User,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<User[]>>(
    [QUERY.USER_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
          data: [payload],
        };
      }

      const data = old.data.map((row) => {
        if (row.id?.toString() === payload.id?.toString()) {
          updatedUser(payload);
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

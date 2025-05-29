import { MetaBase } from "@/lib/constant";
import { Events, PaginateMetaQuery, PaginateMetaResponse } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedEvent(payload: Events): void {
  TanstackQuery.setQueryData<Events>([QUERY.EVENT_SHOW, payload.id], (old) => {
    if (!old) return payload;
    return {
      ...old,
      ...payload,
    };
  });
}

export function addedEventToPagination(
  payload: Events,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Events[]>>(
    [QUERY.EVENT_PAGINATE, query],
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

export function updatedEventToPagination(
  payload: Events,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Events[]>>(
    [QUERY.EVENT_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
          data: [payload],
        };
      }

      const data = old.data.map((row) => {
        if (row.id?.toString() === payload.id?.toString()) {
          updatedEvent(payload);
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

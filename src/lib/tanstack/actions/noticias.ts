import { MetaBase } from "@/lib/constant";
import { Notice, PaginateMetaQuery, PaginateMetaResponse } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedNotice(payload: Notice): void {
  TanstackQuery.setQueryData<Notice>([QUERY.NOTICE_SHOW, payload.id], (old) => {
    if (!old) return payload;
    return {
      ...old,
      ...payload,
    };
  });
}

export function addedNoticeToPagination(
  payload: Notice,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Notice[]>>(
    [QUERY.NOTICE_PAGINATE, query],
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

export function updatedNoticeToPagination(
  payload: Notice,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Notice[]>>(
    [QUERY.NOTICE_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
          data: [payload],
        };
      }

      const data = old.data.map((row) => {
        if (row.id?.toString() === payload.id?.toString()) {
          updatedNotice(payload);
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

export function removeNoticeFromPagination(
  payload: Pick<Notice, "id">,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Notice[]>>(
    [QUERY.NOTICE_PAGINATE, query],
    (old) => {
      if (!old)
        return {
          meta: MetaBase,
          data: [],
        };

      return {
        meta: old.meta,
        data: old.data.filter((notice) => {
          return notice.id?.toString() !== payload.id?.toString();
        }),
      };
    }
  );
}

import { MetaBase } from "@/lib/constant";
import { PaginateMetaQuery, PaginateMetaResponse, Video } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedVideo(payload: Video): void {
  TanstackQuery.setQueryData<Video>([QUERY.VIDEO_SHOW, payload.id], (old) => {
    if (!old) return payload;
    return {
      ...old,
      ...payload,
    };
  });
}

export function addedVideoToPagination(
  payload: Video,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Video[]>>(
    [QUERY.VIDEO_PAGINATE, query],
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

export function updatedVideoToPagination(
  payload: Video,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Video[]>>(
    [QUERY.VIDEO_PAGINATE, query],
    (old) => {
      if (!old) {
        return {
          meta: MetaBase,
          data: [payload],
        };
      }

      const data = old.data.map((row) => {
        if (row.id?.toString() === payload.id?.toString()) {
          updatedVideo(payload);
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

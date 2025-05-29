import { MetaBase } from "@/lib/constant";
import { PaginateMetaQuery, PaginateMetaResponse, Podcast } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export const ACTION = {
  PAGINATE: {
    ADDED(payload: Podcast, query: PaginateMetaQuery) {
      TanstackQuery.setQueryData<PaginateMetaResponse<Podcast[]>>(
        [QUERY.PODCAST_PAGINATE, query],
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
    },
    UPDATE(payload: Podcast, query: PaginateMetaQuery) {
      TanstackQuery.setQueryData<PaginateMetaResponse<Podcast[]>>(
        [QUERY.PODCAST_PAGINATE, query],
        (old) => {
          if (!old) {
            return {
              meta: MetaBase,
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
    UPDATE(payload: Podcast) {
      TanstackQuery.setQueryData<Podcast>(
        [QUERY.PODCAST_SHOW, payload.id],
        (old) => {
          if (!old) return payload;
          return {
            ...old,
            ...payload,
          };
        }
      );
    },
  },
} as const;

import { MetaBase } from "@/lib/constant";
import { PaginateMetaQuery, PaginateMetaResponse, Podcast } from "@/lib/model";
import { QUERY, TanstackQuery } from "@/lib/tanstack/instance";

export function updatedPodcast(payload: Podcast): void {
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
}

export function addedPodcastToPagination(
  payload: Podcast,
  query: PaginateMetaQuery
): void {
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
}

export function updatedPodcastToPagination(
  payload: Podcast,
  query: PaginateMetaQuery
): void {
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
        if (row.id?.toString() === payload.id?.toString()) {
          updatedPodcast(payload);
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

export function removePodcastFromPagination(
  payload: Pick<Podcast, "id">,
  query: PaginateMetaQuery
): void {
  TanstackQuery.setQueryData<PaginateMetaResponse<Podcast[]>>(
    [QUERY.PODCAST_PAGINATE, query],
    (old) => {
      if (!old)
        return {
          meta: MetaBase,
          data: [],
        };

      return {
        meta: old.meta,
        data: old.data.filter((podcast) => {
          return podcast.id?.toString() !== payload.id?.toString();
        }),
      };
    }
  );
}

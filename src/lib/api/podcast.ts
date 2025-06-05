import { PodcastCreatePayload, PodcastUpdatePayload } from "@/schemas/podcast";
import {
  Podcast as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Podcast {
  static async create(payload: PodcastCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/podcast", payload);
    return data;
  }

  static async update(payload: PodcastUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/podcast/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/podcast/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/podcast/".concat(id));
    return data;
  }

  public static async delete(id: string): Promise<void> {
    return await AXIOS_INSTANCE.delete("/podcast/".concat(id));
  }
}

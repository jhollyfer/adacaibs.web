import { VideoCreatePayload, VideoUpdatePayload } from "@/schemas/videos";
import {
  Video as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Video {
  static async create(payload: VideoCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/video", payload);
    return data;
  }

  static async update(payload: VideoUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/video/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/video/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/video/".concat(id));
    return data;
  }
}

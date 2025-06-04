import { AlbumCreatePayload, AlbumUpdatePayload } from "@/schemas/albums";
import {
  Album as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Album {
  static async create(payload: AlbumCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/album", payload);
    return data;
  }

  static async update(payload: AlbumUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/album/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/album/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/album/".concat(id));
    return data;
  }
}

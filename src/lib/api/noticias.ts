import { NoticeCreatePayload, NoticeUpdatePayload } from "@/schemas/noticias";
import {
  Notice as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Notice {
  static async create(payload: NoticeCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/notice", payload);
    return data;
  }

  static async update(payload: NoticeUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/notice/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/notice/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/notice/".concat(id));
    return data;
  }
}

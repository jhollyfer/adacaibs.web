import { EventCreatePayload, EventUpdatePayload } from "@/schemas/eventos";
import {
  Events as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Events {
  static async create(payload: EventCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/event", payload);
    return data;
  }

  static async update(payload: EventUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/event/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/event/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/event/".concat(id));
    return data;
  }
}

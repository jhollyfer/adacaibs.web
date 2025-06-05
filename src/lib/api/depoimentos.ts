import {
  TestimonialCreatePayload,
  TestimonialUpdatePayload,
} from "@/schemas/depoimentos";
import {
  Testimonial as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Testimonial {
  static async create(payload: TestimonialCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/testimonial", payload);
    return data;
  }

  static async update(payload: TestimonialUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/testimonial/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<Model[]>> {
    const { data } = await AXIOS_INSTANCE.get("/testimonial/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.get("/testimonial/".concat(id));
    return data;
  }

  public static async delete(id: string): Promise<void> {
    return await AXIOS_INSTANCE.delete("/testimonial/".concat(id));
  }
}

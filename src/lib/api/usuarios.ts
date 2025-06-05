import { UserCreatePayload, UserUpdatePayload } from "@/schemas/usuario";
import {
  User as Model,
  PaginateMetaQuery,
  PaginateMetaResponse,
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class User {
  static async create(payload: UserCreatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.post<Model>("/user", payload);
    return data;
  }

  static async update(payload: UserUpdatePayload): Promise<Model> {
    const { data } = await AXIOS_INSTANCE.patch<Model>(
      "/user/".concat(payload.id),
      payload
    );
    return data;
  }

  public static async paginate(
    query: PaginateMetaQuery
  ): Promise<PaginateMetaResponse<User[]>> {
    const { data } = await AXIOS_INSTANCE.get("/user/paginate", {
      params: {
        ...query,
      },
    });
    return data;
  }

  public static async show(id: string): Promise<User> {
    const { data } = await AXIOS_INSTANCE.get("/user/".concat(id));
    return data;
  }

  public static async delete(id: string): Promise<void> {
    return await AXIOS_INSTANCE.delete("/user/".concat(id));
  }
}

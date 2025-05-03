import { UserCreatePayload } from "@/schemas/usuario";
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
}

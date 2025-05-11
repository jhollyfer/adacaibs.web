import { 
  Album as Model, 
  PaginateMetaQuery, 
  PaginateMetaResponse 
} from "../model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Album {
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
import { Storage as Model } from "@/lib/model";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Storage {
  static async upload(payload: FormData): Promise<Model[]> {
    const { data } = await AXIOS_INSTANCE.post<Model[]>(
      "/storage/upload",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  }
}

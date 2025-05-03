import { UploadResponse } from "@/schemas/storage";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Storage {
  static async upload(payload: FormData): Promise<UploadResponse> {
    const { data } = await AXIOS_INSTANCE.post<UploadResponse>(
      "/storage/upload",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return (
      data?.map((item) => ({
        ...item,
        url: String(import.meta.env.VITE_STORAGE_ENDPOINT)
          .concat("/")
          .concat(item.output),
      })) || []
    );
  }
}

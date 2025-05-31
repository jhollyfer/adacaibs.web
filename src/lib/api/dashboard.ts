import { DashboardStats } from "@/schemas/dashboard";
import { AXIOS_INSTANCE } from "./axios-instance";

export class Dashboard {
  static async getStats(): Promise<DashboardStats> {
    const { data } = await AXIOS_INSTANCE.get("/dashboard");
    return data;
  }
}
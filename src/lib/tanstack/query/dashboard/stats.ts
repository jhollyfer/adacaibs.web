import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { API_SERVICE } from "@/lib/api";
import { QUERY } from "../../instance";
import { DashboardStats } from "@/schemas/dashboard";


export function useDashboardStatsQuery(): UseQueryResult<DashboardStats, Error | AxiosError> {
  return useQuery({
    queryKey: [QUERY.DASHBOARD_STATS],
    queryFn: API_SERVICE["DASHBOARD"]["getStats"],
  });
}
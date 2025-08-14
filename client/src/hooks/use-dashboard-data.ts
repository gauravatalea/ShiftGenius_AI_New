import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useDashboardData() {
  return useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: api.getDashboardStats,
    refetchInterval: 30000, // Refetch every 30 seconds for real-time data
  });
}

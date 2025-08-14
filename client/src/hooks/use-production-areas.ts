import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useProductionAreas() {
  return useQuery({
    queryKey: ['/api/production-areas'],
    queryFn: api.getProductionAreas,
  });
}

export function useProcessSteps() {
  return useQuery({
    queryKey: ['/api/process-steps'],
    queryFn: api.getProcessSteps,
  });
}

export function useProcessStepsByArea(areaId: string) {
  return useQuery({
    queryKey: ['/api/production-areas', areaId, 'process-steps'],
    queryFn: () => api.getProcessStepsByArea(areaId),
    enabled: !!areaId,
  });
}

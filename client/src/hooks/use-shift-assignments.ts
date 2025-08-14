import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export function useShiftAssignments() {
  return useQuery({
    queryKey: ['/api/shift-assignments'],
    queryFn: api.getShiftAssignments,
  });
}

export function useUpdateShiftAssignmentStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => 
      api.updateShiftAssignmentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/shift-assignments'] });
      toast({
        title: "Success",
        description: "Shift assignment updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useGenerateSchedule() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: api.generateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/shift-assignments'] });
      toast({
        title: "Success",
        description: "Schedule generated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

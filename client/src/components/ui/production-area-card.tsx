import { Badge } from "@/components/ui/badge";
import { Factory } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductionAreaCardProps {
  name: string;
  employeeCount: number;
  processSteps: number;
  status: 'operational' | 'understaffed' | 'maintenance';
  efficiency: number;
}

const statusConfig = {
  operational: {
    color: "bg-success-50 text-success-700",
    dotColor: "bg-success-500",
    iconColor: "bg-success-50 text-success-500"
  },
  understaffed: {
    color: "bg-warning-50 text-warning-700", 
    dotColor: "bg-warning-500",
    iconColor: "bg-warning-50 text-warning-500"
  },
  maintenance: {
    color: "bg-error-50 text-error-700",
    dotColor: "bg-error-500", 
    iconColor: "bg-error-50 text-error-500"
  }
};

export function ProductionAreaCard({
  name,
  employeeCount,
  processSteps,
  status,
  efficiency
}: ProductionAreaCardProps) {
  const config = statusConfig[status];
  
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", config.iconColor)}>
          <Factory className="h-6 w-6" />
        </div>
        <div>
          <h4 className="font-medium text-secondary-700" data-testid={`area-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h4>
          <p className="text-sm text-secondary-500">
            {employeeCount} employees • {processSteps} process steps
          </p>
        </div>
      </div>
      
      <div className="text-right">
        <Badge className={cn("inline-flex items-center", config.color)}>
          <div className={cn("w-2 h-2 rounded-full mr-2", config.dotColor)}></div>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
        <p className="text-sm text-secondary-500 mt-1" data-testid={`area-efficiency-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          Efficiency: {efficiency}%
        </p>
      </div>
    </div>
  );
}

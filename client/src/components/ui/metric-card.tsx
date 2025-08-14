import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  iconColor?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  iconColor = "bg-success-50 text-success-500" 
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-secondary-600">{title}</h3>
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-3xl font-bold text-secondary-700" data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          
          {trend && (
            <div className="flex items-center space-x-2">
              {trend.isPositive ? (
                <TrendingUp className="h-4 w-4 text-success-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-error-500" />
              )}
              <span 
                className={cn(
                  "text-sm",
                  trend.isPositive ? "text-success-600" : "text-error-600"
                )}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { AlertTriangle, Clock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
}

const alertConfig = {
  critical: {
    bgColor: "bg-error-50",
    iconBg: "bg-error-500",
    titleColor: "text-error-700",
    messageColor: "text-error-600",
    icon: AlertTriangle
  },
  warning: {
    bgColor: "bg-warning-50", 
    iconBg: "bg-warning-500",
    titleColor: "text-warning-700",
    messageColor: "text-warning-600",
    icon: Clock
  },
  info: {
    bgColor: "bg-primary-50",
    iconBg: "bg-primary-500", 
    titleColor: "text-primary-700",
    messageColor: "text-primary-600",
    icon: Info
  }
};

export function AlertCard({ type, title, message, timestamp }: AlertCardProps) {
  const config = alertConfig[type];
  const Icon = config.icon;
  
  return (
    <div className={cn("flex items-start space-x-3 p-3 rounded-lg", config.bgColor)}>
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", config.iconBg)}>
        <Icon className="h-4 w-4 text-white" />
      </div>
      <div className="flex-1">
        <h4 className={cn("text-sm font-medium", config.titleColor)} data-testid={`alert-title-${type}`}>
          {title}
        </h4>
        <p className={cn("text-xs mt-1", config.messageColor)} data-testid={`alert-message-${type}`}>
          {message}
        </p>
        <p className="text-xs text-secondary-500 mt-2" data-testid={`alert-timestamp-${type}`}>
          {timestamp}
        </p>
      </div>
    </div>
  );
}

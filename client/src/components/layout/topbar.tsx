import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title: string;
  subtitle: string;
  onNotificationsClick: () => void;
  notificationCount?: number;
}

export function TopBar({ 
  title, 
  subtitle, 
  onNotificationsClick, 
  notificationCount = 0 
}: TopBarProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-secondary-700">{title}</h2>
          <p className="text-sm text-secondary-500">{subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Real-time Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-secondary-600">Live Data</span>
          </div>
          
          {/* Current Shift Info */}
          <div className="bg-primary-50 px-4 py-2 rounded-lg">
            <p className="text-sm font-medium text-primary-700">Current Shift</p>
            <p className="text-xs text-primary-600">Day Shift A</p>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative p-2"
            onClick={onNotificationsClick}
            data-testid="notifications-button"
          >
            <Bell className="h-5 w-5 text-secondary-400" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error-500 text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCard } from "@/components/ui/alert-card";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface NotificationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['/api/alerts'],
    queryFn: api.getAlerts,
    enabled: open,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-full mt-6">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : alerts && alerts.length > 0 ? (
              alerts.map((alert: any) => (
                <AlertCard
                  key={alert.id}
                  type={alert.type}
                  title={alert.title}
                  message={alert.message}
                  timestamp={new Date(alert.createdAt).toLocaleString()}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-secondary-500">No notifications</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {alerts && alerts.length > 0 && (
          <div className="pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full"
              data-testid="button-mark-all-read"
            >
              Mark All as Read
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

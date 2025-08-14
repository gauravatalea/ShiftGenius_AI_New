import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCard } from "@/components/ui/alert-card";
import { Bell, Search, Filter, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export default function Alerts() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const queryClient = useQueryClient();
  
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['/api/alerts'],
    queryFn: api.getAlerts,
  });

  const resolveAlert = useMutation({
    mutationFn: async (alertId: string) => {
      // This would be the actual API call to resolve an alert
      return fetch(`/api/alerts/${alertId}/resolve`, { method: 'PATCH' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
      toast({
        title: "Success",
        description: "Alert resolved successfully",
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

  // Sample data when no API data is available
  const sampleAlerts = [
    {
      id: '1',
      type: 'critical',
      title: 'Equipment Malfunction',
      message: 'Assembly Line B conveyor belt has stopped. Immediate attention required.',
      productionArea: { name: 'Assembly Line B' },
      isResolved: false,
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    },
    {
      id: '2',
      type: 'warning',
      title: 'Shift Change Reminder',
      message: 'Night shift starts in 15 minutes. Ensure proper handover.',
      productionArea: { name: 'All Areas' },
      isResolved: false,
      createdAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(), // 12 minutes ago
    },
    {
      id: '3',
      type: 'info',
      title: 'New Production Order',
      message: 'Order #PO-2024-0156 has been assigned to Assembly Line A.',
      productionArea: { name: 'Assembly Line A' },
      isResolved: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    },
    {
      id: '4',
      type: 'warning',
      title: 'Quality Control Understaffed',
      message: 'Quality Control area is currently understaffed. Need 2 additional employees.',
      productionArea: { name: 'Quality Control' },
      isResolved: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
      id: '5',
      type: 'critical',
      title: 'Safety Incident',
      message: 'Minor safety incident reported in Packaging area. Investigation required.',
      productionArea: { name: 'Packaging' },
      isResolved: true,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    },
  ];

  const displayAlerts = alerts || sampleAlerts;

  const filteredAlerts = displayAlerts.filter((alert: any) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'resolved' && alert.isResolved) ||
                         (filterStatus === 'unresolved' && !alert.isResolved);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-error-100 text-error-700';
      case 'warning': return 'bg-warning-100 text-warning-700';
      case 'info': return 'bg-primary-100 text-primary-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Production Alerts"
        subtitle="Monitor and manage production alerts"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={displayAlerts.filter((a: any) => !a.isResolved).length}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
                data-testid="input-search-alerts"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40" data-testid="select-filter-type">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40" data-testid="select-filter-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Alerts</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {displayAlerts.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Critical</p>
                  <p className="text-3xl font-bold text-error-600">
                    {displayAlerts.filter((a: any) => a.type === 'critical' && !a.isResolved).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-error-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-error-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Unresolved</p>
                  <p className="text-3xl font-bold text-warning-600">
                    {displayAlerts.filter((a: any) => !a.isResolved).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Filter className="h-6 w-6 text-warning-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Resolved Today</p>
                  <p className="text-3xl font-bold text-success-600">
                    {displayAlerts.filter((a: any) => 
                      a.isResolved && 
                      new Date(a.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <CardTitle>All Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading alerts...</div>
            ) : (
              <div className="space-y-4">
                {filteredAlerts.length > 0 ? (
                  filteredAlerts.map((alert: any) => (
                    <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          alert.type === 'critical' ? 'bg-error-50' :
                          alert.type === 'warning' ? 'bg-warning-50' :
                          'bg-primary-50'
                        }`}>
{(() => {
                            const IconComponent = getAlertTypeIcon(alert.type);
                            return <IconComponent className={`h-5 w-5 ${
                              alert.type === 'critical' ? 'text-error-500' :
                              alert.type === 'warning' ? 'text-warning-500' :
                              'text-primary-500'
                            }`} />;
                          })()}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-medium text-secondary-700" data-testid={`alert-title-${alert.id}`}>
                              {alert.title}
                            </h4>
                            <Badge className={getTypeColor(alert.type)}>
                              {alert.type}
                            </Badge>
                            {alert.isResolved && (
                              <Badge className="bg-success-100 text-success-700">
                                Resolved
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-secondary-600 mb-2" data-testid={`alert-message-${alert.id}`}>
                            {alert.message}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-secondary-500">
                            <span>Area: {alert.productionArea?.name || 'Unknown'}</span>
                            <span>{new Date(alert.createdAt).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!alert.isResolved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => resolveAlert.mutate(alert.id)}
                            disabled={resolveAlert.isPending}
                            data-testid={`button-resolve-${alert.id}`}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {resolveAlert.isPending ? "Resolving..." : "Resolve"}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            console.log("Alert details clicked for:", alert.id);
                            // Would open alert details modal
                          }}
                          data-testid={`button-details-${alert.id}`}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-secondary-500">
                      {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                        ? "No alerts match your filters" 
                        : "No alerts found"
                      }
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <NotificationPanel 
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
    </div>
  );
}

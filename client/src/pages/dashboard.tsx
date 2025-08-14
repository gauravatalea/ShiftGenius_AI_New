import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { MetricCard } from "@/components/ui/metric-card";
import { ProductionAreaCard } from "@/components/ui/production-area-card";
import { AlertCard } from "@/components/ui/alert-card";
import { DragDropArea } from "@/components/shift-assignment/drag-drop-area";
import { ScheduleOptimizerModal } from "@/components/modals/schedule-optimizer-modal";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  ClipboardList, 
  AlertTriangle,
  RefreshCw,
  Bot,
  Settings
} from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { useProductionAreas } from "@/hooks/use-production-areas";
import { useShiftAssignments, useUpdateShiftAssignmentStatus } from "@/hooks/use-shift-assignments";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScheduleOptimizer, setShowScheduleOptimizer] = useState(false);
  
  const { data: stats, isLoading: statsLoading } = useDashboardData();
  const { data: productionAreas, isLoading: areasLoading, refetch: refetchAreas } = useProductionAreas();
  const { data: shiftAssignments } = useShiftAssignments();
  const { data: alerts } = useQuery({
    queryKey: ['/api/alerts'],
    queryFn: api.getAlerts,
  });

  const handleEmployeeDrop = (employeeId: string, areaId: string) => {
    // This would typically update the shift assignment
    console.log(`Moving employee ${employeeId} to area ${areaId}`);
    // You would call an API to update the shift assignment here
  };

  // Group employees by their current assignments for drag-and-drop
  const availableEmployees = [
    { id: '1', firstName: 'John', lastName: 'Doe', skills: ['Assembly', 'Quality Control'] },
    { id: '2', firstName: 'Sarah', lastName: 'Miller', skills: ['Packaging', 'Maintenance'] },
  ];

  const assemblyEmployees = [
    { id: '3', firstName: 'Mike', lastName: 'Johnson', skills: ['Assembly', 'Team Lead'] },
    { id: '4', firstName: 'Lisa', lastName: 'Wilson', skills: ['Assembly', 'Operator'] },
  ];

  const qualityControlEmployees = [
    { id: '5', firstName: 'Robert', lastName: 'Brown', skills: ['Quality Control', 'Inspector'] },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Production Dashboard"
        subtitle="Real-time manufacturing overview"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={alerts?.filter((a: any) => !a.isResolved).length || 0}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Production Efficiency"
            value={statsLoading ? "..." : `${stats?.efficiency || 0}%`}
            icon={TrendingUp}
            trend={{ value: "+2.3% from yesterday", isPositive: true }}
            iconColor="bg-success-50 text-success-500"
          />
          
          <MetricCard
            title="Active Employees"
            value={statsLoading ? "..." : stats?.activeEmployees || 0}
            icon={Users}
            iconColor="bg-primary-50 text-primary-500"
          />
          
          <MetricCard
            title="Orders In Progress"
            value={statsLoading ? "..." : stats?.ordersInProgress || 0}
            icon={ClipboardList}
            iconColor="bg-warning-50 text-warning-500"
          />
          
          <MetricCard
            title="Critical Alerts"
            value={statsLoading ? "..." : stats?.criticalAlerts || 0}
            icon={AlertTriangle}
            iconColor="bg-error-50 text-error-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Production Areas Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Production Areas Status</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => refetchAreas()}
                  data-testid="button-refresh-areas"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {areasLoading ? (
                  <div className="text-center py-8">Loading production areas...</div>
                ) : productionAreas?.map((area: any) => (
                  <ProductionAreaCard
                    key={area.id}
                    name={area.name}
                    employeeCount={area.currentStaff || 0}
                    processSteps={area.processStepsCount || 0}
                    status={area.status}
                    efficiency={parseFloat(area.efficiency) || 0}
                  />
                )) || (
                  <div className="space-y-4">
                    <ProductionAreaCard
                      name="Assembly Line A"
                      employeeCount={12}
                      processSteps={3}
                      status="operational"
                      efficiency={92}
                    />
                    <ProductionAreaCard
                      name="Quality Control"
                      employeeCount={8}
                      processSteps={2}
                      status="understaffed"
                      efficiency={76}
                    />
                    <ProductionAreaCard
                      name="Packaging"
                      employeeCount={15}
                      processSteps={4}
                      status="operational"
                      efficiency={88}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts && alerts.length > 0 ? (
                  alerts.slice(0, 3).map((alert: any) => (
                    <AlertCard
                      key={alert.id}
                      type={alert.type}
                      title={alert.title}
                      message={alert.message}
                      timestamp={new Date(alert.createdAt).toLocaleString()}
                    />
                  ))
                ) : (
                  <div className="space-y-4">
                    <AlertCard
                      type="critical"
                      title="Equipment Malfunction"
                      message="Assembly Line B conveyor belt stopped"
                      timestamp="2 minutes ago"
                    />
                    <AlertCard
                      type="warning"
                      title="Shift Change Reminder"
                      message="Night shift starts in 15 minutes"
                      timestamp="12 minutes ago"
                    />
                    <AlertCard
                      type="info"
                      title="New Production Order"
                      message="Order #PO-2024-0156 assigned to Line A"
                      timestamp="1 hour ago"
                    />
                  </div>
                )}

                <div className="mt-6">
                  <Button 
                    variant="ghost" 
                    className="w-full text-primary-500"
                    data-testid="button-view-all-alerts"
                  >
                    View All Alerts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Shift Assignments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Shift Assignments</CardTitle>
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={() => setShowScheduleOptimizer(true)}
                  data-testid="button-ai-optimize"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  AI Optimize
                </Button>
                <Button 
                  variant="outline"
                  data-testid="button-manage-shifts"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Shifts
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DragDropArea
                title="Available Employees"
                employees={availableEmployees}
                status="available"
                onEmployeeDrop={handleEmployeeDrop}
                areaId="available"
              />
              
              <DragDropArea
                title="Assembly Line A"
                employees={assemblyEmployees}
                capacity={6}
                status="operational"
                onEmployeeDrop={handleEmployeeDrop}
                areaId="assembly-a"
              />
              
              <DragDropArea
                title="Quality Control"
                employees={qualityControlEmployees}
                capacity={4}
                status="understaffed"
                onEmployeeDrop={handleEmployeeDrop}
                areaId="quality-control"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <NotificationPanel 
        open={showNotifications}
        onOpenChange={setShowNotifications}
      />
      
      <ScheduleOptimizerModal
        open={showScheduleOptimizer}
        onOpenChange={setShowScheduleOptimizer}
      />
    </div>
  );
}

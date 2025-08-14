import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { ScheduleOptimizerModal } from "@/components/modals/schedule-optimizer-modal";
import { DragDropArea } from "@/components/shift-assignment/drag-drop-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Bot, Download, Filter } from "lucide-react";
import { useShiftAssignments } from "@/hooks/use-shift-assignments";

export default function Scheduling() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScheduleOptimizer, setShowScheduleOptimizer] = useState(false);
  
  const { data: shiftAssignments, isLoading } = useShiftAssignments();

  const handleEmployeeDrop = (employeeId: string, areaId: string) => {
    console.log(`Moving employee ${employeeId} to area ${areaId}`);
    // API call to update shift assignment would go here
  };

  // Sample data for the drag-and-drop interface
  const availableEmployees = [
    { id: '1', firstName: 'John', lastName: 'Doe', skills: ['Assembly', 'Quality Control'] },
    { id: '2', firstName: 'Sarah', lastName: 'Miller', skills: ['Packaging', 'Maintenance'] },
    { id: '6', firstName: 'David', lastName: 'Clark', skills: ['Assembly', 'Maintenance'] },
  ];

  const assemblyEmployees = [
    { id: '3', firstName: 'Mike', lastName: 'Johnson', skills: ['Assembly', 'Team Lead'] },
    { id: '4', firstName: 'Lisa', lastName: 'Wilson', skills: ['Assembly', 'Operator'] },
  ];

  const qualityControlEmployees = [
    { id: '5', firstName: 'Robert', lastName: 'Brown', skills: ['Quality Control', 'Inspector'] },
  ];

  const packagingEmployees = [
    { id: '7', firstName: 'Emily', lastName: 'Davis', skills: ['Packaging', 'Team Lead'] },
    { id: '8', firstName: 'James', lastName: 'Wilson', skills: ['Packaging', 'Operator'] },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Shift Scheduling"
        subtitle="Manage employee shift assignments"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-secondary-600" />
              <span className="font-medium text-secondary-700">
                Current Shift: Day Shift A
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                console.log("Filter button clicked");
                // Would open filter modal
              }}
              data-testid="button-filter"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                console.log("Export button clicked");
                // Would trigger export functionality
                fetch('/api/export/shift-plan')
                  .then(res => res.json())
                  .then(data => console.log("Export data:", data));
              }}
              data-testid="button-export"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={() => setShowScheduleOptimizer(true)}
              data-testid="button-ai-optimize-schedule"
            >
              <Bot className="h-4 w-4 mr-2" />
              AI Optimize
            </Button>
          </div>
        </div>

        {/* Shift Assignment Interface */}
        <Card>
          <CardHeader>
            <CardTitle>Shift Assignments - Drag & Drop Interface</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
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

              <DragDropArea
                title="Packaging"
                employees={packagingEmployees}
                capacity={8}
                status="operational"
                onEmployeeDrop={handleEmployeeDrop}
                areaId="packaging"
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly Schedule Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">Loading shift assignments...</div>
              ) : shiftAssignments && shiftAssignments.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Employee</th>
                        <th className="text-left p-3">Production Area</th>
                        <th className="text-left p-3">Shift Date</th>
                        <th className="text-left p-3">Time</th>
                        <th className="text-left p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shiftAssignments.slice(0, 10).map((assignment: any) => (
                        <tr key={assignment.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="font-medium">
                              {assignment.employee?.firstName} {assignment.employee?.lastName}
                            </div>
                          </td>
                          <td className="p-3">{assignment.productionArea?.name}</td>
                          <td className="p-3">
                            {new Date(assignment.shiftDate).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            {new Date(assignment.startTime).toLocaleTimeString()} - {new Date(assignment.endTime).toLocaleTimeString()}
                          </td>
                          <td className="p-3">
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                              assignment.status === 'active' 
                                ? 'bg-success-100 text-success-700'
                                : assignment.status === 'assigned'
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {assignment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-secondary-500 mb-4">No shift assignments found</p>
                  <Button 
                    onClick={() => setShowScheduleOptimizer(true)}
                    data-testid="button-create-schedule"
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Generate AI Schedule
                  </Button>
                </div>
              )}
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

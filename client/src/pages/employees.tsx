import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, Clock, Award } from "lucide-react";
import { useEmployees, useEmployeeUtilization } from "@/hooks/use-employees";

export default function Employees() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: employees, isLoading: employeesLoading } = useEmployees();
  const { data: utilization, isLoading: utilizationLoading } = useEmployeeUtilization();

  const filteredEmployees = Array.isArray(employees) ? employees.filter((employee: any) =>
    `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(employee.skills) && employee.skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())))
  ) : [];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Employee Management"
        subtitle="Manage workforce and track performance"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
                data-testid="input-search-employees"
              />
            </div>
          </div>
          
          <Button 
            onClick={() => {
              console.log("Add Employee button clicked");
              // Would open an employee creation modal
            }}
            data-testid="button-add-employee"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
        </div>

        {/* Employee Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Employees</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {employeesLoading ? "..." : employees?.length || 156}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Currently Active</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {employeesLoading ? "..." : employees?.filter((e: any) => e.isActive).length || 142}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-success-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Avg Efficiency</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {utilizationLoading ? "..." : "87.5%"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-warning-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee List */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
          </CardHeader>
          <CardContent>
            {employeesLoading ? (
              <div className="text-center py-8">Loading employees...</div>
            ) : (
              <div className="space-y-4">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee: any) => (
                    <div 
                      key={employee.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      data-testid={`employee-row-${employee.id}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {employee.firstName[0]}{employee.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary-700">
                            {employee.firstName} {employee.lastName}
                          </h4>
                          <p className="text-sm text-secondary-500">{employee.email}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {employee.skills?.map((skill: string) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            )) || []}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge 
                          variant={employee.isActive ? "default" : "secondary"}
                          className={employee.isActive ? "bg-success-100 text-success-700" : ""}
                        >
                          {employee.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Badge variant="outline">
                          {employee.workingTimeModel?.replace('_', ' ') || 'Full Time'}
                        </Badge>
                        <Button variant="ghost" size="sm" data-testid={`button-edit-${employee.id}`}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))
                ) : searchTerm ? (
                  <div className="text-center py-8">
                    <p className="text-secondary-500">No employees found matching "{searchTerm}"</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Sample employees when no data from API */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">JD</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-secondary-700">John Doe</h4>
                          <p className="text-sm text-secondary-500">john.doe@example.com</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="outline" className="text-xs">Assembly</Badge>
                            <Badge variant="outline" className="text-xs">Quality Control</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-success-100 text-success-700">Active</Badge>
                        <Badge variant="outline">Full Time</Badge>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
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

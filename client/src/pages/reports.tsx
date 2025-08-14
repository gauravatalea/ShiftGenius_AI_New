import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  Factory,
  Clock,
  Award
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function Reports() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [reportType, setReportType] = useState("efficiency");
  const [timeRange, setTimeRange] = useState("7");
  
  const { data: dashboardStats } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: api.getDashboardStats,
  });

  const { data: employeeUtilization } = useQuery({
    queryKey: ['/api/employees/utilization'],
    queryFn: api.getEmployeeUtilization,
  });

  const { data: productionAreas } = useQuery({
    queryKey: ['/api/production-areas'],
    queryFn: api.getProductionAreas,
  });

  // Sample report data
  const efficiencyTrends = [
    { date: '2024-08-08', value: 85.2 },
    { date: '2024-08-09', value: 87.1 },
    { date: '2024-08-10', value: 86.8 },
    { date: '2024-08-11', value: 88.3 },
    { date: '2024-08-12', value: 87.9 },
    { date: '2024-08-13', value: 89.1 },
    { date: '2024-08-14', value: 87.5 },
  ];

  const topPerformers = [
    { name: 'Assembly Line A', efficiency: 92.0, trend: '+2.3%', isPositive: true },
    { name: 'Packaging', efficiency: 88.0, trend: '+1.8%', isPositive: true },
    { name: 'Quality Control', efficiency: 76.0, trend: '-3.2%', isPositive: false },
  ];

  const handleExportReport = () => {
    // This would trigger the export functionality
    console.log(`Exporting ${reportType} report for ${timeRange} days`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Production Reports"
        subtitle="Analytics and performance insights"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger className="w-48" data-testid="select-report-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="efficiency">Efficiency Report</SelectItem>
                <SelectItem value="utilization">Employee Utilization</SelectItem>
                <SelectItem value="production">Production Summary</SelectItem>
                <SelectItem value="quality">Quality Metrics</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32" data-testid="select-time-range">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button onClick={handleExportReport} data-testid="button-export-report">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-600">Overall Efficiency</h3>
                <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-success-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-secondary-700">
                  {dashboardStats?.efficiency || 87.5}%
                </p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success-500" />
                  <span className="text-sm text-success-600">+2.3% vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-600">Workforce Utilization</h3>
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-secondary-700">91.0%</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-secondary-500">
                    {dashboardStats?.activeEmployees || 142} of {dashboardStats?.totalEmployees || 156} active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-600">Production Output</h3>
                <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Factory className="h-5 w-5 text-warning-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-secondary-700">2,340</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-secondary-500">units produced this week</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-secondary-600">Quality Score</h3>
                <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-success-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold text-secondary-700">96.8%</p>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-success-500" />
                  <span className="text-sm text-success-600">+0.5% improvement</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Efficiency Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary-500" />
                <span>Efficiency Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {efficiencyTrends.map((trend, index) => (
                  <div key={trend.date} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-secondary-600">
                        {new Date(trend.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={trend.value} className="w-24" />
                      <span className="text-sm font-medium text-secondary-700 w-12">
                        {trend.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-success-500" />
                <span>Area Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        index === 0 ? 'bg-yellow-500' : 
                        index === 1 ? 'bg-gray-400' : 
                        'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-secondary-700">{performer.name}</p>
                        <p className="text-sm text-secondary-500">{performer.efficiency}% efficiency</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {performer.isPositive ? (
                        <TrendingUp className="h-4 w-4 text-success-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-error-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        performer.isPositive ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {performer.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Utilization Report */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Employee Utilization Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Employee</th>
                    <th className="text-left p-3">Department</th>
                    <th className="text-left p-3">Hours Worked</th>
                    <th className="text-left p-3">Efficiency</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeUtilization?.slice(0, 10).map((employee: any) => (
                    <tr key={employee.employeeId} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <div className="font-medium text-secondary-700">
                          {employee.name}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {employee.skills?.slice(0, 2).map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          )) || <span className="text-sm text-secondary-500">No skills listed</span>}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-secondary-400" />
                          <span>{employee.hoursWorked || 40}h</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <Progress value={employee.efficiency || 85} className="w-16" />
                          <span className="text-sm font-medium">
                            {employee.efficiency || 85}%
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge className="bg-success-100 text-success-700">
                          Active
                        </Badge>
                      </td>
                    </tr>
                  )) || (
                    // Sample data when no employee utilization data
                    <>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium text-secondary-700">John Doe</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">Assembly</Badge>
                            <Badge variant="outline" className="text-xs">Quality Control</Badge>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-secondary-400" />
                            <span>40h</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={92} className="w-16" />
                            <span className="text-sm font-medium">92%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-success-100 text-success-700">Active</Badge>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="font-medium text-secondary-700">Sarah Miller</div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">Packaging</Badge>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-secondary-400" />
                            <span>38h</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={88} className="w-16" />
                            <span className="text-sm font-medium">88%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <Badge className="bg-success-100 text-success-700">Active</Badge>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
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

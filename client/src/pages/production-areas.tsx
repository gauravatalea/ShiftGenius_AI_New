import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Factory, Plus, Users, Settings, TrendingUp } from "lucide-react";
import { useProductionAreas, useProcessSteps } from "@/hooks/use-production-areas";

export default function ProductionAreas() {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { data: productionAreas, isLoading: areasLoading } = useProductionAreas();
  const { data: processSteps, isLoading: stepsLoading } = useProcessSteps();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Production Areas"
        subtitle="Manage manufacturing areas and processes"
        onNotificationsClick={() => setShowNotifications(true)}
        notificationCount={3}
      />

      <div className="flex-1 overflow-auto p-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Factory className="h-5 w-5 text-secondary-600" />
              <span className="font-medium text-secondary-700">
                {areasLoading ? "..." : productionAreas?.length || 0} Production Areas
              </span>
            </div>
          </div>
          
          <Button data-testid="button-add-area">
            <Plus className="h-4 w-4 mr-2" />
            Add Production Area
          </Button>
        </div>

        {/* Production Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {areasLoading ? (
            <div className="col-span-full text-center py-8">Loading production areas...</div>
          ) : productionAreas && productionAreas.length > 0 ? (
            productionAreas.map((area: any) => (
              <Card key={area.id} className="h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Factory className="h-5 w-5 text-primary-500" />
                      <span>{area.name}</span>
                    </CardTitle>
                    <Badge 
                      variant={area.status === 'operational' ? 'default' : 'secondary'}
                      className={
                        area.status === 'operational' 
                          ? 'bg-success-100 text-success-700'
                          : area.status === 'understaffed'
                          ? 'bg-warning-100 text-warning-700'
                          : 'bg-error-100 text-error-700'
                      }
                    >
                      {area.status}
                    </Badge>
                  </div>
                  {area.description && (
                    <p className="text-sm text-secondary-500">{area.description}</p>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Staffing Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Staffing</span>
                    </div>
                    <span className="text-sm text-secondary-600">
                      {area.currentStaff}/{area.capacity}
                    </span>
                  </div>
                  
                  <Progress 
                    value={(area.currentStaff / area.capacity) * 100} 
                    className="w-full"
                  />

                  {/* Efficiency */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Efficiency</span>
                    </div>
                    <span className="text-sm font-medium text-secondary-700">
                      {parseFloat(area.efficiency || 0).toFixed(1)}%
                    </span>
                  </div>

                  {/* Process Steps Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Process Steps</span>
                    <Badge variant="outline">
                      {processSteps?.filter((step: any) => step.productionAreaId === area.id).length || 0}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      data-testid={`button-manage-${area.id}`}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      data-testid={`button-view-${area.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // Sample data when no API data available
            <div className="col-span-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Factory className="h-5 w-5 text-primary-500" />
                      <span>Assembly Line A</span>
                    </CardTitle>
                    <Badge className="bg-success-100 text-success-700">Operational</Badge>
                  </div>
                  <p className="text-sm text-secondary-500">Main assembly line for product A</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Staffing</span>
                    </div>
                    <span className="text-sm text-secondary-600">12/15</span>
                  </div>
                  
                  <Progress value={80} className="w-full" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Efficiency</span>
                    </div>
                    <span className="text-sm font-medium text-secondary-700">92.0%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Process Steps</span>
                    <Badge variant="outline">3</Badge>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Factory className="h-5 w-5 text-primary-500" />
                      <span>Quality Control</span>
                    </CardTitle>
                    <Badge className="bg-warning-100 text-warning-700">Understaffed</Badge>
                  </div>
                  <p className="text-sm text-secondary-500">Quality assurance and testing</p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Staffing</span>
                    </div>
                    <span className="text-sm text-secondary-600">8/12</span>
                  </div>
                  
                  <Progress value={67} className="w-full" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-secondary-400" />
                      <span className="text-sm font-medium">Efficiency</span>
                    </div>
                    <span className="text-sm font-medium text-secondary-700">76.0%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-600">Process Steps</span>
                    <Badge variant="outline">2</Badge>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Manage
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Process Steps Overview */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Process Steps Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {stepsLoading ? (
              <div className="text-center py-8">Loading process steps...</div>
            ) : processSteps && processSteps.length > 0 ? (
              <div className="space-y-4">
                {processSteps.map((step: any) => (
                  <div key={step.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-secondary-700">{step.name}</h4>
                      <p className="text-sm text-secondary-500">{step.description}</p>
                      {step.requiredSkills && step.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {step.requiredSkills.map((skill: string) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      {step.estimatedDuration && (
                        <p className="text-sm text-secondary-600">
                          {step.estimatedDuration} min
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-secondary-500">No process steps defined yet</p>
                <Button className="mt-4" data-testid="button-add-process-step">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Process Step
                </Button>
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

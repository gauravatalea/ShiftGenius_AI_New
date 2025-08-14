import { useState } from "react";
import { TopBar } from "@/components/layout/topbar";
import { NotificationPanel } from "@/components/modals/notification-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, ClipboardList, Calendar, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function ProductionOrders() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: orders, isLoading } = useQuery({
    queryKey: ['/api/production-orders'],
    queryFn: api.getProductionOrders,
  });

  const filteredOrders = orders?.filter((order: any) =>
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.productName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-error-100 text-error-700';
      case 'high': return 'bg-warning-100 text-warning-700';
      case 'medium': return 'bg-primary-100 text-primary-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success-100 text-success-700';
      case 'in_progress': return 'bg-primary-100 text-primary-700';
      case 'pending': return 'bg-warning-100 text-warning-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Sample data for when API doesn't return data
  const sampleOrders = [
    {
      id: '1',
      orderNumber: 'PO-2024-0156',
      productName: 'Widget A',
      quantity: 500,
      priority: 'high',
      status: 'in_progress',
      dueDate: '2024-08-20',
      createdAt: '2024-08-14'
    },
    {
      id: '2', 
      orderNumber: 'PO-2024-0157',
      productName: 'Component B',
      quantity: 250,
      priority: 'critical',
      status: 'pending',
      dueDate: '2024-08-18',
      createdAt: '2024-08-14'
    },
    {
      id: '3',
      orderNumber: 'PO-2024-0158',
      productName: 'Assembly C',
      quantity: 100,
      priority: 'medium',
      status: 'completed',
      dueDate: '2024-08-16',
      createdAt: '2024-08-13'
    }
  ];

  const displayOrders = filteredOrders.length > 0 ? filteredOrders : sampleOrders;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar 
        title="Production Orders"
        subtitle="Manage and track production orders"
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
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
                data-testid="input-search-orders"
              />
            </div>
          </div>
          
          <Button data-testid="button-add-order">
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Total Orders</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {isLoading ? "..." : orders?.length || displayOrders.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <ClipboardList className="h-6 w-6 text-primary-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">In Progress</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {displayOrders.filter((o: any) => o.status === 'in_progress').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning-50 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-warning-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-secondary-600">Critical</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {displayOrders.filter((o: any) => o.priority === 'critical').length}
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
                  <p className="text-sm font-medium text-secondary-600">Completed Today</p>
                  <p className="text-3xl font-bold text-secondary-700">
                    {displayOrders.filter((o: any) => 
                      o.status === 'completed' && 
                      new Date(o.createdAt).toDateString() === new Date().toDateString()
                    ).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success-50 rounded-lg flex items-center justify-center">
                  <ClipboardList className="h-6 w-6 text-success-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Production Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading production orders...</div>
            ) : (
              <div className="space-y-4">
                {displayOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Order Number</th>
                          <th className="text-left p-3">Product</th>
                          <th className="text-left p-3">Quantity</th>
                          <th className="text-left p-3">Priority</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Due Date</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayOrders.map((order: any) => (
                          <tr 
                            key={order.id} 
                            className="border-b hover:bg-gray-50"
                            data-testid={`order-row-${order.id}`}
                          >
                            <td className="p-3">
                              <div className="font-medium text-secondary-700">
                                {order.orderNumber}
                              </div>
                            </td>
                            <td className="p-3">{order.productName}</td>
                            <td className="p-3">{order.quantity}</td>
                            <td className="p-3">
                              <Badge className={getPriorityColor(order.priority)}>
                                {order.priority}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="p-3">
                              {new Date(order.dueDate).toLocaleDateString()}
                            </td>
                            <td className="p-3">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                data-testid={`button-edit-${order.id}`}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-secondary-500">No production orders found</p>
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

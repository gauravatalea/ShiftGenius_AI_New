import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import Dashboard from "@/pages/dashboard";
import Employees from "@/pages/employees";
import ProductionAreas from "@/pages/production-areas";
import Scheduling from "@/pages/scheduling";
import ProductionOrders from "@/pages/production-orders";
import Alerts from "@/pages/alerts";
import Reports from "@/pages/reports";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden bg-secondary-50">
      <Sidebar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/employees" component={Employees} />
        <Route path="/production-areas" component={ProductionAreas} />
        <Route path="/scheduling" component={Scheduling} />
        <Route path="/orders" component={ProductionOrders} />
        <Route path="/alerts" component={Alerts} />
        <Route path="/reports" component={Reports} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Factory, 
  Calendar, 
  ClipboardList, 
  Bell, 
  BarChart3, 
  Settings,
  User
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Employees", href: "/employees", icon: Users },
  { name: "Production Areas", href: "/production-areas", icon: Factory },
  { name: "Shift Scheduling", href: "/scheduling", icon: Calendar },
  { name: "Production Orders", href: "/orders", icon: ClipboardList },
  { name: "Alerts", href: "/alerts", icon: Bell, badge: 3 },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
            <Settings className="text-white h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-secondary-700">ShiftGenius</h1>
            <p className="text-sm text-secondary-500">AI Production Manager</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-600"
                  : "text-secondary-600 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-error-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <User className="text-white h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-secondary-700">Production Manager</p>
            <p className="text-sm text-secondary-500">Administrator</p>
          </div>
          <button 
            className="text-secondary-400 hover:text-secondary-600"
            data-testid="user-menu-button"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

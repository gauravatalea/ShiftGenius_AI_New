import { useState } from "react";
import { EmployeeCard } from "@/components/ui/employee-card";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  skills: string[];
}

interface DragDropAreaProps {
  title: string;
  employees: Employee[];
  capacity?: number;
  status?: 'available' | 'operational' | 'understaffed';
  onEmployeeDrop?: (employeeId: string, areaId: string) => void;
  areaId: string;
}

const statusColors = {
  available: "bg-gray-50",
  operational: "bg-success-50",
  understaffed: "bg-warning-50"
};

export function DragDropArea({ 
  title, 
  employees, 
  capacity,
  status = 'available',
  onEmployeeDrop,
  areaId
}: DragDropAreaProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const employeeId = e.dataTransfer.getData("text/plain");
    if (employeeId && onEmployeeDrop) {
      onEmployeeDrop(employeeId, areaId);
    }
  };

  const handleEmployeeDragStart = (e: React.DragEvent, employeeId: string) => {
    e.dataTransfer.setData("text/plain", employeeId);
  };

  const handleEmployeeDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = "1";
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-4 transition-colors",
        statusColors[status],
        isDragOver && "ring-2 ring-primary-500 ring-opacity-50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-testid={`drop-area-${areaId}`}
    >
      <h4 className="font-medium text-secondary-700 mb-4">
        {title} {capacity && `(${employees.length}/${capacity})`}
      </h4>
      
      <div className="space-y-3">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            id={employee.id}
            name={`${employee.firstName} ${employee.lastName}`}
            skills={employee.skills}
            status={status === 'available' ? 'available' : 'active'}
            draggable={true}
            onDragStart={handleEmployeeDragStart}
            onDragEnd={handleEmployeeDragEnd}
          />
        ))}
        
        {/* Drop zone indicator */}
        {employees.length < (capacity || Infinity) && (
          <div 
            className={cn(
              "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center transition-colors",
              isDragOver && "border-primary-500 bg-primary-50"
            )}
          >
            <Plus className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Drop employees here</p>
            {status === 'understaffed' && capacity && (
              <p className="text-xs text-warning-600 mt-2">
                Understaffed - Need {capacity - employees.length} more
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

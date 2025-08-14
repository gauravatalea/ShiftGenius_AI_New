export interface DashboardStats {
  efficiency: number;
  activeEmployees: number;
  totalEmployees: number;
  ordersInProgress: number;
  ordersCompleted: number;
  criticalAlerts: number;
}

export interface EmployeeUtilization {
  employeeId: string;
  name: string;
  hoursWorked: number;
  efficiency: number;
  skills: string[];
}

export interface ShiftAssignmentWithEmployee {
  id: string;
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    skills: string[];
  };
  productionArea: {
    id: string;
    name: string;
  };
  shiftDate: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface ProductionAreaWithStats {
  id: string;
  name: string;
  description?: string;
  capacity: number;
  currentStaff: number;
  efficiency: number;
  status: string;
  processStepsCount: number;
}

export interface AlertWithArea {
  id: string;
  type: string;
  title: string;
  message: string;
  productionArea?: {
    name: string;
  };
  isResolved: boolean;
  createdAt: string;
}

import { 
  type Employee, 
  type InsertEmployee, 
  type ProductionArea, 
  type InsertProductionArea,
  type ShiftAssignment,
  type InsertShiftAssignment,
  type ProductionOrder,
  type InsertProductionOrder,
  type ProductionAlert,
  type InsertProductionAlert
} from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Employee methods
  getEmployees(): Promise<Employee[]>;
  getEmployee(id: string): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, data: Partial<InsertEmployee>): Promise<Employee | undefined>;
  
  // Production Area methods
  getProductionAreas(): Promise<ProductionArea[]>;
  getProductionArea(id: string): Promise<ProductionArea | undefined>;
  createProductionArea(area: InsertProductionArea): Promise<ProductionArea>;
  
  // Shift Assignment methods
  getShiftAssignments(): Promise<ShiftAssignment[]>;
  createShiftAssignment(assignment: InsertShiftAssignment): Promise<ShiftAssignment>;
  updateShiftAssignment(id: string, data: Partial<InsertShiftAssignment>): Promise<ShiftAssignment | undefined>;
  
  // Production Order methods
  getProductionOrders(): Promise<ProductionOrder[]>;
  createProductionOrder(order: InsertProductionOrder): Promise<ProductionOrder>;
  updateProductionOrder(id: string, data: Partial<InsertProductionOrder>): Promise<ProductionOrder | undefined>;
  
  // Alert methods
  getAlerts(): Promise<ProductionAlert[]>;
  createAlert(alert: InsertProductionAlert): Promise<ProductionAlert>;
  updateAlert(id: string, data: Partial<InsertProductionAlert>): Promise<ProductionAlert | undefined>;
}

export class MemStorage implements IStorage {
  private employees: Map<string, Employee>;
  private productionAreas: Map<string, ProductionArea>;
  private shiftAssignments: Map<string, ShiftAssignment>;
  private productionOrders: Map<string, ProductionOrder>;
  private alerts: Map<string, ProductionAlert>;

  constructor() {
    this.employees = new Map();
    this.productionAreas = new Map();
    this.shiftAssignments = new Map();
    this.productionOrders = new Map();
    this.alerts = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    // Sample employees
    const sampleEmployees = [
      { firstName: "John", lastName: "Smith", email: "john.smith@company.com", skills: ["welding", "assembly"] as string[], workingTimeModel: "full_time" as const, isActive: true },
      { firstName: "Sarah", lastName: "Johnson", email: "sarah.johnson@company.com", skills: ["quality_control", "testing"] as string[], workingTimeModel: "full_time" as const, isActive: true },
      { firstName: "Mike", lastName: "Brown", email: "mike.brown@company.com", skills: ["maintenance", "repair"] as string[], workingTimeModel: "part_time" as const, isActive: true }
    ];

    for (const emp of sampleEmployees) {
      await this.createEmployee(emp);
    }

    // Sample production areas
    const sampleAreas: InsertProductionArea[] = [
      { name: "Assembly Line A", description: "Primary assembly line", capacity: 12, currentStaff: 8, efficiency: "87.50", status: "operational" },
      { name: "Quality Control", description: "Quality inspection area", capacity: 6, currentStaff: 4, efficiency: "92.30", status: "operational" },
      { name: "Packaging", description: "Final packaging department", capacity: 8, currentStaff: 5, efficiency: "78.90", status: "understaffed" }
    ];

    for (const area of sampleAreas) {
      await this.createProductionArea(area);
    }

    // Sample alerts
    const sampleAlerts: InsertProductionAlert[] = [
      { type: "warning", title: "Low Staffing Alert", message: "Packaging department is understaffed", isResolved: false },
      { type: "critical", title: "Equipment Malfunction", message: "Machine #3 requires immediate attention", isResolved: false },
      { type: "info", title: "Shift Change", message: "Night shift starts in 1 hour", isResolved: false }
    ];

    for (const alert of sampleAlerts) {
      await this.createAlert(alert);
    }
  }

  // Employee methods
  async getEmployees(): Promise<Employee[]> {
    return Array.from(this.employees.values());
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const employee: Employee = { 
      ...insertEmployee,
      skills: Array.isArray(insertEmployee.skills) ? insertEmployee.skills : (insertEmployee.skills || []),
      id,
      createdAt: new Date()
    };
    this.employees.set(id, employee);
    return employee;
  }

  async updateEmployee(id: string, data: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (!employee) return undefined;
    
    const updated = { ...employee, ...data };
    this.employees.set(id, updated);
    return updated;
  }

  // Production Area methods
  async getProductionAreas(): Promise<ProductionArea[]> {
    return Array.from(this.productionAreas.values());
  }

  async getProductionArea(id: string): Promise<ProductionArea | undefined> {
    return this.productionAreas.get(id);
  }

  async createProductionArea(insertArea: InsertProductionArea): Promise<ProductionArea> {
    const id = randomUUID();
    const area: ProductionArea = { 
      ...insertArea, 
      id,
      status: insertArea.status || "operational",
      description: insertArea.description || null,
      currentStaff: insertArea.currentStaff || 0,
      efficiency: insertArea.efficiency || "0.00",
      operationalHours: insertArea.operationalHours || null
    };
    this.productionAreas.set(id, area);
    return area;
  }

  // Shift Assignment methods
  async getShiftAssignments(): Promise<ShiftAssignment[]> {
    return Array.from(this.shiftAssignments.values());
  }

  async createShiftAssignment(insertAssignment: InsertShiftAssignment): Promise<ShiftAssignment> {
    const id = randomUUID();
    const assignment: ShiftAssignment = { 
      ...insertAssignment, 
      id,
      status: insertAssignment.status || "assigned"
    };
    this.shiftAssignments.set(id, assignment);
    return assignment;
  }

  async updateShiftAssignment(id: string, data: Partial<InsertShiftAssignment>): Promise<ShiftAssignment | undefined> {
    const assignment = this.shiftAssignments.get(id);
    if (!assignment) return undefined;
    
    const updated = { ...assignment, ...data };
    this.shiftAssignments.set(id, updated);
    return updated;
  }

  // Production Order methods
  async getProductionOrders(): Promise<ProductionOrder[]> {
    return Array.from(this.productionOrders.values());
  }

  async createProductionOrder(insertOrder: InsertProductionOrder): Promise<ProductionOrder> {
    const id = randomUUID();
    const order: ProductionOrder = { 
      ...insertOrder, 
      id,
      status: insertOrder.status || "pending",
      priority: insertOrder.priority || "medium",
      dueDate: insertOrder.dueDate || null,
      createdAt: new Date()
    };
    this.productionOrders.set(id, order);
    return order;
  }

  async updateProductionOrder(id: string, data: Partial<InsertProductionOrder>): Promise<ProductionOrder | undefined> {
    const order = this.productionOrders.get(id);
    if (!order) return undefined;
    
    const updated = { ...order, ...data };
    this.productionOrders.set(id, updated);
    return updated;
  }

  // Alert methods
  async getAlerts(): Promise<ProductionAlert[]> {
    return Array.from(this.alerts.values());
  }

  async createAlert(insertAlert: InsertProductionAlert): Promise<ProductionAlert> {
    const id = randomUUID();
    const alert: ProductionAlert = { 
      ...insertAlert, 
      id,
      productionAreaId: insertAlert.productionAreaId || null,
      isResolved: insertAlert.isResolved || false,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async updateAlert(id: string, data: Partial<InsertProductionAlert>): Promise<ProductionAlert | undefined> {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;
    
    const updated = { ...alert, ...data };
    this.alerts.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();

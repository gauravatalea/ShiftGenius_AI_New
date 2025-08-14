import { apiRequest } from "./queryClient";

const API_BASE_URL = '/api';

export const api = {
  // Dashboard endpoints
  getDashboardStats: () => fetch(`${API_BASE_URL}/dashboard/stats`).then(res => res.json()),
  
  // Employee endpoints
  getEmployees: () => fetch(`${API_BASE_URL}/employees`).then(res => res.json()),
  createEmployee: (data: any) => apiRequest('POST', `${API_BASE_URL}/employees`, data),
  updateEmployee: (id: string, data: any) => apiRequest('PATCH', `${API_BASE_URL}/employees/${id}`, data),
  getEmployeeUtilization: () => fetch(`${API_BASE_URL}/employees/utilization`).then(res => res.json()),

  // Production Areas endpoints
  getProductionAreas: () => fetch(`${API_BASE_URL}/production-areas`).then(res => res.json()),
  getProcessSteps: () => fetch(`${API_BASE_URL}/process-steps`).then(res => res.json()),
  getProcessStepsByArea: (areaId: string) => fetch(`${API_BASE_URL}/production-areas/${areaId}/process-steps`).then(res => res.json()),

  // Production Orders endpoints
  getProductionOrders: () => fetch(`${API_BASE_URL}/production-orders`).then(res => res.json()),
  createProductionOrder: (data: any) => apiRequest('POST', `${API_BASE_URL}/production-orders`, data),
  updateProductionOrder: (id: string, data: any) => apiRequest('PATCH', `${API_BASE_URL}/production-orders/${id}`, data),

  // Shift Assignments endpoints
  getShiftAssignments: () => fetch(`${API_BASE_URL}/shift-assignments`).then(res => res.json()),
  updateShiftAssignmentStatus: (id: string, status: string) => 
    apiRequest('PATCH', `${API_BASE_URL}/shift-assignments/${id}/status`, { status }),

  // Scheduling endpoints
  generateSchedule: (data: any) => apiRequest('POST', `${API_BASE_URL}/generate-schedule`, data),

  // Alerts endpoints
  getAlerts: () => fetch(`${API_BASE_URL}/alerts`).then(res => res.json()),

  // Export endpoints
  exportShiftPlan: () => fetch(`${API_BASE_URL}/export/shift-plan`).then(res => res.json()),

  // Health check
  healthCheck: () => fetch(`${API_BASE_URL}/health`).then(res => res.json()),
};

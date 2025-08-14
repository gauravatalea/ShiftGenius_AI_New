import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const employees = pgTable("employees", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  skills: jsonb("skills").$type<string[]>().default(sql`'[]'::jsonb`),
  workingTimeModel: text("working_time_model").notNull().default("full_time"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productionAreas = pgTable("production_areas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  capacity: integer("capacity").notNull(),
  currentStaff: integer("current_staff").notNull().default(0),
  efficiency: decimal("efficiency", { precision: 5, scale: 2 }).default("0.00"),
  status: text("status").notNull().default("operational"), // operational, understaffed, maintenance
  operationalHours: jsonb("operational_hours").$type<{start: string, end: string}>(),
});

export const processSteps = pgTable("process_steps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  productionAreaId: varchar("production_area_id").references(() => productionAreas.id),
  requiredSkills: jsonb("required_skills").$type<string[]>().default(sql`'[]'::jsonb`),
  estimatedDuration: integer("estimated_duration"), // minutes
  description: text("description"),
});

export const productionOrders = pgTable("production_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull().unique(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  priority: text("priority").notNull().default("medium"), // low, medium, high, critical
  status: text("status").notNull().default("pending"), // pending, in_progress, completed, cancelled
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const shiftAssignments = pgTable("shift_assignments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  employeeId: varchar("employee_id").references(() => employees.id).notNull(),
  productionAreaId: varchar("production_area_id").references(() => productionAreas.id).notNull(),
  shiftDate: timestamp("shift_date").notNull(),
  shiftType: text("shift_type").notNull(), // day, night, weekend
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  status: text("status").notNull().default("assigned"), // assigned, active, completed, absent
});

export const productionAlerts = pgTable("production_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(), // critical, warning, info
  title: text("title").notNull(),
  message: text("message").notNull(),
  productionAreaId: varchar("production_area_id").references(() => productionAreas.id),
  isResolved: boolean("is_resolved").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

export const insertProductionAreaSchema = createInsertSchema(productionAreas).omit({
  id: true,
});

export const insertProcessStepSchema = createInsertSchema(processSteps).omit({
  id: true,
});

export const insertProductionOrderSchema = createInsertSchema(productionOrders).omit({
  id: true,
  createdAt: true,
});

export const insertShiftAssignmentSchema = createInsertSchema(shiftAssignments).omit({
  id: true,
});

export const insertProductionAlertSchema = createInsertSchema(productionAlerts).omit({
  id: true,
  createdAt: true,
});

// Types
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;

export type ProductionArea = typeof productionAreas.$inferSelect;
export type InsertProductionArea = z.infer<typeof insertProductionAreaSchema>;

export type ProcessStep = typeof processSteps.$inferSelect;
export type InsertProcessStep = z.infer<typeof insertProcessStepSchema>;

export type ProductionOrder = typeof productionOrders.$inferSelect;
export type InsertProductionOrder = z.infer<typeof insertProductionOrderSchema>;

export type ShiftAssignment = typeof shiftAssignments.$inferSelect;
export type InsertShiftAssignment = z.infer<typeof insertShiftAssignmentSchema>;

export type ProductionAlert = typeof productionAlerts.$inferSelect;
export type InsertProductionAlert = z.infer<typeof insertProductionAlertSchema>;

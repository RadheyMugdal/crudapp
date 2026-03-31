import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Projects table - represents individual projects
 */
export const project = pgTable(
  "project",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    color: varchar("color", { length: 7 }).default("#6366f1").notNull(), // Hex color
    isArchived: boolean("is_archived").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("project_archived_idx").on(table.isArchived)],
);

/**
 * Tasks table - tasks belonging to projects
 */
export const task = pgTable(
  "task",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 500 }).notNull(),
    description: text("description"),
    status: varchar("status", { length: 50 })
      .default("todo")
      .notNull(), // todo, in_progress, done
    priority: integer("priority").default(0).notNull(), // 0 = none, 1 = low, 2 = medium, 3 = high
    dueDate: timestamp("due_date"),
    completedAt: timestamp("completed_at"),
    projectId: integer("project_id")
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("task_projectId_idx").on(table.projectId),
    index("task_status_idx").on(table.status),
    index("task_priority_idx").on(table.priority),
  ],
);

/**
 * Project relations
 */
export const projectRelations = relations(project, ({ many }) => ({
  tasks: many(task),
}));

/**
 * Task relations
 */
export const taskRelations = relations(task, ({ one }) => ({
  project: one(project, {
    fields: [task.projectId],
    references: [project.id],
  }),
}));

// Type exports for use in application code
export type Project = typeof project.$inferSelect;
export type NewProject = typeof project.$inferInsert;
export type Task = typeof task.$inferSelect;
export type NewTask = typeof task.$inferInsert;

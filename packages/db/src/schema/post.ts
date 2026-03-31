import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

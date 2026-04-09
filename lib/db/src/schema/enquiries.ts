import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const enquiriesTable = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  projectType: text("project_type").notNull(),
  city: text("city"),
  budget: text("budget"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  imageObjectPaths: json("image_object_paths").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertEnquirySchema = createInsertSchema(enquiriesTable).omit({
  id: true,
  createdAt: true,
  status: true,
  imageObjectPaths: true,
}).extend({
  email: z.string().nullish(),
  city: z.string().nullish(),
  budget: z.string().nullish(),
  imageObjectPaths: z.array(z.string()).optional(),
});

export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiriesTable.$inferSelect;

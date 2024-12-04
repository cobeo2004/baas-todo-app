import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const todoTable = defineTable({
  task: v.string(),
  description: v.string(),
  isCompleted: v.optional(v.boolean()),
  dueDate: v.optional(v.string()),
  createdAt: v.string(),
  updatedAt: v.string(),
  userId: v.id("users"),
})
  .index("by_user", ["userId"])
  .index("by_due_date", ["dueDate"])
  .searchIndex("search_task", { searchField: "task" })
  .searchIndex("search_description", { searchField: "description" });

export default defineSchema({
  todo: todoTable,
  ...authTables,
});

// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3template_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 256 }),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  })
);


export const users = createTable(
  "users",
  {
    id: varchar("id").primaryKey(),
    email: varchar("email", { length: 50 })
      .notNull()
      .unique(),
    stripeCustomerId: varchar("stripeCustomerId", { length: 256 }),
    stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt"),
  }
)
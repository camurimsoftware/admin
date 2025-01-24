import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `camurim_${name}`);

export const users = pgTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }),
    guest: varchar("guest", { length: 256 }),
    document: varchar("document", { length: 256 }).unique(),
    referenceNumber: bigint("reference_number", { mode: "number" }),
    roomNumber: bigint("room_number", { mode: "number" }),
    startDate: timestamp("start_date", { mode: "string" }),
    endDate: timestamp("end_date", { mode: "string" }),
    signatureUrl: varchar("signature_url", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at").$onUpdate(
      () => new Date()
    ),
  },
);

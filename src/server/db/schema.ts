// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `camurim_${name}`);

export const users = mysqlTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    guest: varchar("guest", { length: 256 }),
    document: varchar("document", { length: 256 }).unique(),
    referenceNumber: bigint("reference_number", { mode: "number" }),
    roomNumber: bigint("room_number", { mode: "number" }),
    startDate: timestamp("start_date", { mode: "string"}),
    endDate: timestamp("end_date", { mode: "string"}),
    signatureUrl: varchar("signature_url", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    documentIndex: index("document_idx").on(example.document),
  })
);

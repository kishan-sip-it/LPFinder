import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lostPersons = pgTable(
  "lost_persons",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    // Identity
    fullName: varchar("full_name", { length: 160 }).notNull(),
    age: integer("age"),
    gender: varchar("gender", { length: 20 }),
    height: varchar("height", { length: 40 }),
    complexion: varchar("complexion", { length: 60 }),
    identifyingMarks: text("identifying_marks"),

    // Photo (base64 data URL captured from camera or uploaded)
    photoUrl: text("photo_url"),

    // Last seen
    lastSeenLocation: varchar("last_seen_location", { length: 240 }),
    lastSeenDate: varchar("last_seen_date", { length: 40 }),
    clothingDescription: text("clothing_description"),

    // Case
    status: varchar("status", { length: 20 }).notNull().default("missing"),
    description: text("description"),

    // Informer / contact
    reporterName: varchar("reporter_name", { length: 160 }),
    reporterRelation: varchar("reporter_relation", { length: 80 }),
    contactPhone: varchar("contact_phone", { length: 60 }),
    contactEmail: varchar("contact_email", { length: 255 }),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdx: index("lost_persons_user_idx").on(table.userId),
    statusIdx: index("lost_persons_status_idx").on(table.status),
  })
);

export type User = typeof users.$inferSelect;
export type LostPerson = typeof lostPersons.$inferSelect;

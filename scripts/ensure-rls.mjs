import pg from "pg";

const { Pool } = pg;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to enforce database security");
}

const pool = new Pool({ connectionString: databaseUrl });

const TABLES = ["users", "lost_persons"];

try {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const table of TABLES) {
      await client.query(
        `ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY`
      );
    }

    await client.query("COMMIT");
    console.log(
      `Database security check complete: RLS enabled on ${TABLES.join(", ")}.`
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Unable to enforce database RLS:", error);
    process.exitCode = 1;
  } finally {
    client.release();
  }
} finally {
  await pool.end();
}

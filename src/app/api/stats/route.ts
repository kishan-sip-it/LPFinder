import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const rows = await db
    .select({
      status: lostPersons.status,
      count: sql<number>`cast(count(*) as int)`,
    })
    .from(lostPersons)
    .where(eq(lostPersons.userId, session.userId))
    .groupBy(lostPersons.status);

  const stats = { total: 0, missing: 0, investigating: 0, found: 0 };
  for (const r of rows) {
    stats.total += r.count;
    if (r.status in stats) {
      (stats as Record<string, number>)[r.status] = r.count;
    }
  }
  return Response.json({ stats });
}

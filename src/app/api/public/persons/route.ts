import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { desc, ilike, or, eq, and } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const status = searchParams.get("status");
    const q = searchParams.get("q");

    const conditions = [];

    if (status && status !== "all") {
      conditions.push(eq(lostPersons.status, status));
    }

    if (q) {
      const like = `%${q}%`;

      conditions.push(
        or(
          ilike(lostPersons.fullName, like),
          ilike(lostPersons.lastSeenLocation, like),
          ilike(lostPersons.description, like)
        )!
      );
    }

    const rows = await db
      .select({
        id: lostPersons.id,
        fullName: lostPersons.fullName,
        age: lostPersons.age,
        gender: lostPersons.gender,
        photoUrl: lostPersons.photoUrl,
        lastSeenLocation: lostPersons.lastSeenLocation,
        lastSeenDate: lostPersons.lastSeenDate,
        status: lostPersons.status,
        description: lostPersons.description,
        createdAt: lostPersons.createdAt,
      })
      .from(lostPersons)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(lostPersons.createdAt));

    return Response.json({ persons: rows });
  } catch (error) {
    console.error("PUBLIC PERSONS ERROR:", error);
    return Response.json(
      { error: "Failed to load public reports." },
      { status: 500 }
    );
  }
}
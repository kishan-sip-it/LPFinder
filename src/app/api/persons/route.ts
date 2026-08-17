import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { eq, desc, and, ilike, or } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const q = searchParams.get("q");

  const conditions = [eq(lostPersons.userId, session.userId)];
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
    .select()
    .from(lostPersons)
    .where(and(...conditions))
    .orderBy(desc(lostPersons.createdAt));

  return Response.json({ persons: rows });
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const fullName = String(body.fullName || "").trim();
    if (!fullName) {
      return Response.json({ error: "Full name is required." }, { status: 400 });
    }

    const [person] = await db
      .insert(lostPersons)
      .values({
        userId: session.userId,
        fullName,
        age: body.age ? Number(body.age) : null,
        gender: body.gender || null,
        height: body.height || null,
        complexion: body.complexion || null,
        identifyingMarks: body.identifyingMarks || null,
        photoUrl: body.photoUrl || null,
        lastSeenLocation: body.lastSeenLocation || null,
        lastSeenDate: body.lastSeenDate || null,
        clothingDescription: body.clothingDescription || null,
        status: body.status || "missing",
        description: body.description || null,
        reporterName: body.reporterName || null,
        reporterRelation: body.reporterRelation || null,
        contactPhone: body.contactPhone || null,
        contactEmail: body.contactEmail || null,
      })
      .returning();

    return Response.json({ person });
  } catch (e) {
    console.error(e);
    return Response.json({ error: "Failed to create record." }, { status: 500 });
  }
}

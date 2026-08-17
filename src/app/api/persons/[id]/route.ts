import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function ownedPerson(id: number, userId: number) {
  const [row] = await db
    .select()
    .from(lostPersons)
    .where(and(eq(lostPersons.id, id), eq(lostPersons.userId, userId)))
    .limit(1);
  return row ?? null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const person = await ownedPerson(Number(id), session.userId);
  if (!person) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ person });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await ownedPerson(Number(id), session.userId);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const patch: Record<string, unknown> = { updatedAt: new Date() };
  const fields = [
    "fullName",
    "gender",
    "height",
    "complexion",
    "identifyingMarks",
    "photoUrl",
    "lastSeenLocation",
    "lastSeenDate",
    "clothingDescription",
    "status",
    "description",
    "reporterName",
    "reporterRelation",
    "contactPhone",
    "contactEmail",
  ];
  for (const f of fields) {
    if (f in body) patch[f] = body[f];
  }
  if ("age" in body) patch.age = body.age ? Number(body.age) : null;

  const [person] = await db
    .update(lostPersons)
    .set(patch)
    .where(eq(lostPersons.id, Number(id)))
    .returning();

  return Response.json({ person });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await ownedPerson(Number(id), session.userId);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  await db.delete(lostPersons).where(eq(lostPersons.id, Number(id)));
  return Response.json({ ok: true });
}

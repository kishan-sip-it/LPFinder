import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { and, desc, eq, ilike, or } from "drizzle-orm";

export const dynamic = "force-dynamic";

const STATUSES = ["missing", "investigating", "found"] as const;

type Status = (typeof STATUSES)[number];

function validStatus(value: unknown): value is Status {
  return typeof value === "string" && STATUSES.includes(value as Status);
}

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const q = searchParams.get("q")?.trim();

    if (status && !validStatus(status)) {
      return Response.json({ error: "Invalid status." }, { status: 400 });
    }

    const filters = [];

    if (user.role !== "admin") {
      filters.push(eq(lostPersons.userId, user.id));
    }

    if (status) {
      filters.push(eq(lostPersons.status, status));
    }

    if (q) {
      filters.push(
        or(
          ilike(lostPersons.fullName, `%${q}%`),
          ilike(lostPersons.lastSeenLocation, `%${q}%`)
        )
      );
    }

    const persons = await db
      .select()
      .from(lostPersons)
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(desc(lostPersons.updatedAt));

    return Response.json({ persons });
  } catch (error) {
    console.error("PERSONS LIST GET ERROR:", error);

    return Response.json(
      { error: "Failed to load reports." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    if (user.role === "finder") {
      return Response.json(
        { error: "Finders cannot create reports." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";

    if (!fullName) {
      return Response.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    let age: number | null = null;

    if (body.age !== undefined && body.age !== "" && body.age !== null) {
      const parsedAge = Number(body.age);

      if (!Number.isInteger(parsedAge) || parsedAge < 0) {
        return Response.json(
          { error: "Age must be a valid whole number." },
          { status: 400 }
        );
      }

      age = parsedAge;
    }

    const status: Status =
      user.role === "admin" && validStatus(body.status)
        ? body.status
        : "missing";

    const [person] = await db
      .insert(lostPersons)
      .values({
        userId: user.id,
        fullName,
        age,
        gender: body.gender || null,
        height: body.height || null,
        complexion: body.complexion || null,
        identifyingMarks: body.identifyingMarks || null,
        photoUrl: body.photoUrl || null,
        lastSeenLocation: body.lastSeenLocation || null,
        lastSeenDate: body.lastSeenDate || null,
        clothingDescription: body.clothingDescription || null,
        status,
        description: body.description || null,
        reporterName: body.reporterName || null,
        reporterRelation: body.reporterRelation || null,
        contactPhone: body.contactPhone || null,
        contactEmail: body.contactEmail || null,
      })
      .returning();

    return Response.json({ person }, { status: 201 });
  } catch (error) {
    console.error("PERSONS CREATE ERROR:", error);

    return Response.json(
      { error: "Failed to create report." },
      { status: 500 }
    );
  }
}

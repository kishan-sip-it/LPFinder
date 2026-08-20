import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

const STATUSES = ["missing", "investigating", "found"] as const;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const personId = Number(id);

    if (!Number.isInteger(personId)) {
      return Response.json(
        { error: "Invalid report id." },
        { status: 400 }
      );
    }

    const rows = await db
      .select()
      .from(lostPersons)
      .where(eq(lostPersons.id, personId))
      .limit(1);

    const person = rows[0];

    if (!person) {
      return Response.json(
        { error: "Report not found." },
        { status: 404 }
      );
    }

    const isAdmin = user.role === "admin";
    const isOwner = person.userId === user.id;

    if (!isAdmin && !isOwner) {
      return Response.json(
        { error: "You do not have access to this report." },
        { status: 403 }
      );
    }

    return Response.json({ person });
  } catch (error) {
    console.error("PRIVATE PERSON DETAIL GET ERROR:", error);

    return Response.json(
      { error: "Failed to load report." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { error: "Finders cannot edit reports." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const personId = Number(id);

    if (!Number.isInteger(personId)) {
      return Response.json(
        { error: "Invalid report id." },
        { status: 400 }
      );
    }

    const existingRows = await db
      .select()
      .from(lostPersons)
      .where(eq(lostPersons.id, personId))
      .limit(1);

    const existing = existingRows[0];

    if (!existing) {
      return Response.json(
        { error: "Report not found." },
        { status: 404 }
      );
    }

    const isAdmin = user.role === "admin";
    const isOwner = existing.userId === user.id;

    if (!isAdmin && !isOwner) {
      return Response.json(
        { error: "You can only edit your own reports." },
        { status: 403 }
      );
    }

    const body = await req.json();

    const fullName =
      typeof body.fullName === "string"
        ? body.fullName.trim()
        : existing.fullName;

    if (!fullName) {
      return Response.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    let status = existing.status;

    if (body.status !== undefined) {
      if (
        typeof body.status !== "string" ||
        !STATUSES.includes(body.status as (typeof STATUSES)[number])
      ) {
        return Response.json(
          { error: "Invalid status." },
          { status: 400 }
        );
      }

      if (!isAdmin && body.status !== existing.status) {
        return Response.json(
          { error: "Only admins can change case status." },
          { status: 403 }
        );
      }

      status = body.status;
    }

    let age = existing.age;

    if (body.age !== undefined) {
      if (body.age === "" || body.age === null) {
        age = null;
      } else {
        const parsedAge = Number(body.age);

        if (!Number.isInteger(parsedAge) || parsedAge < 0) {
          return Response.json(
            { error: "Age must be a valid whole number." },
            { status: 400 }
          );
        }

        age = parsedAge;
      }
    }

    const updatedRows = await db
      .update(lostPersons)
      .set({
        fullName,
        age,
        gender: body.gender ?? existing.gender,
        height: body.height ?? existing.height,
        complexion: body.complexion ?? existing.complexion,
        identifyingMarks:
          body.identifyingMarks ?? existing.identifyingMarks,
        photoUrl: body.photoUrl ?? existing.photoUrl,
        lastSeenLocation:
          body.lastSeenLocation ?? existing.lastSeenLocation,
        lastSeenDate: body.lastSeenDate ?? existing.lastSeenDate,
        clothingDescription:
          body.clothingDescription ?? existing.clothingDescription,
        status,
        description: body.description ?? existing.description,
        reporterName: body.reporterName ?? existing.reporterName,
        reporterRelation:
          body.reporterRelation ?? existing.reporterRelation,
        contactPhone: body.contactPhone ?? existing.contactPhone,
        contactEmail: body.contactEmail ?? existing.contactEmail,
        updatedAt: new Date(),
      })
      .where(eq(lostPersons.id, personId))
      .returning();

    return Response.json({ person: updatedRows[0] });
  } catch (error) {
    console.error("PRIVATE PERSON DETAIL PATCH ERROR:", error);

    return Response.json(
      { error: "Failed to update report." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
        { error: "Finders cannot delete reports." },
        { status: 403 }
      );
    }

    const { id } = await params;
    const personId = Number(id);

    if (!Number.isInteger(personId)) {
      return Response.json(
        { error: "Invalid report id." },
        { status: 400 }
      );
    }

    const rows = await db
      .select({
        id: lostPersons.id,
        userId: lostPersons.userId,
      })
      .from(lostPersons)
      .where(eq(lostPersons.id, personId))
      .limit(1);

    const person = rows[0];

    if (!person) {
      return Response.json(
        { error: "Report not found." },
        { status: 404 }
      );
    }

    const isAdmin = user.role === "admin";
    const isOwner = person.userId === user.id;

    if (!isAdmin && !isOwner) {
      return Response.json(
        { error: "You can only delete your own reports." },
        { status: 403 }
      );
    }

    await db
      .delete(lostPersons)
      .where(eq(lostPersons.id, personId));

    return Response.json({
      success: true,
      message: "Report deleted successfully.",
    });
  } catch (error) {
    console.error("PRIVATE PERSON DETAIL DELETE ERROR:", error);

    return Response.json(
      { error: "Failed to delete report." },
      { status: 500 }
    );
  }
}
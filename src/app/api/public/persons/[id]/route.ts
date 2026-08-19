import { db } from "@/db";
import { lostPersons } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const personId = Number(id);

    if (!Number.isInteger(personId)) {
      return Response.json({ error: "Invalid report id." }, { status: 400 });
    }

    const rows = await db
      .select({
        id: lostPersons.id,
        fullName: lostPersons.fullName,
        age: lostPersons.age,
        gender: lostPersons.gender,
        height: lostPersons.height,
        complexion: lostPersons.complexion,
        identifyingMarks: lostPersons.identifyingMarks,
        photoUrl: lostPersons.photoUrl,
        lastSeenLocation: lostPersons.lastSeenLocation,
        lastSeenDate: lostPersons.lastSeenDate,
        clothingDescription: lostPersons.clothingDescription,
        status: lostPersons.status,
        description: lostPersons.description,
        reporterName: lostPersons.reporterName,
        reporterRelation: lostPersons.reporterRelation,
        contactPhone: lostPersons.contactPhone,
        contactEmail: lostPersons.contactEmail,
      })
      .from(lostPersons)
      .where(eq(lostPersons.id, personId))
      .limit(1);

    if (!rows[0]) {
      return Response.json({ error: "Report not found." }, { status: 404 });
    }

    return Response.json({ person: rows[0] });
  } catch (error) {
    console.error("PUBLIC PERSON DETAIL ERROR:", error);

    return Response.json(
      { error: "Failed to load report." },
      { status: 500 }
    );
  }
}
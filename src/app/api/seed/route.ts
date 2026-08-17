import { db } from "@/db";
import { users, lostPersons } from "@/db/schema";
import { eq, count } from "drizzle-orm";
import { hashPassword } from "@/lib/auth";

export const dynamic = "force-dynamic";

function avatar(seed: string, bg: string) {
  const initials = seed
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${bg}"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><text x="50%" y="52%" font-family="Arial, sans-serif" font-size="150" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" font-weight="700">${initials}</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const DEMO_EMAIL = "demo@findlost.app";
const DEMO_PASSWORD = "demo1234";

const DEMO_PEOPLE = [
  {
    fullName: "Aarav Sharma",
    age: 8,
    gender: "Male",
    height: "4'2\"",
    complexion: "Fair",
    identifyingMarks: "Small scar on left eyebrow, mole on right cheek",
    lastSeenLocation: "Central Park, Sector 21, New Delhi",
    lastSeenDate: "2026-01-14",
    clothingDescription: "Red hoodie, blue jeans, white sneakers",
    status: "missing",
    description:
      "Went to buy candy from a nearby shop and did not return. Last seen playing near the park fountain.",
    reporterName: "Priya Sharma",
    reporterRelation: "Mother",
    contactPhone: "+91 98100 12345",
    contactEmail: "priya.sharma@example.com",
    bg: "#2563eb",
  },
  {
    fullName: "Meera Iyer",
    age: 72,
    gender: "Female",
    height: "5'1\"",
    complexion: "Wheatish",
    identifyingMarks: "Wears thick glasses, walks with a cane",
    lastSeenLocation: "Marina Beach Road, Chennai",
    lastSeenDate: "2026-02-02",
    clothingDescription: "Cream saree with green border, brown slippers",
    status: "investigating",
    description:
      "Suffers from early-stage dementia. Wandered away from home during the morning walk.",
    reporterName: "Ravi Iyer",
    reporterRelation: "Son",
    contactPhone: "+91 90000 55221",
    contactEmail: "ravi.iyer@example.com",
    bg: "#7c3aed",
  },
  {
    fullName: "Daniel Okoye",
    age: 24,
    gender: "Male",
    height: "5'11\"",
    complexion: "Dark",
    identifyingMarks: "Tattoo of an eagle on right forearm",
    lastSeenLocation: "Downtown Bus Terminal, Lagos",
    lastSeenDate: "2026-01-28",
    clothingDescription: "Black t-shirt, khaki cargo pants, backpack",
    status: "found",
    description:
      "Reunited with family after being identified at a shelter. Case resolved successfully.",
    reporterName: "Grace Okoye",
    reporterRelation: "Sister",
    contactPhone: "+234 803 123 4567",
    contactEmail: "grace.okoye@example.com",
    bg: "#059669",
  },
  {
    fullName: "Sofia Martinez",
    age: 16,
    gender: "Female",
    height: "5'4\"",
    complexion: "Olive",
    identifyingMarks: "Braces, pierced ears, birthmark on neck",
    lastSeenLocation: "Riverside High School, Austin, TX",
    lastSeenDate: "2026-02-10",
    clothingDescription: "School uniform - navy blazer and grey skirt",
    status: "missing",
    description:
      "Did not return home after school. Phone last active near the downtown metro station.",
    reporterName: "Carlos Martinez",
    reporterRelation: "Father",
    contactPhone: "+1 (512) 555-0198",
    contactEmail: "carlos.m@example.com",
    bg: "#db2777",
  },
  {
    fullName: "Hassan Ali",
    age: 45,
    gender: "Male",
    height: "5'8\"",
    complexion: "Medium",
    identifyingMarks: "Beard, missing upper front tooth",
    lastSeenLocation: "Old City Market, Lahore",
    lastSeenDate: "2026-01-05",
    clothingDescription: "Grey shalwar kameez, black waistcoat",
    status: "investigating",
    description:
      "Left for work at the market and never reached his shop. Family filed a report the next morning.",
    reporterName: "Ayesha Ali",
    reporterRelation: "Wife",
    contactPhone: "+92 300 1122334",
    contactEmail: "ayesha.ali@example.com",
    bg: "#ea580c",
  },
];

export async function POST() {
  // Ensure demo user exists
  let [demo] = await db
    .select()
    .from(users)
    .where(eq(users.email, DEMO_EMAIL))
    .limit(1);

  if (!demo) {
    const passwordHash = await hashPassword(DEMO_PASSWORD);
    [demo] = await db
      .insert(users)
      .values({ name: "Demo Family", email: DEMO_EMAIL, passwordHash })
      .returning();
  }

  const [{ value: existingCount }] = await db
    .select({ value: count() })
    .from(lostPersons)
    .where(eq(lostPersons.userId, demo.id));

  if (existingCount === 0) {
    await db.insert(lostPersons).values(
      DEMO_PEOPLE.map((p) => ({
        userId: demo.id,
        fullName: p.fullName,
        age: p.age,
        gender: p.gender,
        height: p.height,
        complexion: p.complexion,
        identifyingMarks: p.identifyingMarks,
        photoUrl: avatar(p.fullName, p.bg),
        lastSeenLocation: p.lastSeenLocation,
        lastSeenDate: p.lastSeenDate,
        clothingDescription: p.clothingDescription,
        status: p.status,
        description: p.description,
        reporterName: p.reporterName,
        reporterRelation: p.reporterRelation,
        contactPhone: p.contactPhone,
        contactEmail: p.contactEmail,
      }))
    );
  }

  return Response.json({
    ok: true,
    credentials: { email: DEMO_EMAIL, password: DEMO_PASSWORD },
  });
}

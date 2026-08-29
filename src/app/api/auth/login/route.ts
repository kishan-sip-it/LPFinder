import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession, type UserRole } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    const password = String(body.password || "");

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const role = user.role as UserRole;

    await createSession({
      userId: user.id,
      email: user.email,
      name: user.name,
      role,
    });

    return Response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (e) {
    console.error(e);

    return Response.json({ error: "Something went wrong." }, { status: 500 });
  }
}

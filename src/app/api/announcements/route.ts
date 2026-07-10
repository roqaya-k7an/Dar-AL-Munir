import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/api";

// Public: list published announcements (pinned first, newest first).
export async function GET() {
  try {
    const data = await prisma.announcement.findMany({
      where: { published: true },
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      take: 12,
    });
    return ok(data);
  } catch {
    return fail("Could not load announcements", 500);
  }
}

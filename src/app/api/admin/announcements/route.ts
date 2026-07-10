import { prisma } from "@/lib/db";
import { ok, fail, requireAdmin } from "@/lib/api";
import { announcementSchema } from "@/lib/validations";
import { sanitizeText } from "@/lib/utils";

export const runtime = "nodejs";

export async function GET() {
  const guard = await requireAdmin();
  if ("response" in guard) return guard.response;
  const data = await prisma.announcement.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
  });
  return ok(data);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if ("response" in guard) return guard.response;

  const json = await req.json().catch(() => null);
  const parsed = announcementSchema.safeParse(json);
  if (!parsed.success) return fail("Validation failed", 422, parsed.error.flatten());
  const v = parsed.data;

  const created = await prisma.announcement.create({
    data: {
      titleEn: sanitizeText(v.titleEn),
      titleAr: sanitizeText(v.titleAr),
      bodyEn: sanitizeText(v.bodyEn),
      bodyAr: sanitizeText(v.bodyAr),
      category: v.category,
      pinned: v.pinned,
      published: v.published,
    },
  });
  return ok(created, 201);
}

import { prisma } from "@/lib/db";
import { ok, fail, requireAdmin } from "@/lib/api";

export const runtime = "nodejs";

// GET /api/admin/applications?kind=student|instructor&q=&status=&course=&nationality=
export async function GET(req: Request) {
  const guard = await requireAdmin();
  if ("response" in guard) return guard.response;

  const url = new URL(req.url);
  const kind = url.searchParams.get("kind") || "student";
  const q = url.searchParams.get("q")?.trim() || "";
  const status = url.searchParams.get("status") || "";
  const course = url.searchParams.get("course") || "";
  const nationality = url.searchParams.get("nationality") || "";
  const take = Math.min(Number(url.searchParams.get("take")) || 100, 500);

  const where: any = {};
  if (status) where.status = status;
  if (course) where.course = course;
  if (nationality) where.nationality = nationality;
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { nationality: { contains: q } },
      { department: { contains: q } },
    ];
    if (kind === "student") {
      where.OR.push({ registrationNo: { contains: q } });
      where.OR.push({ universityId: { contains: q } });
    } else {
      where.OR.push({ employeeNo: { contains: q } });
    }
  }

  try {
    if (kind === "instructor") {
      const data = await prisma.instructorApplication.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take,
        include: { files: true },
      });
      return ok(data);
    }
    const data = await prisma.studentApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take,
      include: { files: true },
    });
    return ok(data);
  } catch {
    return fail("Could not load applications", 500);
  }
}

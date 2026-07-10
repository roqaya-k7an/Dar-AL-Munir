// Shared constants and controlled vocabularies used across the app.

export const APPLICATION_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "ARCHIVED",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_META: Record<
  ApplicationStatus,
  { en: string; ar: string; tone: string }
> = {
  PENDING: { en: "Pending", ar: "قيد المراجعة", tone: "amber" },
  APPROVED: { en: "Approved", ar: "مقبولة", tone: "emerald" },
  REJECTED: { en: "Rejected", ar: "مرفوضة", tone: "rose" },
  ARCHIVED: { en: "Archived", ar: "مؤرشفة", tone: "slate" },
};

// Courses offered — the single source of truth for the whole product.
export const COURSES = [
  { key: "tajweed", en: "Tajweed", ar: "التجويد", icon: "BookOpenCheck", leveled: true },
  { key: "hifz-quran", en: "Hifz ul Qur'an", ar: "حفظ القرآن", icon: "BookMarked", leveled: false },
  { key: "understanding-quran", en: "Understanding Qur'an", ar: "فهم القرآن", icon: "GraduationCap", leveled: false },
  { key: "hifz-ahadees", en: "Hifz ul Ahadees", ar: "حفظ الأحاديث", icon: "ScrollText", leveled: false },
  { key: "hifz-mutun", en: "Hifz Mutun", ar: "حفظ المتون", icon: "Library", leveled: false },
  { key: "aqeedah", en: "Aqeedah", ar: "العقيدة", icon: "Sparkles", leveled: false },
  { key: "sharh-mutun", en: "Explanation of Mutun", ar: "شرح المتون", icon: "PenLine", leveled: false },
] as const;

export const COURSE_KEYS = COURSES.map((c) => c.key);

export const TAJWEED_LEVELS = [
  { key: "beginner", en: "Beginner", ar: "مبتدئ" },
  { key: "intermediate", en: "Intermediate", ar: "متوسط" },
  { key: "advanced", en: "Advanced", ar: "متقدم" },
] as const;

export const COMPLETED_LEVELS = [
  { key: "not-studied", en: "Not Studied", ar: "لم تُدرَس" },
  { key: "beginner", en: "Beginner", ar: "مبتدئ" },
  { key: "intermediate", en: "Intermediate", ar: "متوسط" },
  { key: "advanced", en: "Advanced", ar: "متقدم" },
] as const;

// Instructors teach a narrower course set per the blueprint.
export const INSTRUCTOR_COURSES = [
  { key: "tajweed", en: "Tajweed", ar: "التجويد", leveled: true },
  { key: "hifz-quran", en: "Hifz ul Qur'an", ar: "حفظ القرآن", leveled: false },
  { key: "hifz-hadith", en: "Hifz ul Hadith", ar: "حفظ الحديث", leveled: false },
] as const;

export const EXPERIENCE_YEARS = [
  { key: "1", en: "1 Year", ar: "سنة واحدة" },
  { key: "2", en: "2 Years", ar: "سنتان" },
  { key: "3", en: "3 Years", ar: "3 سنوات" },
  { key: "4", en: "4 Years", ar: "4 سنوات" },
  { key: "5", en: "5 Years", ar: "5 سنوات" },
  { key: "5plus", en: "More than 5 Years", ar: "أكثر من 5 سنوات" },
] as const;

export const TEACHING_MODES = [
  { key: "online", en: "Online", ar: "عن بُعد" },
  { key: "offline", en: "Offline", ar: "حضوري" },
  { key: "both", en: "Both", ar: "كلاهما" },
] as const;

export const ACADEMIC_LEVELS = [
  { key: "bs", en: "BS / Undergraduate", ar: "بكالوريوس" },
  { key: "ms", en: "MS / Master's", ar: "ماجستير" },
  { key: "phd", en: "PhD", ar: "دكتوراه" },
  { key: "diploma", en: "Diploma", ar: "دبلوم" },
  { key: "other", en: "Other", ar: "أخرى" },
] as const;

// Teachers (from the brief) — used for the public Teachers section.
export const TEACHERS = [
  { name: "إرم ناز", spec: { en: "Tajweed & Qira'at", ar: "التجويد والقراءات" }, courses: ["tajweed"], years: 6 },
  { name: "سلمة بي بي", spec: { en: "Hifz ul Qur'an", ar: "حفظ القرآن" }, courses: ["hifz-quran"], years: 8 },
  { name: "نمرة سلطانة", spec: { en: "Aqeedah", ar: "العقيدة" }, courses: ["aqeedah"], years: 5 },
  { name: "سكينة", spec: { en: "Understanding Qur'an", ar: "فهم القرآن" }, courses: ["understanding-quran"], years: 4 },
  { name: "فضة", spec: { en: "Hifz ul Ahadees", ar: "حفظ الأحاديث" }, courses: ["hifz-ahadees"], years: 7 },
  { name: "أم أيمن", spec: { en: "Hifz Mutun", ar: "حفظ المتون" }, courses: ["hifz-mutun"], years: 5 },
  { name: "كنز الإيمان", spec: { en: "Explanation of Mutun", ar: "شرح المتون" }, courses: ["sharh-mutun"], years: 6 },
  { name: "هاجر", spec: { en: "Tajweed (Advanced)", ar: "التجويد المتقدم" }, courses: ["tajweed"], years: 9 },
  { name: "أنعم زيدي", spec: { en: "Hifz ul Qur'an", ar: "حفظ القرآن" }, courses: ["hifz-quran"], years: 10 },
] as const;

// Upload constraints
export const ACCEPTED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
];
export const ACCEPTED_EXT = [".pdf", ".jpg", ".jpeg", ".png"];
export const MAX_UPLOAD_BYTES =
  (Number(process.env.MAX_UPLOAD_MB) || 8) * 1024 * 1024;

export function courseLabel(key: string, lang: "en" | "ar") {
  const c = COURSES.find((x) => x.key === key) || INSTRUCTOR_COURSES.find((x) => x.key === key);
  return c ? c[lang] : key;
}

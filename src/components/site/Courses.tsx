"use client";

import Link from "next/link";
import {
  BookOpenCheck,
  BookMarked,
  GraduationCap,
  ScrollText,
  Library,
  Sparkles,
  PenLine,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { Reveal } from "@/components/ui/Reveal";
import { COURSES, TAJWEED_LEVELS } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  BookOpenCheck,
  BookMarked,
  GraduationCap,
  ScrollText,
  Library,
  Sparkles,
  PenLine,
};

const descriptions: Record<string, { en: string; ar: string }> = {
  tajweed: {
    en: "Master correct Qur'anic recitation across three progressive levels.",
    ar: "إتقان التلاوة الصحيحة عبر ثلاثة مستويات متدرّجة.",
  },
  "hifz-quran": {
    en: "Structured memorization of the Holy Qur'an with revision and tarbiyah.",
    ar: "حفظٌ منظّم للقرآن الكريم مع المراجعة والتربية.",
  },
  "understanding-quran": {
    en: "Grasp meanings, themes, and reflections of the Qur'an.",
    ar: "فهم معاني القرآن ومقاصده والتدبّر فيه.",
  },
  "hifz-ahadees": {
    en: "Memorize authentic prophetic traditions with their meanings.",
    ar: "حفظ الأحاديث النبوية الصحيحة مع معانيها.",
  },
  "hifz-mutun": {
    en: "Commit foundational scholarly texts (mutun) to memory.",
    ar: "حفظ المتون العلمية الأساسية.",
  },
  aqeedah: {
    en: "Study sound Islamic creed rooted in the Qur'an and Sunnah.",
    ar: "دراسة العقيدة الإسلامية الصحيحة من الكتاب والسنّة.",
  },
  "sharh-mutun": {
    en: "Detailed explanation and commentary of classical texts.",
    ar: "شرح مفصّل للمتون الكلاسيكية.",
  },
};

export function Courses() {
  const { d, lang } = useLang();

  return (
    <section id="courses" className="scroll-mt-24 py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">{d.courses.kicker}</span>
          <h2 className="mt-3 font-display text-4xl text-emerald-deep">
            {d.courses.title}
          </h2>
          <p className="mt-4 leading-relaxed text-brand-muted">
            {d.courses.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c, i) => {
            const Icon = iconMap[c.icon] || BookMarked;
            return (
              <Reveal key={c.key} delay={i * 0.05}>
                <article className="glass group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-leaf/20 to-teal/15 text-emerald">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl text-emerald-deep">
                    {lang === "ar" ? c.ar : c.en}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">
                    {lang === "ar"
                      ? descriptions[c.key].ar
                      : descriptions[c.key].en}
                  </p>

                  {c.leveled && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {TAJWEED_LEVELS.map((lv) => (
                        <span
                          key={lv.key}
                          className="chip bg-leaf/12 text-emerald-deep ring-1 ring-leaf/30"
                        >
                          {lang === "ar" ? lv.ar : lv.en}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/register/student?course=${c.key}`}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-emerald transition group-hover:gap-2"
                  >
                    {d.courses.register}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

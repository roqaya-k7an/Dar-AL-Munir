"use client";

import { GraduationCap } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { Reveal } from "@/components/ui/Reveal";
import { TEACHERS, courseLabel } from "@/lib/constants";
import { initials } from "@/lib/utils";

export function Teachers() {
  const { d, lang } = useLang();

  return (
    <section id="teachers" className="container-x scroll-mt-24 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="section-kicker">{d.teachers.kicker}</span>
        <h2 className="mt-3 font-display text-4xl text-emerald-deep">
          {d.teachers.title}
        </h2>
        <p className="mt-4 leading-relaxed text-brand-muted">
          {d.teachers.lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TEACHERS.map((tch, i) => (
          <Reveal key={tch.name} delay={i * 0.05}>
            <article className="glass h-full overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-lg">
              <div className="relative h-32 bg-gradient-to-br from-emerald via-emerald-soft to-teal">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 0l20 20-20 20L0 20z' fill='none' stroke='%23fff' stroke-width='1'/%3E%3C/svg%3E\")",
                  }}
                />
                <div className="absolute -bottom-8 start-6 grid h-16 w-16 place-items-center rounded-2xl bg-white font-display text-2xl text-emerald shadow-glass ring-4 ring-white">
                  {initials(tch.name)}
                </div>
              </div>
              <div className="p-6 pt-11">
                <h3 className="font-arabic text-2xl text-emerald-deep">
                  {tch.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-teal">
                  {lang === "ar" ? tch.spec.ar : tch.spec.en}
                </p>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-brand-muted">
                      {d.teachers.specialization}
                    </dt>
                    <dd className="font-medium text-emerald-deep">
                      {tch.courses
                        .map((c) => courseLabel(c, lang))
                        .join("، ")}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-brand-muted">
                      {d.teachers.experience}
                    </dt>
                    <dd className="font-medium text-emerald-deep">
                      {tch.years} {d.teachers.years}
                    </dd>
                  </div>
                </dl>

                <button className="mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-emerald/15 bg-white/70 py-2 text-sm font-semibold text-emerald-deep transition hover:bg-emerald hover:text-white">
                  <GraduationCap className="h-4 w-4" />
                  {d.teachers.viewProfile}
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ArrowRight, Send } from "lucide-react";
import { useLang } from "@/lib/i18n/provider";
import { Stepper } from "@/components/ui/Stepper";
import { Field, Input, Select, RadioPills } from "@/components/ui/Field";
import { FileUpload } from "@/components/ui/FileUpload";
import { studentSchema, type StudentInput } from "@/lib/validations";
import {
  COURSES,
  COMPLETED_LEVELS,
  ACADEMIC_LEVELS,
  courseSubOptions,
} from "@/lib/constants";
import { Info } from "lucide-react";

type FilesState = Record<string, File | null>;

export function StudentForm() {
  const { d, lang, dir } = useLang();
  const params = useSearchParams();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<FilesState>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const steps = [
    d.form.personal,
    d.form.academic,
    d.form.courseInfo,
    d.form.documents,
    d.form.review,
  ];

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<StudentInput>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      course: (params.get("course") as string) || "",
      studiedBefore: false,
    } as any,
    mode: "onTouched",
  });

  const course = watch("course");
  const studiedBefore = watch("studiedBefore");
  const subOptions = courseSubOptions(course);

  const stepFields: (keyof StudentInput)[][] = [
    ["fullName", "email", "phone", "fatherPhone", "nationality", "nationalId", "registrationNo"],
    ["department", "specialization", "academicLevel"],
    ["course", "courseLevel", "studiedBefore", "completedLevel", "instituteName"],
    [],
    [],
  ];

  async function next() {
    const valid = await trigger(stepFields[step] as any);
    if (valid) setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  async function onSubmit(values: StudentInput) {
    setSubmitError(null);
    const fd = new FormData();
    fd.append("payload", JSON.stringify(values));
    Object.entries(files).forEach(([label, file]) => {
      if (file) fd.append(`file:${label}`, file);
    });

    const res = await fetch("/api/register/student", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (res.status === 409) setSubmitError(d.form.duplicate);
    else setSubmitError(d.form.error);
  }

  if (done) {
    return (
      <div className="glass mx-auto max-w-xl rounded-3xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-leaf" />
        <h2 className="mt-5 font-display text-3xl text-emerald-deep">
          {d.student.title}
        </h2>
        <p className="mt-3 text-brand-muted">{d.form.successStudent}</p>
        <Link href="/" className="btn-primary mt-7">
          {d.nav.home}
        </Link>
      </div>
    );
  }

  const setFile = (label: string) => (f: File | null) =>
    setFiles((prev) => ({ ...prev, [label]: f }));

  return (
    <div className="glass rounded-3xl p-6 sm:p-9">
      <Stepper steps={steps} current={step} />
      <p className="mt-4 text-sm text-brand-muted">
        {d.form.step} {step + 1} {d.form.of} {steps.length}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        {/* Step 1 — Personal */}
        {step === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={d.form.fullName} required error={errors.fullName?.message}>
              <Input {...register("fullName")} />
            </Field>
            <Field label={d.form.emailAddress} required error={errors.email?.message}>
              <Input type="email" {...register("email")} />
            </Field>
            <Field label={d.form.phoneNumber} required error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="+92 3xx xxxxxxx" />
            </Field>
            <Field label={d.form.fatherPhone} error={errors.fatherPhone?.message}>
              <Input {...register("fatherPhone")} />
            </Field>
            <Field label={d.form.nationality} required error={errors.nationality?.message}>
              <Input {...register("nationality")} />
            </Field>
            <Field label={d.form.nationalId} required error={errors.nationalId?.message}>
              <Input {...register("nationalId")} />
            </Field>
            <Field label={d.form.registrationNo} required error={errors.registrationNo?.message}>
              <Input {...register("registrationNo")} />
            </Field>
          </div>
        )}

        {/* Step 2 — Academic */}
        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={d.form.department} error={errors.department?.message}>
              <Input {...register("department")} />
            </Field>
            <Field label={d.form.specialization} error={errors.specialization?.message}>
              <Input {...register("specialization")} />
            </Field>
            <Field label={d.form.academicLevel} error={errors.academicLevel?.message}>
              <Select {...register("academicLevel")}>
                <option value="">{d.form.select}</option>
                {ACADEMIC_LEVELS.map((a) => (
                  <option key={a.key} value={a.key}>
                    {lang === "ar" ? a.ar : a.en}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        )}

        {/* Step 3 — Course */}
        {step === 2 && (
          <div className="grid gap-5">
            <Field label={d.form.selectCourse} required error={errors.course?.message}>
              <Select {...register("course")}>
                <option value="">{d.form.select}</option>
                {COURSES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {lang === "ar" ? c.ar : c.en}
                  </option>
                ))}
              </Select>
            </Field>

            {subOptions && (
              <Field label={d.form.level} error={errors.courseLevel?.message}>
                <RadioPills
                  name="courseLevel"
                  value={watch("courseLevel") || ""}
                  onChange={(v) => setValue("courseLevel", v)}
                  options={subOptions.map((l) => ({
                    value: l.key,
                    label: lang === "ar" ? l.ar : l.en,
                  }))}
                />
              </Field>
            )}

            <Field label={d.form.studiedBefore}>
              <RadioPills
                name="studiedBefore"
                value={studiedBefore ? "yes" : "no"}
                onChange={(v) => setValue("studiedBefore", v === "yes")}
                options={[
                  { value: "yes", label: d.form.yes },
                  { value: "no", label: d.form.no },
                ]}
              />
            </Field>

            {studiedBefore && (
              <>
                <Field label={d.form.completedLevel} error={errors.completedLevel?.message}>
                  <RadioPills
                    name="completedLevel"
                    value={watch("completedLevel") || ""}
                    onChange={(v) => setValue("completedLevel", v)}
                    options={COMPLETED_LEVELS.map((l) => ({
                      value: l.key,
                      label: lang === "ar" ? l.ar : l.en,
                    }))}
                  />
                </Field>
                <Field label={d.form.studentInstitute} error={errors.instituteName?.message}>
                  <Input {...register("instituteName")} />
                </Field>
              </>
            )}
          </div>
        )}

        {/* Step 4 — Documents */}
        {step === 3 && (
          <div className="grid gap-5">
            <FileUpload
              label={d.form.uploadUniId}
              required
              value={files[d.form.uploadUniId] || null}
              onChange={setFile(d.form.uploadUniId)}
            />
          </div>
        )}

        {/* Step 5 — Review */}
        {step === 4 && (
          <div>
            <p className="mb-4 text-sm text-brand-muted">{d.form.reviewNote}</p>
            <ReviewGrid values={getValues()} files={files} lang={lang} d={d} />
            {submitError && (
              <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {submitError}
              </p>
            )}
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="btn-ghost disabled:invisible"
          >
            <BackArrow className="h-4 w-4" />
            {d.form.back}
          </button>

          {step < steps.length - 1 ? (
            <button type="button" onClick={next} className="btn-primary">
              {d.form.next}
              <Arrow className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || !files[d.form.uploadUniId]}
              className="btn-accent"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? d.form.submitting : d.form.submit}
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 flex items-start gap-2 rounded-xl bg-emerald/5 p-3 text-sm text-emerald-deep">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        {d.student.note}
      </div>
    </div>
  );
}

function ReviewGrid({
  values,
  files,
  lang,
  d,
}: {
  values: StudentInput;
  files: Record<string, File | null>;
  lang: "en" | "ar";
  d: any;
}) {
  const rows: [string, string | undefined][] = [
    [d.form.fullName, values.fullName],
    [d.form.emailAddress, values.email],
    [d.form.phoneNumber, values.phone],
    [d.form.nationality, values.nationality],
    [d.form.nationalId, values.nationalId],
    [d.form.registrationNo, values.registrationNo],
    [d.form.department, values.department],
    [
      d.form.selectCourse,
      COURSES.find((c) => c.key === values.course)?.[lang],
    ],
  ];
  const fileNames = Object.entries(files)
    .filter(([, f]) => f)
    .map(([label, f]) => `${label}: ${f!.name}`);

  return (
    <div className="grid gap-2 rounded-2xl border border-emerald/10 bg-white/60 p-5 sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3 border-b border-emerald/5 py-1.5 text-sm">
          <span className="text-brand-muted">{k}</span>
          <span className="font-medium text-emerald-deep">{v || "—"}</span>
        </div>
      ))}
      {fileNames.length > 0 && (
        <div className="sm:col-span-2 pt-2 text-xs text-brand-muted">
          📎 {fileNames.join(" · ")}
        </div>
      )}
    </div>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { StudentForm } from "@/components/forms/StudentForm";
import { StudentHeader } from "@/components/forms/FormHeaders";

export const metadata: Metadata = { title: "Student Registration" };

export default function StudentRegisterPage() {
  return (
    <PageShell>
      <div className="container-x max-w-4xl py-10">
        <StudentHeader />
        <Suspense fallback={<div className="glass h-96 rounded-3xl" />}>
          <StudentForm />
        </Suspense>
      </div>
    </PageShell>
  );
}

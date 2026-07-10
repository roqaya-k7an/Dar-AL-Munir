import type { Metadata } from "next";
import { PageShell } from "@/components/site/PageShell";
import { InstructorForm } from "@/components/forms/InstructorForm";
import { InstructorHeader } from "@/components/forms/FormHeaders";

export const metadata: Metadata = { title: "Instructor Application" };

export default function InstructorRegisterPage() {
  return (
    <PageShell>
      <div className="container-x max-w-4xl py-10">
        <InstructorHeader />
        <InstructorForm />
      </div>
    </PageShell>
  );
}

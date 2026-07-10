"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Users,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { StatCard, ChartCard } from "@/components/admin/StatCard";
import { DonutChart, BarsChart, TrendChart } from "@/components/admin/Charts";
import { courseLabel } from "@/lib/constants";
import { STATUS_META } from "@/lib/constants";

interface Stats {
  totals: {
    students: number;
    instructors: number;
    registrations: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  studentStatus: Record<string, number>;
  byCourse: { name: string; value: number }[];
  byNationality: { name: string; value: number }[];
  byDepartment: { name: string; value: number }[];
  byAcademicLevel: { name: string; value: number }[];
  monthly: { month: string; students: number; instructors: number }[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((res) => setStats(res.data))
      .catch(() => setError(true));
  }, []);

  if (error)
    return <p className="text-rose-500">Failed to load statistics.</p>;
  if (!stats)
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-2xl bg-white/50" />
        ))}
      </div>
    );

  const courseData = stats.byCourse.map((c) => ({
    name: courseLabel(c.name, "en"),
    value: c.value,
  }));
  const statusData = Object.entries(stats.studentStatus).map(([k, v]) => ({
    name: STATUS_META[k as keyof typeof STATUS_META]?.en || k,
    value: v,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-emerald-deep dark:text-white">
          Overview
        </h1>
        <p className="text-sm text-brand-muted dark:text-white/60">
          Assalamu alaikum — here is what's happening across Dar Al Muneerah.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard icon={GraduationCap} label="Total Students" value={stats.totals.students} tone="emerald" />
        <StatCard icon={Users} label="Total Instructors" value={stats.totals.instructors} tone="teal" />
        <StatCard icon={ClipboardList} label="Total Registrations" value={stats.totals.registrations} tone="leaf" />
        <StatCard icon={Clock} label="Pending" value={stats.totals.pending} tone="amber" />
        <StatCard icon={CheckCircle2} label="Approved" value={stats.totals.approved} tone="emerald" />
        <StatCard icon={XCircle} label="Rejected" value={stats.totals.rejected} tone="rose" />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Registrations (last 6 months)">
            <TrendChart data={stats.monthly} />
          </ChartCard>
        </div>
        <ChartCard title="Student Status">
          <DonutChart data={statusData} />
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Registrations by Course">
          <BarsChart data={courseData} />
        </ChartCard>
        <ChartCard title="Nationality Distribution">
          <DonutChart data={stats.byNationality} />
        </ChartCard>
      </div>

      {/* Charts row 3 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard title="Departments">
          <BarsChart data={stats.byDepartment} color="#16788F" />
        </ChartCard>
        <ChartCard title="Academic Levels">
          <DonutChart data={stats.byAcademicLevel} />
        </ChartCard>
      </div>
    </div>
  );
}

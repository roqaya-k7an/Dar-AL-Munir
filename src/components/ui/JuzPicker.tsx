"use client";

import { QURAN_JUZ } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** A small Qur'an (mushaf) cover used as the tile background. */
function MushafIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} fill="none" aria-hidden="true">
      {/* cover */}
      <rect x="4" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      {/* spine */}
      <path d="M9 4v40" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
      {/* inner frame where the number sits */}
      <rect x="13" y="10" width="19" height="28" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      {/* small crescent finial */}
      <path d="M22.5 6.4a2 2 0 1 0 0 3.2 2.4 2.4 0 0 1 0-3.2z" fill="currentColor" />
    </svg>
  );
}

export function JuzPicker({
  value,
  onChange,
}: {
  value: number[];
  onChange: (v: number[]) => void;
}) {
  const toggle = (n: number) =>
    onChange(
      value.includes(n)
        ? value.filter((x) => x !== n)
        : [...value, n].sort((a, b) => a - b),
    );

  return (
    <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
      {QURAN_JUZ.map((n) => {
        const active = value.includes(n);
        return (
          <button
            key={n}
            type="button"
            onClick={() => toggle(n)}
            aria-pressed={active}
            className={cn(
              "relative flex aspect-[4/5] items-center justify-center rounded-xl border transition-all duration-200",
              active
                ? "border-emerald bg-emerald text-white shadow-glass -translate-y-0.5"
                : "border-emerald/15 bg-white/70 text-emerald-deep hover:border-emerald/40 hover:bg-emerald/5",
            )}
          >
            <MushafIcon className="h-10 w-10" />
            <span className="absolute inset-0 flex items-center justify-center pt-1 text-sm font-extrabold">
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}

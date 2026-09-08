"use client";

import { QURAN_JUZ } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** A decorative Islamic rosette used as the tile background behind the number. */
function FlowerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <g opacity="0.55">
        {/* 8 petals around the centre */}
        {Array.from({ length: 8 }).map((_, i) => (
          <ellipse
            key={i}
            cx="24"
            cy="10"
            rx="4"
            ry="9"
            fill="currentColor"
            transform={`rotate(${i * 45} 24 24)`}
          />
        ))}
      </g>
      {/* outer ring + centre */}
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.4" opacity="0.35" />
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
    <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">
      {QURAN_JUZ.map((n) => {
        const active = value.includes(n);
        return (
          <button
            key={n}
            type="button"
            onClick={() => toggle(n)}
            aria-pressed={active}
            title={`${n}`}
            className={cn(
              "relative flex aspect-square items-center justify-center rounded-lg border transition-all duration-150",
              active
                ? "border-emerald bg-emerald text-white shadow-glass"
                : "border-emerald/15 bg-white/70 text-emerald-deep hover:border-emerald/40 hover:bg-emerald/5",
            )}
          >
            <FlowerIcon className="h-8 w-8" />
            <span className="absolute inset-0 flex items-center justify-center text-[12px] font-extrabold">
              {n}
            </span>
          </button>
        );
      })}
    </div>
  );
}

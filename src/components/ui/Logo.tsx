import React from "react";

/**
 * Brand logos.
 *
 * These are lightweight inline SVG placeholders derived from the Dar Al-Munirah
 * mark and the IIUI seal so the app renders fully without binary assets.
 * To use the real logos, drop `dar-logo.png` and `iiui-logo.png` into
 * /public/images and set `USE_IMAGE = true` below (or swap the <svg> for <img>).
 */

export function DarLogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Dar Al Muneerah">
      <defs>
        <linearGradient id="dam-book" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7FBF3F" />
          <stop offset="1" stopColor="#16788F" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      {/* crescent + alif calligraphy */}
      <path
        d="M32 12c-1.6 3-1.6 6 0 9 1.6-3 1.6-6 0-9z"
        fill="#14110F"
      />
      <path
        d="M22 20c4-3 16-3 20 0-3.2 1-6.6 1.5-10 1.5S25.2 21 22 20z"
        fill="#14110F"
      />
      <path
        d="M14 34c6-6 30-6 36 0-2 6-9 10-18 10S16 40 14 34z"
        fill="url(#dam-book)"
      />
      <path d="M32 30v16" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M12 46c8 5 32 5 40 0"
        stroke="#16788F"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IIUILogo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="International Islamic University Islamabad">
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="#0B5D3B" strokeWidth="2" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#0B5D3B" strokeWidth="1" />
      {/* central Allah calligraphy abstraction */}
      <path
        d="M24 40V26c0-3 2-5 4-5m8 19V24m-4 16v-9m8 9V27"
        stroke="#0B5D3B"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* orbiting dots for the seal text ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={32 + Math.cos(a) * 23}
            cy={32 + Math.sin(a) * 23}
            r="0.9"
            fill="#0B5D3B"
          />
        );
      })}
    </svg>
  );
}

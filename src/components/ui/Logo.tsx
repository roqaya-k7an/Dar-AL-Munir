"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Detects an image that already failed to load before React hydrated
// (in which case the `onError` event was missed).
function useBrokenImage() {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return { ref, failed, setFailed };
}

/**
 * Brand logos.
 *
 * They load the real image files from /public/images and fall back to an inline
 * SVG placeholder only if the file is missing — so dropping the real logos in
 * makes them appear everywhere (navbar, hero, footer, admin) with no code change.
 *
 *   /public/images/dar-logo.png    -> Dar Al Muneerah logo
 *   /public/images/iiui-logo.png   -> IIUI logo
 */

export function DarLogo({ className = "h-10 w-10" }: { className?: string }) {
  const { ref, failed, setFailed } = useBrokenImage();
  if (failed) return <DarLogoSVG className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/images/dar-logo.png"
      alt="Dar Al Muneerah"
      className={cn("object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}

export function IIUILogo({ className = "h-10 w-10" }: { className?: string }) {
  const { ref, failed, setFailed } = useBrokenImage();
  if (failed) return <IIUILogoSVG className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src="/images/iiui-logo.png"
      alt="International Islamic University Islamabad"
      className={cn("object-contain", className)}
      onError={() => setFailed(true)}
    />
  );
}

/* ---------- SVG fallbacks (used only if the image files are absent) ---------- */

function DarLogoSVG({ className = "h-10 w-10" }: { className?: string }) {
  // Vector recreation of the Dar Al Muneerah mark: a domed arch topped with a
  // crescent, the word "الله" inside, over an open book with green/blue pages.
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Dar Al Muneerah">
      {/* Crescent finial */}
      <path
        d="M32 5c-3 1.4-3 6.8 0 8.2-4.2-.3-4.2-7.9 0-8.2z"
        fill="#14110F"
      />
      {/* Pointed mihrab arch */}
      <path
        d="M16 42V33c0-9 7-15.5 16-17.5 9 2 16 8.5 16 17.5v9"
        fill="none"
        stroke="#14110F"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      {/* "Allah" calligraphy inside the arch */}
      <text
        x="32"
        y="37"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fill="#14110F"
        fontFamily="'Amiri','Traditional Arabic','Times New Roman',serif"
      >
        الله
      </text>
      {/* Open book — left page green, right page blue */}
      <path d="M32 57V45c-5-4-13-4.5-19-2V52c7-2.5 15-2 19 4z" fill="#7FBF3F" />
      <path d="M32 57V45c5-4 13-4.5 19-2V52c-7-2.5-15-2-19 4z" fill="#16788F" />
      <path d="M32 45v12" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IIUILogoSVG({ className = "h-10 w-10" }: { className?: string }) {
  // Vector recreation of the IIUI seal: a green double ring with the university
  // name curved around it and a calligraphic emblem in the centre.
  const green = "#1F7A3D";
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="International Islamic University Islamabad">
      <defs>
        <path id="iiui-top" d="M12 32a20 20 0 0 1 40 0" />
        <path id="iiui-bottom" d="M14 32a18 18 0 0 0 36 0" />
      </defs>
      <rect width="64" height="64" rx="14" fill="#ffffff" />
      <circle cx="32" cy="32" r="29" fill="none" stroke={green} strokeWidth="1.4" />
      <circle cx="32" cy="32" r="26.5" fill="none" stroke={green} strokeWidth="3" />
      <circle cx="32" cy="32" r="15" fill="none" stroke={green} strokeWidth="1.2" />

      <text fill={green} fontSize="4.4" fontWeight="700" letterSpacing="0.3" fontFamily="Arial, sans-serif">
        <textPath href="#iiui-top" startOffset="50%" textAnchor="middle">
          INTERNATIONAL ISLAMIC UNIVERSITY
        </textPath>
      </text>
      <text fill={green} fontSize="5.4" fontWeight="700" letterSpacing="1.4" fontFamily="Arial, sans-serif">
        <textPath href="#iiui-bottom" startOffset="50%" textAnchor="middle">
          ISLAMABAD
        </textPath>
      </text>

      {/* Separator stars */}
      <circle cx="12" cy="32" r="1.3" fill={green} />
      <circle cx="52" cy="32" r="1.3" fill={green} />

      {/* Central calligraphic emblem */}
      <path
        d="M25 40V27c0-3.2 2.2-5.4 4.4-5.4M39 40V24m-4 16v-9.5m8 9.5V27.5"
        stroke={green}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

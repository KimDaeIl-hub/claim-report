import React from "react";

interface KwangdongLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  logoUrl?: string;
}

export function KwangdongLogo({
  className = "h-8",
  size = "md",
  showWordmark = true,
  logoUrl,
}: KwangdongLogoProps) {
  if (logoUrl && logoUrl.trim().length > 0) {
    return (
      <img
        src={logoUrl}
        alt="광동제약 CI"
        className={`object-contain shrink-0 select-none ${className}`}
      />
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Kwangdong Official CI Infinity Ribbon Emblem */}
      <svg
        viewBox="0 0 140 70"
        className="h-full w-auto shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="광동제약 CI"
      >
        {/* Ribbon 1: Upper-left to bottom-right loop */}
        <path
          d="M 6 22 
             C 18 20, 32 23, 44 32 
             C 58 42, 70 54, 88 56 
             C 106 58, 124 50, 134 38 
             C 131 46, 120 58, 102 62 
             C 82 66, 66 54, 52 42 
             C 38 30, 24 24, 6 22 Z"
          fill="#EE3824"
        />
        {/* Ribbon 2: Intertwining loop creating the double helix / infinity motif */}
        <path
          d="M 134 46 
             C 122 48, 108 45, 96 36 
             C 82 26, 70 14, 52 12 
             C 34 10, 16 18, 6 30 
             C 9 22, 20 10, 38 6 
             C 58 2, 74 14, 88 26 
             C 102 38, 116 44, 134 46 Z"
          fill="#FF4B2B"
        />
        {/* Dynamic cross-band highlight for optical depth */}
        <path
          d="M 28 17 C 42 16, 56 26, 70 35 C 84 44, 98 52, 114 52 C 104 55, 90 52, 76 43 C 62 34, 48 24, 28 17 Z"
          fill="#D92A17"
          opacity="0.9"
        />
      </svg>

      {/* Kwangdong Wordmark matching user's Image 1 */}
      {showWordmark && (
        <span
          className="font-extrabold text-[#383B3E] tracking-tight font-sans"
          style={{
            fontSize: size === "sm" ? "1.15rem" : size === "lg" ? "2.1rem" : "1.65rem",
            letterSpacing: "-0.035em",
            lineHeight: 1,
          }}
        >
          Kwangdong
        </span>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

type ShareButtonProps = {
  title?: string;
  text?: string;
  className?: string;
};

export function ShareButton({
  title = "Портфолио Молдоисаевой Алии",
  text = "Посмотрите портфолио продуктового и UI/UX дизайнера Молдоисаевой Алии",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    // Fallback: Copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl || window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = shareUrl || window.location.href;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Поделиться портфолио"
      className={`group flex items-center gap-1.5 rounded-full bg-card/80 px-3 py-1.5 text-[12px] font-medium backdrop-blur-md border transition-all duration-200 ${
        copied
          ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-400"
          : "border-line text-foreground hover:bg-surface"
      } ${className}`}
    >
      {copied ? (
        <Check size={13} className="text-emerald-400 animate-in zoom-in-50 duration-200" />
      ) : (
        <Share2 size={13} className="text-muted group-hover:text-foreground transition-colors" />
      )}
      <span>{copied ? "Скопировано!" : "Поделиться"}</span>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X, ArrowLeft, RotateCw, ExternalLink } from "lucide-react";
import type { Project } from "@/content/profile";

type ProjectLivePreviewModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectLivePreviewModal({
  project,
  onClose,
}: ProjectLivePreviewModalProps) {
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="live-preview-title"
    >
      {/* Top Browser Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-line bg-card px-3 text-foreground sm:px-5">
        {/* Left: Back button & Project title */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-[12px] font-semibold text-foreground/85 transition hover:bg-surface-strong hover:text-foreground"
          >
            <ArrowLeft size={15} />
            <span>В портфолио</span>
          </button>

          <div className="min-w-0 truncate hidden sm:block">
            <h3 id="live-preview-title" className="truncate text-[14px] font-semibold text-foreground">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reload button */}
          <button
            type="button"
            onClick={reloadIframe}
            title="Перезагрузить страницу"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted transition hover:bg-surface-strong hover:text-foreground"
          >
            <RotateCw size={14} />
          </button>

          {/* Open in full tab */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть на весь экран в новой вкладке"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted transition hover:bg-surface-strong hover:text-foreground"
          >
            <ExternalLink size={15} />
          </a>

          {/* Close modal */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть предпросмотр"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted transition hover:bg-surface-strong hover:text-foreground"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <main className="flex min-h-0 flex-1 overflow-hidden bg-white">
        <div className="h-full w-full overflow-hidden bg-white">
          <iframe
            key={iframeKey}
            src={project.liveUrl}
            title={project.title}
            className="h-full w-full border-0 bg-white"
          />
        </div>
      </main>
    </div>
  );
}

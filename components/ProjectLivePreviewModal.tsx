"use client";

import { useEffect, useState, useRef } from "react";
import { X, ArrowLeft, Smartphone, Monitor, RotateCw, ExternalLink } from "lucide-react";
import type { Project } from "@/content/profile";

type ProjectLivePreviewModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectLivePreviewModal({
  project,
  onClose,
}: ProjectLivePreviewModalProps) {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Browser Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#121215] px-3 sm:px-5 text-white">
        {/* Left: Back button & Project title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-800/80 px-2.5 py-1.5 text-[12px] font-medium text-zinc-200 hover:bg-zinc-700 hover:text-white transition"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">В портфолио</span>
          </button>

          <div className="min-w-0 truncate">
            <h3 className="truncate text-[14px] font-semibold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Center: Simulated URL bar */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-4 py-1 text-[12px] text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="font-mono text-zinc-300">
            aliya.design{project.liveUrl}
          </span>
          <button
            type="button"
            onClick={reloadIframe}
            title="Обновить"
            className="ml-1 text-zinc-500 hover:text-white transition"
          >
            <RotateCw size={12} />
          </button>
        </div>

        {/* Right: Device frame switcher & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Device toggle */}
          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/90 p-0.5">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              title="Десктопный вид"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                device === "desktop"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Monitor size={14} />
              <span className="hidden sm:inline">Десктоп</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice("mobile")}
              title="Мобильный вид"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition ${
                device === "mobile"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Smartphone size={14} />
              <span className="hidden sm:inline">Телефон</span>
            </button>
          </div>

          {/* Open full page */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть в отдельной вкладке"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
          >
            <ExternalLink size={15} />
          </a>

          {/* Close modal */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть предпросмотр"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <main className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center bg-[#09090b]">
        {device === "mobile" ? (
          <div className="relative h-full max-h-[840px] w-full max-w-[390px] overflow-hidden rounded-[36px] border-[6px] border-zinc-800 bg-black shadow-2xl ring-1 ring-zinc-700/50">
            {/* Dynamic island / notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-4 w-24 rounded-full bg-zinc-900 z-20" />
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={project.liveUrl}
              title={project.title}
              className="h-full w-full border-0 bg-black"
            />
          </div>
        ) : (
          <div className="h-full w-full overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-2xl">
            <iframe
              key={iframeKey}
              ref={iframeRef}
              src={project.liveUrl}
              title={project.title}
              className="h-full w-full border-0 bg-black"
            />
          </div>
        )}
      </main>
    </div>
  );
}

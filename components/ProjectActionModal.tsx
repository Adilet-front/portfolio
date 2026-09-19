"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, FileText, X, ArrowUpRight, ArrowRight, Play } from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import type { Project } from "@/content/profile";

type ProjectActionModalProps = {
  project: Project | null;
  onClose: () => void;
  onOpenLivePreview: (project: Project) => void;
};

export function ProjectActionModal({
  project,
  onClose,
  onOpenLivePreview,
}: ProjectActionModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-t-[28px] sm:rounded-3xl border border-zinc-800 bg-[#121214] p-5 sm:p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile handle */}
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-700 sm:hidden" />

        {/* Header with Project Info */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="inline-block rounded-full bg-zinc-800/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400">
                {project.category} · {project.year}
              </span>
              <h2
                id="modal-title"
                className="truncate text-[16px] sm:text-[17px] font-semibold text-white mt-1"
              >
                {project.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800/80 text-zinc-400 hover:bg-zinc-700 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Action Options */}
        <div className="mt-4 space-y-2.5">
          <p className="text-[12px] font-medium uppercase tracking-wider text-zinc-400 px-1">
            Куда перейти:
          </p>

          {/* Option 1: Figma */}
          <a
            href={project.figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 hover:border-[#a259ff]/60 hover:bg-[#a259ff]/10 transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800/90 group-hover:scale-105 transition-transform">
                <FigmaIcon size={22} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-zinc-100 group-hover:text-white">
                  Figma макет
                </div>
                <div className="text-[12px] text-zinc-400">
                  Открыть дизайн, компоненты и прототип
                </div>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-[#a259ff] group-hover:text-white transition">
              <ArrowUpRight size={16} />
            </div>
          </a>

          {/* Option 2: Live Website / Interactive Demo */}
          {project.liveUrl.startsWith("/demos/") ? (
            <button
              type="button"
              onClick={() => onOpenLivePreview(project)}
              className="group w-full flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                  <Globe size={22} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-zinc-100 group-hover:text-white">
                    Реализованный проект
                  </div>
                  <div className="text-[12px] text-zinc-400">
                    Интерактивный запуск прямо в портфолио
                  </div>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                <Play size={15} />
              </div>
            </button>
          ) : (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 hover:border-emerald-500/60 hover:bg-emerald-500/10 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                  <Globe size={22} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-zinc-100 group-hover:text-white">
                    Реализованный проект
                  </div>
                  <div className="text-[12px] text-zinc-400">
                    {project.liveUrl.includes("behance.net")
                      ? "Открыть проект на Behance"
                      : "Перейти на сайт проекта"}
                  </div>
                </div>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                <ArrowUpRight size={16} />
              </div>
            </a>
          )}

          {/* Option 3: Case Study Details */}
          <Link
            href={`/work/${project.slug}`}
            onClick={onClose}
            className="group flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 hover:border-blue-500/60 hover:bg-blue-500/10 transition"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
                <FileText size={22} />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-zinc-100 group-hover:text-white">
                  Страница кейса
                </div>
                <div className="text-[12px] text-zinc-400">
                  Подробный разбор, этапы работы и экраны
                </div>
              </div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-blue-500 group-hover:text-white transition">
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>

        {/* Footer cancel button */}
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-zinc-800/60 py-3 text-center text-[14px] font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

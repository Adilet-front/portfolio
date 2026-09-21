"use client";

import Image from "next/image";
import { ArrowUpRight, Globe } from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import type { Project } from "@/content/profile";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
  eager?: boolean;
};

export function ProjectCard({ project, onSelect, eager = false }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      aria-label={`Открыть проект ${project.shortTitle}`}
      className="group relative block w-full overflow-hidden rounded-lg border border-line bg-surface text-left shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition duration-500 hover:border-foreground/25 hover:shadow-[0_22px_70px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-strong">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 640px) calc(100vw - 24px), (max-width: 1023px) 508px, 840px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading={eager ? "eager" : "lazy"}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent opacity-100 transition-opacity duration-500 sm:opacity-20 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent opacity-90 transition-opacity duration-500 sm:opacity-50 sm:group-hover:opacity-90 sm:group-focus-visible:opacity-90 [@media(hover:none)]:opacity-90" />

        <div className="absolute left-4 top-4 flex items-center gap-2 text-[10px] font-semibold uppercase text-white/85 opacity-80 transition-opacity duration-300 group-hover:opacity-100 sm:left-5 sm:top-5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#f27a32] shadow-[0_0_12px_rgba(242,122,50,0.85)]" />
          {project.slug === "diploma-grooming" ? "Дипломный проект" : "Интерактивный концепт"}
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2 text-white sm:right-5 sm:top-5">
          <span title="Макет в Figma" className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 backdrop-blur-md transition-colors group-hover:bg-black/55">
            <FigmaIcon size={12} />
          </span>
          <span title="Интерактивный сайт" className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 text-emerald-300 backdrop-blur-md transition-colors group-hover:bg-black/55">
            <Globe size={13} />
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-0 items-end justify-between gap-4 p-4 opacity-100 transition-all duration-500 ease-out sm:translate-y-3 sm:p-5 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase text-white/60 sm:text-[11px]">
              <span>{project.category}</span>
              <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-white/50" />
              <span>{project.year}</span>
            </div>
            <h3 className="text-[24px] font-bold leading-tight text-white sm:text-[28px]">
              {project.shortTitle}
            </h3>
            <p className="mt-1 max-w-[360px] text-[12px] font-medium text-white/70 sm:text-[13px]">
              {project.role}
            </p>
          </div>

          <span className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white text-black shadow-lg transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </button>
  );
}

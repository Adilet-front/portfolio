"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import type { Project } from "@/content/profile";

type ProjectCardProps = {
  project: Project;
  onSelect: (project: Project) => void;
};

export function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group relative flex flex-col text-left overflow-hidden rounded-[18px] bg-[#161618] border border-zinc-800/80 transition duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus:ring-2 focus:ring-zinc-500"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 50vw, 280px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Quick link indicator badges */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 rounded-full bg-black/80 px-2 py-1 backdrop-blur-md border border-white/10 opacity-90 transition group-hover:opacity-100">
          <span title="Есть макет в Figma" className="flex items-center">
            <FigmaIcon size={12} />
          </span>
          <span className="h-2.5 w-px bg-zinc-700" />
          <span title="Есть запущенный сайт" className="text-emerald-400">
            <Globe size={12} />
          </span>
        </div>
      </div>

      <div className="flex flex-col p-3 sm:p-3.5">
        <p className="truncate text-[13px] sm:text-[14px] font-semibold text-zinc-100 group-hover:text-white transition-colors">
          {project.title}
        </p>
        <div className="mt-1 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="truncate">{project.category}</span>
          <span className="shrink-0 text-zinc-400 font-medium">{project.year}</span>
        </div>
      </div>
    </button>
  );
}

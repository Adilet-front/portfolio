"use client";

import Link from "next/link";
import { Globe, ArrowLeft, ArrowUpRight, Calendar } from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import type { Project, Profile } from "@/content/profile";

type WorkCaseClientProps = {
  project: Project;
  profile: Profile;
};

export function WorkCaseClient({ project, profile }: WorkCaseClientProps) {
  const isBehance = project.liveUrl.includes("behance.net");
  const liveBtnLabel = isBehance ? "Смотреть кейс на Behance" : "Смотреть проект вживую";

  return (
    <article className="min-h-dvh bg-black text-white pb-20">
      <div className="mx-auto w-full max-w-2xl px-4 pt-6 sm:px-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[14px] font-medium text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Назад в профиль</span>
          </Link>

          <span className="text-[12px] font-medium text-zinc-400">
            {profile.name}
          </span>
        </div>

        {/* Project Header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="rounded-full bg-zinc-850 px-3 py-1 text-[11px] font-semibold text-zinc-300 border border-zinc-800">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-[12px] text-zinc-400">
              <Calendar size={13} />
              {project.year}
            </span>
          </div>

          <h1 className="text-[26px] sm:text-[32px] font-bold leading-tight tracking-tight text-white">
            {project.title}
          </h1>

          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-zinc-300">
            {project.summary}
          </p>

          {/* Quick Action Links: Figma & Direct Live/Behance Link */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={project.figmaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3.5 text-[14px] font-semibold text-white hover:border-[#a259ff]/60 hover:bg-[#a259ff]/15 transition group"
            >
              <FigmaIcon size={18} />
              <span>Открыть в Figma</span>
              <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-white transition" />
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 rounded-2xl border border-zinc-800 bg-zinc-900/90 px-4 py-3.5 text-[14px] font-semibold text-white hover:border-emerald-500/60 hover:bg-emerald-500/15 transition group"
            >
              <Globe size={18} className="text-emerald-400" />
              <span>{liveBtnLabel}</span>
              <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-white transition" />
            </a>
          </div>
        </header>

        {/* Project Meta Info */}
        <div className="mt-8 rounded-2xl border border-zinc-850 bg-[#121214] p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Роль в проекте
              </p>
              <p className="mt-1 text-[14px] font-medium text-zinc-200">
                {project.role}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Результаты / Deliverables
              </p>
              <p className="mt-1 text-[14px] font-medium text-zinc-200">
                {project.deliverables.join(" · ")}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Теги & Инструменты
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-zinc-800/80 px-2.5 py-1 text-[11px] font-medium text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery / Visuals */}
        <section className="mt-10 space-y-5">
          <h2 className="text-[18px] font-bold text-white">
            Визуальная часть кейса
          </h2>

          <div className="space-y-4">
            {project.gallery.map((src, index) => (
              <div
                key={src + index}
                className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 shadow-xl"
              >
                <img
                  src={src}
                  alt={`${project.title} экран ${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Body / Narrative */}
        <section className="mt-10 rounded-2xl border border-zinc-850 bg-[#121214] p-5 sm:p-6">
          <h2 className="text-[17px] font-bold text-white mb-3">
            О процессе и концепции
          </h2>
          <p className="whitespace-pre-line text-[14px] sm:text-[15px] leading-relaxed text-zinc-300">
            {project.body}
          </p>
        </section>

        {/* Bottom Call to Action / Back */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-6 py-3 text-[14px] font-semibold text-white hover:bg-zinc-800 transition"
          >
            <ArrowLeft size={16} />
            <span>Вернуться ко всем проектам</span>
          </Link>

          <p className="text-[12px] text-zinc-400">
            {profile.name} · {profile.location}
          </p>
        </div>
      </div>
    </article>
  );
}

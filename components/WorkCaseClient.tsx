"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ListChecks,
  Maximize2,
  Palette,
  Play,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { FigmaIcon } from "@/components/FigmaIcon";
import { ProjectLivePreviewModal } from "@/components/ProjectLivePreviewModal";
import type { Project, Profile } from "@/content/profile";

type WorkCaseClientProps = {
  project: Project;
  profile: Profile;
};

export function WorkCaseClient({ project, profile }: WorkCaseClientProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEmbeddedLoaded, setIsEmbeddedLoaded] = useState(false);
  const isInternalDemo = project.liveUrl.startsWith("/demos/");
  const isBehance = project.liveUrl.includes("behance.net");

  return (
    <>
      <article className="min-h-dvh bg-background pb-20 text-foreground">
        <div className="mx-auto w-full max-w-2xl px-4 pt-6 sm:px-6">
          {/* Navigation Bar */}
          <div className="flex items-center justify-between border-b border-line pb-6">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[14px] font-medium text-muted transition hover:text-foreground"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>Назад в профиль</span>
            </Link>

            <span className="text-[12px] font-medium text-muted">
              {profile.name}
            </span>
          </div>

          {/* Project Header */}
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full border border-line bg-surface px-3 py-1 text-[11px] font-semibold text-foreground/75">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-[12px] text-muted">
                <Calendar size={13} />
                {project.caseStudy.createdAt}
              </span>
            </div>

            <h1 className="text-[26px] sm:text-[32px] font-bold leading-tight tracking-tight text-foreground">
              {project.title}
            </h1>

            <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-foreground/80">
              {project.summary}
            </p>

            {/* Quick Action Links: Figma & Live / Behance */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3.5 text-[14px] font-semibold text-foreground transition hover:border-[#a259ff]/60 hover:bg-[#a259ff]/15"
              >
                <FigmaIcon size={18} />
                <span>Открыть в Figma</span>
                <ArrowUpRight size={15} className="text-muted transition group-hover:text-foreground" />
              </a>

              {isInternalDemo ? (
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  className="group flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3.5 text-[14px] font-semibold text-foreground transition hover:border-emerald-500/60 hover:bg-emerald-500/15"
                >
                  <Globe size={18} className="text-emerald-400" />
                  <span>Запустить проект вживую</span>
                  <Play size={14} className="text-muted transition group-hover:text-foreground" />
                </button>
              ) : (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2.5 rounded-2xl border border-line bg-card px-4 py-3.5 text-[14px] font-semibold text-foreground transition hover:border-emerald-500/60 hover:bg-emerald-500/15"
                >
                  <Globe size={18} className="text-emerald-400" />
                  <span>{isBehance ? "Смотреть кейс на Behance" : "Смотреть проект вживую"}</span>
                  <ArrowUpRight size={15} className="text-muted transition group-hover:text-foreground" />
                </a>
              )}
            </div>
          </header>

          {/* Project Meta Info */}
          <div className="mt-8 rounded-2xl border border-line bg-card p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Роль в проекте
                </p>
                <p className="mt-1 text-[14px] font-medium text-foreground/85">
                  {project.role}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Результаты / Deliverables
                </p>
                <p className="mt-1 text-[14px] font-medium text-foreground/85">
                  {project.deliverables.join(" · ")}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Теги & Инструменты
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-12 border-t border-line pt-10">
            <div className="flex items-center gap-2 text-foreground">
              <Target size={18} className="text-[#f27a32]" />
              <h2 className="text-[20px] font-bold">Цель проекта</h2>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
              {project.caseStudy.objective}
            </p>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-2 text-foreground">
              <ListChecks size={18} className="text-[#f27a32]" />
              <h2 className="text-[20px] font-bold">Задачи проекта</h2>
            </div>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.caseStudy.tasks.map((task) => (
                <li key={task} className="flex items-start gap-2.5 text-[14px] leading-5 text-foreground/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 border-y border-line py-10">
            <div className="flex items-center gap-2 text-foreground">
              <Sparkles size={18} className="text-[#f27a32]" />
              <h2 className="text-[20px] font-bold">Что выполнено лично мной</h2>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
              {project.caseStudy.contribution}
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.caseStudy.contributions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[14px] leading-5 text-foreground/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f27a32]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* If it is an internal demo, show live embedded player */}
          {isInternalDemo && (
            <section className="relative left-1/2 mt-12 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2">
              <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-[18px] font-bold text-foreground">
                  Проект в действии
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(true)}
                  title="Развернуть проект во весь экран"
                  className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg border border-line bg-card px-3 text-[12px] font-medium text-foreground/80 transition hover:bg-surface hover:text-foreground"
                >
                  <Maximize2 size={14} />
                  <span className="hidden sm:inline">Во весь экран</span>
                </button>
              </div>

              <div className="overflow-hidden rounded-xl border border-line bg-card shadow-2xl">
                <div className="flex h-11 items-center justify-between border-b border-line px-3 sm:px-4">
                  <div className="flex min-w-0 items-center gap-2 text-foreground/75">
                    <Globe size={14} className="shrink-0 text-emerald-400" />
                    <span className="truncate text-[12px] font-medium">
                      {project.title}
                    </span>
                  </div>
                  <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
                {isEmbeddedLoaded ? (
                  <iframe
                    src={project.liveUrl}
                    title={project.title}
                    loading="lazy"
                    className="block h-[70svh] min-h-[480px] w-full border-0 bg-white sm:h-[72svh] sm:min-h-[600px] lg:h-[720px]"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEmbeddedLoaded(true)}
                    className="group relative block h-[70svh] min-h-[480px] w-full overflow-hidden bg-black text-left sm:h-[72svh] sm:min-h-[600px] lg:h-[720px]"
                    aria-label="Загрузить интерактивный проект Flutt"
                  >
                    <Image
                      src={project.gallery[0]}
                      alt="Превью интерактивного проекта Flutt"
                      fill
                      sizes="(max-width: 1200px) 100vw, 1152px"
                      className="object-cover object-top opacity-75 transition duration-500 group-hover:scale-[1.01] group-hover:opacity-65"
                    />
                    <span className="absolute inset-0 bg-black/35" />
                    <span className="absolute inset-0 flex items-center justify-center p-6">
                      <span className="flex max-w-sm flex-col items-center text-center text-white">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-2xl transition group-hover:scale-105">
                          <Play size={20} fill="currentColor" />
                        </span>
                        <strong className="mt-4 text-[17px] font-semibold">
                          Загрузить интерактивный проект
                        </strong>
                        <span className="mt-2 text-[12px] leading-5 text-white/75">
                          Видео и остальные материалы загрузятся только после запуска
                        </span>
                      </span>
                    </span>
                  </button>
                )}
              </div>
            </section>
          )}

          <section className="mt-12">
            <div className="flex items-center gap-2 text-foreground">
              <Wrench size={18} className="text-[#f27a32]" />
              <h2 className="text-[20px] font-bold">Использованные инструменты</h2>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {project.caseStudy.tools.map((tool) => (
                <article key={tool.name} className="rounded-lg border border-line bg-card p-4">
                  <h3 className="text-[14px] font-semibold text-foreground">{tool.name}</h3>
                  <p className="mt-2 text-[13px] leading-5 text-muted">{tool.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 border-y border-line py-10">
            <div className="flex items-center gap-2 text-foreground">
              <Palette size={18} className="text-[#f27a32]" />
              <h2 className="text-[20px] font-bold">Основные дизайнерские решения</h2>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
              {project.caseStudy.designApproach}
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.caseStudy.designDecisions.map((decision) => (
                <li key={decision} className="flex items-start gap-2.5 text-[14px] leading-5 text-foreground/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Gallery / Visuals */}
          <section className="mt-10 space-y-5">
            <h2 className="text-[18px] font-bold text-foreground">
              Визуальная часть кейса
            </h2>

            <div className="space-y-4">
              {project.gallery.map((src, index) => (
                <div
                  key={src + index}
                  className="relative overflow-hidden rounded-2xl border border-line bg-card shadow-xl"
                >
                  <Image
                    src={src}
                    alt={`${project.title} экран ${index + 1}`}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12">
            <div className="flex items-center gap-2 text-foreground">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <h2 className="text-[20px] font-bold">Результат проекта</h2>
            </div>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
              {project.caseStudy.result}
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {project.caseStudy.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5 text-[14px] leading-5 text-foreground/80">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12 rounded-lg border border-line bg-card p-5 sm:p-6">
            <p className="text-[11px] font-semibold uppercase text-muted">Итог</p>
            <h2 className="mt-2 text-[20px] font-bold text-foreground">
              Полный путь от идеи до цифрового продукта
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-foreground/80">
              {project.caseStudy.conclusion}
            </p>
            <p className="mt-4 border-t border-line pt-4 text-[14px] leading-6 text-muted">
              {project.caseStudy.learnings}
            </p>
          </section>

          {/* Bottom Call to Action / Back */}
          <div className="mt-12 flex flex-col items-center gap-4 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 text-[14px] font-semibold text-foreground transition hover:bg-surface"
            >
              <ArrowLeft size={16} />
              <span>Вернуться ко всем проектам</span>
            </Link>

            <p className="text-[12px] text-muted">
              {profile.name} · {profile.location}
            </p>
          </div>
        </div>
      </article>

      <ProjectLivePreviewModal
        project={isPreviewOpen ? project : null}
        onClose={() => setIsPreviewOpen(false)}
      />
    </>
  );
}

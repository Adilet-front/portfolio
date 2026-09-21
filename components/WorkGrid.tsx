"use client";

import { useState } from "react";
import type { Project } from "@/content/profile";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectActionModal } from "@/components/ProjectActionModal";

type WorkGridProps = {
  projects: Project[];
};

export function WorkGrid({ projects }: WorkGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenLivePreview = (project: Project) => {
    setSelectedProject(null);
    window.location.assign(project.liveUrl);
  };

  return (
    <>
      <div
        className={`grid gap-3 px-3 pb-16 pt-4 sm:gap-4 sm:px-4 lg:gap-5 lg:px-0 lg:pb-24 lg:pt-8 ${
          projects.length === 1
            ? "grid-cols-1 lg:max-w-[840px]"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onSelect={setSelectedProject}
            eager={index === 0}
          />
        ))}
      </div>

      <ProjectActionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLivePreview={handleOpenLivePreview}
      />

    </>
  );
}

"use client";

import { useState } from "react";
import type { Project } from "@/content/profile";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectActionModal } from "@/components/ProjectActionModal";
import { ProjectLivePreviewModal } from "@/components/ProjectLivePreviewModal";

type WorkGridProps = {
  projects: Project[];
};

export function WorkGrid({ projects }: WorkGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  const handleOpenLivePreview = (project: Project) => {
    setSelectedProject(null);
    setPreviewProject(project);
  };

  return (
    <>
      <div
        className={`grid gap-3 px-3 pb-16 pt-4 sm:gap-4 sm:px-4 lg:gap-5 lg:px-0 lg:pb-24 lg:pt-8 ${
          projects.length === 1
            ? "grid-cols-1 lg:max-w-[840px]"
            : "grid-cols-2"
        }`}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </div>

      <ProjectActionModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenLivePreview={handleOpenLivePreview}
      />

      <ProjectLivePreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />
    </>
  );
}

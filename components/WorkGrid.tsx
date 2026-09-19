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
      <div className="grid grid-cols-2 gap-3 px-3 pb-16 pt-4 sm:gap-4 sm:px-4">
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

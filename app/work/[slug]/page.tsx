import { notFound } from "next/navigation";
import { getProject, profile, projects } from "@/content/profile";
import { WorkCaseClient } from "@/components/WorkCaseClient";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Проект не найден" };
  }
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.summary,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <WorkCaseClient project={project} profile={profile} />;
}

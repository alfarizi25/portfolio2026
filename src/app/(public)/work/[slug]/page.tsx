import { notFound } from "next/navigation";
import { ProjectDetailClient } from "./ProjectDetailClient";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}

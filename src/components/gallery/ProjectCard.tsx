"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      layoutId={`project-container-${project.id}`}
      className="group bg-white border-brutalist shadow-brutalist p-4 pb-6 hover-brutalist flex flex-col gap-4 relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/work/${project.slug}`} className="block overflow-hidden relative border-4 border-black">
        <motion.div
          layoutId={`project-image-${project.id}`}
          className={cn(
            "relative w-full aspect-[4/3] bg-[#06D6A0]",
            !isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-500"
          )}
        >
          <Image
            src={project.cover_image_url || (project as any).cover_image?.url}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 ease-out group-hover:scale-105"
            priority={priority}
            unoptimized={true}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute top-4 right-4 w-12 h-12 bg-[#FFD23F] border-4 border-black flex items-center justify-center text-black opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-brutalist-sm">
            <ArrowUpRight className="w-8 h-8" strokeWidth={3} />
          </div>
        </motion.div>
      </Link>
      
      <motion.div 
        layoutId={`project-meta-${project.id}`}
        className="flex flex-col gap-1"
      >
        <div className="flex items-center justify-between gap-4 mt-2">
          <Link href={`/work/${project.slug}`} className="font-black text-2xl text-black truncate hover:text-[#FF006E] transition-colors uppercase tracking-tight">
            {project.title}
          </Link>
          <span className="text-xs font-black px-2 py-1 bg-black text-white uppercase tracking-widest shrink-0 border-2 border-black">
            {project.type}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

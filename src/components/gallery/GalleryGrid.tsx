"use client";

import { useState } from "react";
import { Project, ProjectType } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  projects: Project[];
}

type FilterOption = "all" | ProjectType;

export function GalleryGrid({ projects }: GalleryGridProps) {
  const [filter, setFilter] = useState<FilterOption>("all");

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.type === filter
  );

  return (
    <div className="w-full">
      {/* Filter Navigation (Brutalist Style) */}
      <div className="flex flex-wrap gap-4 mb-12">
        {(["all", "design", "photography"] as const).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={cn(
              "px-6 py-3 text-sm font-black transition-all whitespace-nowrap uppercase tracking-widest border-4 border-black",
              filter === option 
                ? "bg-black text-white shadow-none translate-x-[4px] translate-y-[4px]" 
                : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#3A86FF] hover:text-white"
            )}
          >
            {option === "all" ? "All Works" : option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Standard CSS Grid for Albums */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              priority={index < 6}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center bg-white border-brutalist shadow-brutalist text-zinc-500 font-black uppercase tracking-widest">
          Belum ada karya yang dipublikasikan.
        </div>
      )}
    </div>
  );
}

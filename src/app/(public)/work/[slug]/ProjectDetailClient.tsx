"use client";

import { Project } from "@/types/project";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export function ProjectDetailClient({ project }: { project: Project }) {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-7xl pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Information */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32 h-fit">
            <Link 
              href="/work" 
              className="inline-flex items-center text-sm font-black text-black transition-colors bg-white px-6 py-3 border-brutalist shadow-[4px_4px_0_0_#000] w-fit hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] uppercase tracking-widest"
            >
              <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={3} />
              Back
            </Link>

            <motion.div layoutId={`project-meta-${project.id}`}>
              <span className="inline-block px-4 py-1.5 bg-black text-white font-black text-xs tracking-widest uppercase mb-4 border-2 border-black">
                {project.type}
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-[#FFD23F] [-webkit-text-stroke:2px_black]">
                {project.title}
              </h1>
            </motion.div>

            <div className="bg-[#06D6A0] border-brutalist p-6 sm:p-8 shadow-brutalist relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
              <div className="relative z-10">
                <p className="text-xl sm:text-2xl text-black font-black whitespace-pre-wrap mb-8 leading-snug">
                  {project.summary}
                </p>

                <div className="flex flex-col gap-6 pt-6 border-t-4 border-black">
                  {project.type === "design" ? (
                    <>
                      {project.role && (
                        <div>
                          <span className="text-sm font-black text-black uppercase tracking-widest block mb-1">Role</span>
                          <span className="font-bold text-lg text-black bg-white inline-block px-3 py-1 border-2 border-black">{project.role}</span>
                        </div>
                      )}
                      {project.tools && project.tools.length > 0 && (
                        <div>
                          <span className="text-sm font-black text-black uppercase tracking-widest block mb-2">Tools</span>
                          <div className="flex flex-wrap gap-2">
                            {project.tools.map(tool => (
                              <span key={tool} className="px-3 py-1 bg-white border-2 border-black text-sm font-black text-black">{tool}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {project.camera && (
                        <div>
                          <span className="text-sm font-black text-black uppercase tracking-widest block mb-1">Camera</span>
                          <span className="font-bold text-lg text-black bg-white inline-block px-3 py-1 border-2 border-black">{project.camera}</span>
                        </div>
                      )}
                      {project.lens && (
                        <div>
                          <span className="text-sm font-black text-black uppercase tracking-widest block mb-1">Lens</span>
                          <span className="font-bold text-lg text-black bg-white inline-block px-3 py-1 border-2 border-black">{project.lens}</span>
                        </div>
                      )}
                      {project.location && (
                        <div>
                          <span className="text-sm font-black text-black uppercase tracking-widest block mb-1">Location</span>
                          <span className="font-bold text-lg text-black bg-white inline-block px-3 py-1 border-2 border-black">{project.location}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link href="/contact" className="w-full border-brutalist bg-[#FF006E] text-white hover-brutalist font-black h-16 text-xl flex items-center justify-center uppercase shadow-brutalist transition-all">
              Like this? Let's talk <ExternalLink className="w-6 h-6 ml-3" strokeWidth={3} />
            </Link>
          </div>

          {/* Right Column: Images Feed */}
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Hero Image */}
            <motion.div 
              layoutId={`project-container-${project.id}`}
              className="w-full border-brutalist shadow-brutalist bg-white flex justify-center p-2"
            >
              <motion.div layoutId={`project-image-${project.id}`} className="w-full border-4 border-black">
                <img
                  src={project.cover_image_url || (project as any).cover_image?.url}
                  alt={project.title}
                  className="w-full h-auto block grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </motion.div>

            {/* Gallery Images */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <div className="flex flex-col gap-8 lg:gap-12">
                {project.gallery_images.map((img, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-white border-brutalist shadow-brutalist flex justify-center p-2"
                  >
                    <div className="w-full border-4 border-black relative group">
                      <div className="absolute top-4 left-4 bg-[#FFD23F] border-4 border-black px-4 py-1 font-black text-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                      <img
                        src={img.url}
                        alt={`${project.title} visual ${i+1}`}
                        className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}

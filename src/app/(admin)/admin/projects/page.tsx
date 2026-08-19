import { createClient } from "@/lib/supabase/server";
import { CreateProjectForm } from "./CreateProjectForm";
import Image from "next/image";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-12 max-w-6xl">
      <div className="bg-[#3A86FF] border-4 border-black p-8 shadow-brutalist relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-4 text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Projects</h1>
          <p className="text-black bg-[#FFD23F] inline-block px-4 py-2 border-brutalist font-bold shadow-brutalist-sm">
            Manage your portfolio works here.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* List of Projects */}
        <div className="xl:col-span-2 space-y-8">
          <h2 className="text-4xl font-black uppercase tracking-tight inline-block border-b-8 border-black pb-2">Published Works</h2>
          {error && <p className="text-white bg-red-500 font-bold p-4 border-4 border-black shadow-brutalist-sm">Error loading projects.</p>}
          {!projects || projects.length === 0 ? (
            <p className="p-8 border-4 border-black bg-white shadow-brutalist font-bold uppercase tracking-widest text-center text-zinc-500">No projects found. Add one from the form.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="border-4 border-black bg-white p-4 shadow-brutalist-sm hover-brutalist-sm flex flex-col group relative">
                  {project.cover_image_url && (
                    <div className="relative w-full aspect-[4/3] bg-[#06D6A0] mb-4 border-4 border-black overflow-hidden">
                      <Image 
                        src={project.cover_image_url} 
                        alt={project.title} 
                        fill 
                        className="object-cover"
                        unoptimized={true}
                      />
                    </div>
                  )}
                  <h3 className="font-black text-2xl uppercase tracking-tight mb-2">{project.title}</h3>
                  <p className="text-xs font-black bg-black text-white px-2 py-1 uppercase tracking-widest w-fit border-2 border-black mb-4">{project.type}</p>
                  
                  {/* Note: Delete logic would be implemented via a separate server action */}
                  <form className="mt-auto pt-4 border-t-4 border-black flex justify-end">
                    <button type="button" className="px-4 py-2 bg-[#FF006E] text-white font-black uppercase tracking-widest text-xs border-2 border-black hover-brutalist-sm">
                      Delete
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Project Form */}
        <div className="xl:col-span-1">
          <div className="sticky top-6 border-4 border-black p-6 bg-white shadow-brutalist">
            <h2 className="text-2xl font-black uppercase mb-6 bg-[#06D6A0] inline-block px-4 py-2 border-4 border-black shadow-[4px_4px_0_rgba(0,0,0,1)]">Add New Project</h2>
            <CreateProjectForm />
          </div>
        </div>
      </div>
    </div>
  );
}

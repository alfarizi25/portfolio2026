import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Works | Abdee Alfarizi",
  description: "Portfolio of design and photography work.",
};

export default async function WorkPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const safeProjects = projects || [];

  return (
    <div className="container mx-auto px-6 max-w-7xl pt-24 pb-20">
      <div className="mb-16 md:mb-20 bg-[#FF006E] border-brutalist shadow-brutalist p-8 md:p-12 relative overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 3px, transparent 3px)', backgroundSize: '24px 24px' }}></div>

        <div className="relative z-10">
          <div className="inline-block px-4 py-1.5 bg-white border-brutalist font-black text-sm tracking-widest uppercase mb-6 shadow-brutalist-sm">
            Index
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase leading-none drop-shadow-[8px_8px_0_rgba(0,0,0,1)]">
            Selected <br /> Works
          </h1>
          <p className="text-black bg-[#FFD23F] inline-block px-4 py-2 border-brutalist text-xl md:text-2xl font-bold shadow-brutalist-sm">
            A collection of graphic design and photography.
          </p>
        </div>
      </div>

      <GalleryGrid projects={safeProjects} />
    </div>
  );
}

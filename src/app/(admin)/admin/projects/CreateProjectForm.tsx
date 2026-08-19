"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

export function CreateProjectForm() {
  const [type, setType] = useState<"design" | "photography">("design");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const summary = formData.get("summary") as string;
    const file = formData.get("cover_image") as File;

    try {
      let cover_image_url = "";
      
      if (file && file.size > 0) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${slug}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('portfolio-media')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-media')
          .getPublicUrl(filePath);
          
        cover_image_url = publicUrl;
      }

      // Insert to DB
      const { error: dbError } = await supabase.from("projects").insert({
        title,
        slug,
        summary,
        type,
        cover_image_url,
        is_published: true, // Auto publish for now
        // Photography fields
        camera: type === "photography" ? formData.get("camera") : null,
        lens: type === "photography" ? formData.get("lens") : null,
        // Design fields
        role: type === "design" ? formData.get("role") : null,
      });

      if (dbError) throw dbError;

      alert("Project added successfully!");
      (e.target as HTMLFormElement).reset();
      // In a real app, we'd trigger a router.refresh() here.
      window.location.reload();
      
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-black uppercase tracking-widest text-black">Title</label>
        <Input name="title" required placeholder="Project Name" className="border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-black uppercase tracking-widest text-black">Type</label>
        <select 
          value={type} 
          onChange={(e) => setType(e.target.value as any)}
          className="flex h-12 w-full border-4 border-black bg-white px-3 py-2 text-sm shadow-brutalist-sm focus-visible:outline-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all font-bold"
        >
          <option value="design">Design</option>
          <option value="photography">Photography</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black uppercase tracking-widest text-black">Summary</label>
        <Textarea name="summary" className="min-h-[120px] border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all" placeholder="Short description..." />
      </div>

      {type === "photography" ? (
        <>
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest text-black">Camera</label>
            <Input name="camera" placeholder="e.g. Sony A7III" className="border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-widest text-black">Lens</label>
            <Input name="lens" placeholder="e.g. 35mm f/1.4" className="border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all" />
          </div>
        </>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-black uppercase tracking-widest text-black">Role</label>
          <Input name="role" placeholder="e.g. Lead Designer" className="border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all" />
        </div>
      )}

      <div className="space-y-2 pt-4">
        <label className="text-sm font-black uppercase tracking-widest text-black">Cover Image</label>
        <Input name="cover_image" type="file" accept="image/*" required className="pt-2 border-4 border-black rounded-none shadow-brutalist-sm focus-visible:ring-0 focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none transition-all file:bg-black file:text-white file:border-none file:px-4 file:py-1 file:font-bold file:mr-4 file:cursor-pointer" />
      </div>

      <button type="submit" className="w-full mt-8 bg-[#3A86FF] text-white font-black uppercase tracking-widest text-lg border-4 border-black py-4 shadow-brutalist hover-brutalist transition-all" disabled={isSubmitting}>
        {isSubmitting ? "Uploading..." : "Save Project"}
      </button>
    </form>
  );
}

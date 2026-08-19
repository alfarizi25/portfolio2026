export type ProjectType = "design" | "photography";

export interface ProjectImage {
  url: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  description?: string;
  type: ProjectType;
  
  // Design specific
  role?: string;
  tools?: string[];
  
  // Photography specific
  camera?: string;
  lens?: string;
  location?: string;
  shot_at?: string;
  
  // Media
  cover_image: ProjectImage;
  gallery_images: ProjectImage[];
  
  // Meta
  is_featured: boolean;
  sort_order: number;
}

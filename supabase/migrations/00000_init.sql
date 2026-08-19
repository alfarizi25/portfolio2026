-- ENUM for project types
CREATE TYPE project_type AS ENUM ('design', 'photography');

-- PROJECTS TABLE
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    summary TEXT,
    description TEXT,
    type project_type NOT NULL,
    
    -- Design specific fields
    role TEXT,
    tools TEXT[],
    
    -- Photography specific fields
    camera TEXT,
    lens TEXT,
    location TEXT,
    shot_at DATE,
    
    -- Images
    cover_image_url TEXT,
    gallery_image_urls JSONB DEFAULT '[]'::jsonb, -- Array of objects: { url, width, height }
    
    -- Status and ordering
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BLOG POSTS TABLE
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    cover_image_url TEXT,
    
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTACT MESSAGES TABLE
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SITE SETTINGS TABLE
CREATE TABLE site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES 
('about_text', 'Graphic designer & photographer'),
('cv_url', '');

-- RLS POLICIES

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 1. Projects
-- Anyone can read published projects
CREATE POLICY "Public can view published projects" ON projects
    FOR SELECT USING (is_published = true);

-- Admins can do everything (Authenticated users)
CREATE POLICY "Admins can manage projects" ON projects
    USING (auth.role() = 'authenticated');

-- 2. Blog Posts
-- Anyone can read published blog posts
CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (is_published = true);

-- Admins can manage blog posts
CREATE POLICY "Admins can manage blog posts" ON blog_posts
    USING (auth.role() = 'authenticated');

-- 3. Contact Messages
-- Anyone can insert messages (Rate limiting should be done via application logic)
CREATE POLICY "Public can insert contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

-- Only admins can read/manage messages
CREATE POLICY "Admins can view and manage contact messages" ON contact_messages
    USING (auth.role() = 'authenticated');

-- 4. Site Settings
-- Anyone can read site settings
CREATE POLICY "Public can view site settings" ON site_settings
    FOR SELECT USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site settings" ON site_settings
    USING (auth.role() = 'authenticated');

-- FUNCTION to automatically update updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_blog_posts_modtime
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_site_settings_modtime
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- Storage Bucket setup (Note: requires manual creation in dashboard if not using CLI fully)
-- Usually you'd insert into storage.buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-media', 'portfolio-media', true) ON CONFLICT DO NOTHING;

-- Storage RLS
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Admin Insert" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id = 'portfolio-media');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated' AND bucket_id = 'portfolio-media');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated' AND bucket_id = 'portfolio-media');

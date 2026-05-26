-- Supabase SQL Code to create the 'blogs' table
-- Formatted for direct execution in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Clinical', 'Marketing', 'Precision Operations')),
    "pubDate" TEXT NOT NULL DEFAULT to_char(CURRENT_TIMESTAMP, 'Month DD, YYYY'), -- CamelCase to match React state directly
    "readTime" TEXT NOT NULL,                                                     -- CamelCase to match React state directly
    summary TEXT NOT NULL,
    content TEXT[] NOT NULL,                                                      -- Array of paragraphs (text[])
    tags TEXT[] NOT NULL DEFAULT '{}'::TEXT[],                                    -- Array of tags (text[])
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Set up Access Policies (Row Level Security)
-- 1. Read access: Allow public read-only access to some or all entries
CREATE POLICY "Allow public read-only access" 
ON public.blogs 
FOR SELECT 
USING (true);

-- 2. Write access (Insert): Allow authenticated users only
CREATE POLICY "Allow authenticated inserts" 
ON public.blogs 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 3. Write access (Update): Allow authenticated users only
CREATE POLICY "Allow authenticated updates" 
ON public.blogs 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 4. Delete access: Allow authenticated users only
CREATE POLICY "Allow authenticated deletes" 
ON public.blogs 
FOR DELETE 
TO authenticated 
USING (true);

-- Automation trigger for handling 'updated_at' column updates
CREATE OR REPLACE FUNCTION public.set_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER update_blogs_timestamp
    BEFORE UPDATE ON public.blogs
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at_timestamp();

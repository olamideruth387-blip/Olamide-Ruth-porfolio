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

-- ====================================================================
-- Supabase SQL Code to create the 'portfolio_projects' table
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    category TEXT NOT NULL,
    story_date TEXT NOT NULL,
    challenge TEXT NOT NULL,
    strategy TEXT NOT NULL,
    impact TEXT NOT NULL,
    client TEXT NOT NULL,
    reading_time TEXT NOT NULL,
    stat_value TEXT NOT NULL,
    stat_name TEXT NOT NULL,
    image_traffic TEXT,
    image_channel TEXT,
    image_geo TEXT,
    image_pipeline TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on portfolio_projects
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Set up Access Policies (Row Level Security)
-- 1. Read access: Allow public read-only access to some or all entries
CREATE POLICY "Allow public read-only access on portfolio" 
ON public.portfolio_projects 
FOR SELECT 
USING (true);

-- 2. Write access (Insert): Allow authenticated users only
CREATE POLICY "Allow authenticated inserts on portfolio" 
ON public.portfolio_projects 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 3. Write access (Update): Allow authenticated users only
CREATE POLICY "Allow authenticated updates on portfolio" 
ON public.portfolio_projects 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 4. Delete access: Allow authenticated users only
CREATE POLICY "Allow authenticated deletes on portfolio" 
ON public.portfolio_projects 
FOR DELETE 
TO authenticated 
USING (true);

-- Automation trigger for handling 'updated_at' column updates
CREATE OR REPLACE TRIGGER update_portfolio_timestamp
    BEFORE UPDATE ON public.portfolio_projects
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at_timestamp();

-- Enable Supabase Realtime for the 'portfolio_projects' table
ALTER PUBLICATION supabase_realtime ADD TABLE public.portfolio_projects;

-- Seed initial portfolio record so the table isn't blank
INSERT INTO public.portfolio_projects (
    title, excerpt, category, story_date, challenge, strategy, impact, client, reading_time, stat_value, stat_name
) VALUES (
    'The B2B Engineering Pipeline: Converting Technical Audiences for a Core AI Infrastructure Tool',
    'How we navigated long enterprise consideration cycles to transform an initial Q3 2024 viral spike into a highly stabilized, premium global developer footprint.',
    'Technical B2B & Developer Relations (DevRel)',
    'May 2024 – April 2026',
    'Marketing kusho.ai (an AI agent for API testing and developer infrastructure) meant targeting an exceptionally defensive, technical audience: QA leads, software architects, and CTOs. In late 2024, the market was flooded with superficial AI tooling, making engineering teams highly resistant to marketing fluff. Furthermore, B2B infrastructure products suffer from long, multi-month deliberation cycles; a simple click rarely translates to immediate integration, threatening to flatten the product''s long-term traffic baseline after initial launch visibility faded.',
    'We abandoned mass-consumer social media playbooks and executed a strict technical Developer Relations (DevRel) and targeted placement strategy. During our major launch window in late Q3 2024, we heavily seeded deep-dive technical case studies, API testing benchmarks, and live open-source integration documentation directly onto platforms like Hacker News, GitHub trending forums, and niche software architecture newsletters. Instead of chasing short viral clips, we focused our positioning on reliability, security, and developer workflow integration, deliberately filtering for technical intent and ensuring our brand equity stayed anchored in global software hubs.',
    'The targeted execution yielded a highly deliberate, sustainable traffic structure. As mapped across the Traffic Trend and Year-over-Year charts, our late 2024 launch triggered a powerful initialization surge, peaking at tens of thousands of monthly visits before settling into an incredibly stable, non-decaying baseline throughout 2025 and 2026. The Traffic Channel Distribution chart highlights a healthy, mature B2B distribution split dominated by Organic Search and Direct type-ins. Our Geo Distribution data shows absolute dominance in top-tier engineering economies, with India securing 43.15% and the United States commanding 25.13% of all worldwide visits—locking in a premium, highly conversion-ready pipeline of software enterprise teams.',
    'kusho.ai',
    '4 minutes',
    '68.28%',
    'Combined US and India Traffic Share Dominance'
) ON CONFLICT DO NOTHING;

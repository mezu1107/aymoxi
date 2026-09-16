-- Founder note
CREATE TABLE public.founder_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_title text,
  photo_url text,
  signature_name text,
  heading text NOT NULL DEFAULT 'A note from our founder',
  body text NOT NULL,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.founder_notes TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.founder_notes TO authenticated;
GRANT ALL ON public.founder_notes TO service_role;
ALTER TABLE public.founder_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "founder_notes public read" ON public.founder_notes FOR SELECT USING (published = true);
CREATE POLICY "founder_notes admin all" ON public.founder_notes FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER founder_notes_updated_at BEFORE UPDATE ON public.founder_notes FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Guarantees / process transparency
CREATE TABLE public.guarantees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text NOT NULL DEFAULT 'shield-check',
  detail text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guarantees TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.guarantees TO authenticated;
GRANT ALL ON public.guarantees TO service_role;
ALTER TABLE public.guarantees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "guarantees public read" ON public.guarantees FOR SELECT USING (published = true);
CREATE POLICY "guarantees admin all" ON public.guarantees FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER guarantees_updated_at BEFORE UPDATE ON public.guarantees FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Review wall (photo / video)
CREATE TABLE public.review_wall (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role_title text,
  company text,
  quote text NOT NULL,
  media_type text NOT NULL DEFAULT 'photo',
  photo_url text,
  video_url text,
  rating integer NOT NULL DEFAULT 5,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT review_wall_media_type_check CHECK (media_type IN ('photo','video'))
);
GRANT SELECT ON public.review_wall TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.review_wall TO authenticated;
GRANT ALL ON public.review_wall TO service_role;
ALTER TABLE public.review_wall ENABLE ROW LEVEL SECURITY;
CREATE POLICY "review_wall public read" ON public.review_wall FOR SELECT USING (published = true);
CREATE POLICY "review_wall admin all" ON public.review_wall FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER review_wall_updated_at BEFORE UPDATE ON public.review_wall FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Before / after sliders
CREATE TABLE public.before_after (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  client text,
  category text,
  before_url text,
  after_url text,
  metric_label text,
  metric_value text,
  summary text,
  link_url text,
  published boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.before_after TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.before_after TO authenticated;
GRANT ALL ON public.before_after TO service_role;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
CREATE POLICY "before_after public read" ON public.before_after FOR SELECT USING (published = true);
CREATE POLICY "before_after admin all" ON public.before_after FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER before_after_updated_at BEFORE UPDATE ON public.before_after FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Live team availability (additive columns)
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS availability text NOT NULL DEFAULT 'available';
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS response_time text;
ALTER TABLE public.team_members ADD COLUMN IF NOT EXISTS work_hours text;
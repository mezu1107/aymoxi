ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS member_type text NOT NULL DEFAULT 'team';

ALTER TABLE public.team_members DROP CONSTRAINT IF EXISTS team_members_member_type_check;
ALTER TABLE public.team_members
  ADD CONSTRAINT team_members_member_type_check CHECK (member_type IN ('director','team'));

UPDATE public.team_members SET member_type = 'director'
WHERE slug IN ('shafqat-rasool','moez-rehman');

GRANT SELECT (member_type) ON public.team_members TO anon;

INSERT INTO public.about_blocks (section_key, layout, eyebrow, title, body, items, sort_order, published)
VALUES
('story','text','Our Story','Built by engineers, driven by outcomes.',
 'AYMOXI started as a small team of engineers and designers helping local businesses get online. Today we build software, mobile apps, AI automation, ERP and ecommerce platforms for clients across the US, UK, Middle East and Pakistan.

We stay deliberately senior-led: the people who scope your project are the people who ship it. That keeps quality high, communication direct and delivery predictable.',
 ARRAY[]::text[], 1, true),
('mission','split','Mission','Our Mission',
 'To give ambitious businesses the same technology advantage that large enterprises enjoy — modern products, clean engineering and measurable growth, delivered without enterprise overhead.',
 ARRAY[]::text[], 2, true),
('vision','split','Vision','Our Vision',
 'To become the long-term technology partner behind hundreds of growing brands, known for craftsmanship, transparency and results that outlive the project.',
 ARRAY[]::text[], 3, true),
('values','cards','Philosophy','What we stand for',
 'Four principles guide every engagement we take on.',
 ARRAY[
   'Craftsmanship — We ship clean, maintainable code and interfaces people actually enjoy using.',
   'Transparency — Clear scope, clear pricing, milestone-based delivery and no surprise invoices.',
   'Ownership — We treat your product roadmap as our own and flag risks before they cost money.',
   'Partnership — Support does not stop at launch; we stay on for iteration and growth.'
 ], 4, true),
('capabilities','list','Capabilities','What we build',
 NULL,
 ARRAY['Web platforms','Mobile apps','AI automation','ERP & CRM','Ecommerce','UI/UX design','SEO & growth','Cloud & DevOps'], 5, true);

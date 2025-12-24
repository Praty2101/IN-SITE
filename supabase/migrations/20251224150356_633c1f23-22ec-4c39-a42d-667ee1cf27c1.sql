-- Fix RLS policies for customer tables BC, JC, GB, MB
-- These should require authentication for all access

-- Enable RLS on ghosh table (currently has no RLS)
ALTER TABLE public.ghosh ENABLE ROW LEVEL SECURITY;

-- BC table - Add authenticated-only policies
CREATE POLICY "Authenticated users can read BC" ON public."BC"
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert BC" ON public."BC"
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update BC" ON public."BC"
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete BC" ON public."BC"
FOR DELETE TO authenticated
USING (true);

-- JC table - Add authenticated-only policies
CREATE POLICY "Authenticated users can read JC" ON public."JC"
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert JC" ON public."JC"
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update JC" ON public."JC"
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete JC" ON public."JC"
FOR DELETE TO authenticated
USING (true);

-- GB table - Add authenticated-only policies
CREATE POLICY "Authenticated users can read GB" ON public."GB"
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert GB" ON public."GB"
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update GB" ON public."GB"
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete GB" ON public."GB"
FOR DELETE TO authenticated
USING (true);

-- MB table - Add authenticated-only policies
CREATE POLICY "Authenticated users can read MB" ON public."MB"
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert MB" ON public."MB"
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update MB" ON public."MB"
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete MB" ON public."MB"
FOR DELETE TO authenticated
USING (true);

-- ghosh table - Add authenticated-only policies
CREATE POLICY "Authenticated users can read ghosh" ON public.ghosh
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert ghosh" ON public.ghosh
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update ghosh" ON public.ghosh
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete ghosh" ON public.ghosh
FOR DELETE TO authenticated
USING (true);

-- Fix recharges table - Replace overly permissive policy with authenticated-only
DROP POLICY IF EXISTS "Public access to recharges" ON public.recharges;

CREATE POLICY "Authenticated users can read recharges" ON public.recharges
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert recharges" ON public.recharges
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update recharges" ON public.recharges
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete recharges" ON public.recharges
FOR DELETE TO authenticated
USING (true);

-- Fix catalog tables - Make them read-only for public, writable for authenticated users

-- siti_packs
DROP POLICY IF EXISTS "Public access to SITI packs" ON public.siti_packs;

CREATE POLICY "Anyone can read SITI packs" ON public.siti_packs
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can modify SITI packs" ON public.siti_packs
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update SITI packs" ON public.siti_packs
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete SITI packs" ON public.siti_packs
FOR DELETE TO authenticated
USING (true);

-- alliance_plans
DROP POLICY IF EXISTS "Public access to Alliance plans" ON public.alliance_plans;

CREATE POLICY "Anyone can read Alliance plans" ON public.alliance_plans
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can modify Alliance plans" ON public.alliance_plans
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update Alliance plans" ON public.alliance_plans
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete Alliance plans" ON public.alliance_plans
FOR DELETE TO authenticated
USING (true);

-- gtpl_tv_packs
DROP POLICY IF EXISTS "Public access to GTPL TV packs" ON public.gtpl_tv_packs;

CREATE POLICY "Anyone can read GTPL TV packs" ON public.gtpl_tv_packs
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can modify GTPL TV packs" ON public.gtpl_tv_packs
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update GTPL TV packs" ON public.gtpl_tv_packs
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete GTPL TV packs" ON public.gtpl_tv_packs
FOR DELETE TO authenticated
USING (true);

-- gtpl_broadband_plans
DROP POLICY IF EXISTS "Public access to GTPL broadband plans" ON public.gtpl_broadband_plans;

CREATE POLICY "Anyone can read GTPL broadband plans" ON public.gtpl_broadband_plans
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can modify GTPL broadband plans" ON public.gtpl_broadband_plans
FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update GTPL broadband plans" ON public.gtpl_broadband_plans
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete GTPL broadband plans" ON public.gtpl_broadband_plans
FOR DELETE TO authenticated
USING (true);
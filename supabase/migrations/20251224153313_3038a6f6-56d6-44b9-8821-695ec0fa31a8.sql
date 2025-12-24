-- Step 1: Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Step 2: Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create security definer function to check roles (avoids recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 4: Create RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Step 5: Drop old permissive policies and create role-based ones for customer tables

-- BC Table
DROP POLICY IF EXISTS "Authenticated users can read BC" ON public."BC";
DROP POLICY IF EXISTS "Authenticated users can insert BC" ON public."BC";
DROP POLICY IF EXISTS "Authenticated users can update BC" ON public."BC";
DROP POLICY IF EXISTS "Authenticated users can delete BC" ON public."BC";

CREATE POLICY "Admins can read BC" ON public."BC"
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert BC" ON public."BC"
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update BC" ON public."BC"
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete BC" ON public."BC"
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- JC Table
DROP POLICY IF EXISTS "Authenticated users can read JC" ON public."JC";
DROP POLICY IF EXISTS "Authenticated users can insert JC" ON public."JC";
DROP POLICY IF EXISTS "Authenticated users can update JC" ON public."JC";
DROP POLICY IF EXISTS "Authenticated users can delete JC" ON public."JC";

CREATE POLICY "Admins can read JC" ON public."JC"
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert JC" ON public."JC"
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update JC" ON public."JC"
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete JC" ON public."JC"
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- GB Table
DROP POLICY IF EXISTS "Authenticated users can read GB" ON public."GB";
DROP POLICY IF EXISTS "Authenticated users can insert GB" ON public."GB";
DROP POLICY IF EXISTS "Authenticated users can update GB" ON public."GB";
DROP POLICY IF EXISTS "Authenticated users can delete GB" ON public."GB";

CREATE POLICY "Admins can read GB" ON public."GB"
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert GB" ON public."GB"
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update GB" ON public."GB"
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete GB" ON public."GB"
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- MB Table
DROP POLICY IF EXISTS "Authenticated users can read MB" ON public."MB";
DROP POLICY IF EXISTS "Authenticated users can insert MB" ON public."MB";
DROP POLICY IF EXISTS "Authenticated users can update MB" ON public."MB";
DROP POLICY IF EXISTS "Authenticated users can delete MB" ON public."MB";

CREATE POLICY "Admins can read MB" ON public."MB"
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert MB" ON public."MB"
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update MB" ON public."MB"
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete MB" ON public."MB"
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ghosh Table
DROP POLICY IF EXISTS "Authenticated users can read ghosh" ON public.ghosh;
DROP POLICY IF EXISTS "Authenticated users can insert ghosh" ON public.ghosh;
DROP POLICY IF EXISTS "Authenticated users can update ghosh" ON public.ghosh;
DROP POLICY IF EXISTS "Authenticated users can delete ghosh" ON public.ghosh;

CREATE POLICY "Admins can read ghosh" ON public.ghosh
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert ghosh" ON public.ghosh
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update ghosh" ON public.ghosh
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete ghosh" ON public.ghosh
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- recharges Table
DROP POLICY IF EXISTS "Authenticated users can read recharges" ON public.recharges;
DROP POLICY IF EXISTS "Authenticated users can insert recharges" ON public.recharges;
DROP POLICY IF EXISTS "Authenticated users can update recharges" ON public.recharges;
DROP POLICY IF EXISTS "Authenticated users can delete recharges" ON public.recharges;

CREATE POLICY "Admins can read recharges" ON public.recharges
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert recharges" ON public.recharges
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update recharges" ON public.recharges
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete recharges" ON public.recharges
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
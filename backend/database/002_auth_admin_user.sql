-- BLUENEEDLE Auth Upgrade + Initial Admin User
-- Run this in Supabase -> SQL Editor

-- 1. Ensure role column exists and B2B defaults work smoothly
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user';

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users
  ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));

ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_account_type_check;

ALTER TABLE public.users
  ADD CONSTRAINT users_account_type_check CHECK (
    account_type IN ('b2b', 'hospital', 'distributor', 'oem')
  );

ALTER TABLE public.users
  ALTER COLUMN account_type SET DEFAULT 'b2b',
  ALTER COLUMN professional_role SET DEFAULT 'B2B Buyer',
  ALTER COLUMN organization_name SET DEFAULT 'BLUENEEDLE B2B Client',
  ALTER COLUMN export_jurisdiction SET DEFAULT 'International',
  ALTER COLUMN authority_attested SET DEFAULT TRUE,
  ALTER COLUMN verification_status SET DEFAULT 'verified';

-- 2. Create / Update initial Admin user (admin123@gmail.com / Admin123@)
-- Password hashed using Node crypto.scrypt with random 16-byte salt
INSERT INTO public.users (
  role,
  account_type,
  full_name,
  professional_role,
  organization_name,
  export_jurisdiction,
  email,
  password_hash,
  authority_attested,
  metallurgy_updates_opt_in,
  verification_status,
  is_active
)
VALUES (
  'admin',
  'b2b',
  'BLUENEEDLE Admin',
  'Operations Administrator',
  'BLUENEEDLE Surgical',
  'International',
  'admin123@gmail.com',
  'scrypt$14014d7cc4c5716204ad661ecb99eff8$d3aaa4408b751220a3f1093f3620dd11d34e3003108c51b2882fe90c86b7e6af1eb169ad78ce04c0eaebabbc96dba6d972dda79e04d7617ca5be9c9fa6bb5577',
  TRUE,
  TRUE,
  'verified',
  TRUE
)
ON CONFLICT (email) DO UPDATE SET
  role = EXCLUDED.role,
  password_hash = EXCLUDED.password_hash,
  verification_status = 'verified',
  is_active = TRUE,
  updated_at = NOW();

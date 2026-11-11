-- BLUENEEDLE Surgical Manufacturer Portal
-- Improved 9-Table PostgreSQL Schema for Supabase
-- Run this in Supabase -> SQL Editor

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Shared trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================================================
-- 1. CATEGORIES (Home Specializations & Sidebar Filters)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  patterns_label TEXT,
  description TEXT,
  image_url TEXT,
  image_alt TEXT,
  is_featured_home BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 2. MATERIALS (Stainless Steel, TC, Titanium Grades)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  din_code TEXT NOT NULL,
  aisi_code TEXT,
  hrc_range TEXT NOT NULL,
  composition_summary TEXT,
  composition_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 3. PRODUCTS (Master Instrument Patterns)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID NOT NULL REFERENCES public.materials(id) ON DELETE RESTRICT,
  has_tc_insert BOOLEAN NOT NULL DEFAULT FALSE,
  sku TEXT NOT NULL UNIQUE,
  ref_code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  discipline TEXT NOT NULL,
  finish TEXT NOT NULL CHECK (
    finish IN ('Satin / Matte Anti-Glare', 'Mirror Polish', 'Ceramic Black Coated')
  ),
  tip_config TEXT NOT NULL CHECK (
    tip_config IN ('Straight', 'Curved', 'Angled', 'Delicate', 'Heavy / Atraumatic')
  ),
  length_label TEXT NOT NULL,
  base_length_mm INT NOT NULL CHECK (base_length_mm > 0),
  hrc INT NOT NULL CHECK (hrc > 0),
  standard_code TEXT NOT NULL DEFAULT 'DIN EN ISO 7153-1',
  badge_label TEXT,
  badge_highlight BOOLEAN NOT NULL DEFAULT FALSE,
  short_description TEXT NOT NULL,
  full_description TEXT,
  specs_list_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  spec_matrix_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  engineering_tabs_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  cad_step_url TEXT,
  spec_sheet_pdf_url TEXT,
  stock_status TEXT NOT NULL DEFAULT 'EXPORT READY',
  moq_units INT NOT NULL DEFAULT 25,
  is_featured_home BOOLEAN NOT NULL DEFAULT FALSE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 4. PRODUCT_CATEGORIES (Many-to-Many Tags)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.product_categories (
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, category_id)
);

-- =========================================================
-- 5. PRODUCT_SIZES (Lengths & Blade Profiles Configurator)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_ref TEXT NOT NULL UNIQUE,
  size_label TEXT NOT NULL,
  display_label TEXT NOT NULL,
  length_mm INT NOT NULL CHECK (length_mm > 0),
  available_profiles TEXT NOT NULL DEFAULT 'both' CHECK (
    available_profiles IN ('straight', 'curved', 'both')
  ),
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, length_mm)
);

-- =========================================================
-- 6. PRODUCT_IMAGES (Hero Image + Specimen Views)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  view_label TEXT,
  view_sublabel TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 7. USERS (Login + Create Account + Organization Info)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  account_type TEXT NOT NULL DEFAULT 'b2b' CHECK (
    account_type IN ('b2b', 'hospital', 'distributor', 'oem')
  ),
  full_name TEXT NOT NULL,
  professional_role TEXT NOT NULL DEFAULT 'B2B Buyer',
  organization_name TEXT NOT NULL DEFAULT 'BLUENEEDLE B2B Client',
  export_jurisdiction TEXT NOT NULL DEFAULT 'International',
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  authority_attested BOOLEAN NOT NULL DEFAULT TRUE,
  metallurgy_updates_opt_in BOOLEAN NOT NULL DEFAULT TRUE,
  verification_status TEXT NOT NULL DEFAULT 'verified' CHECK (
    verification_status IN ('pending', 'verified', 'rejected')
  ),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 8. PASSWORD_RESETS (15-Minute Recovery Tokens)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- 9. RFQ_INQUIRIES (Quotes & Multi-Item Manifest Requests)
-- =========================================================
CREATE TABLE IF NOT EXISTS public.rfq_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  target_item TEXT NOT NULL,
  manifest_items_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  entity_name TEXT NOT NULL,
  procurement_email TEXT NOT NULL,
  desired_quantity INT NOT NULL DEFAULT 100 CHECK (desired_quantity >= 1),
  target_port TEXT,
  oem_laser_marking TEXT NOT NULL DEFAULT 'BLUENEEDLE Standard',
  technical_notes TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN ('new', 'reviewing', 'quoted', 'closed')
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =========================================================
-- INDEXES (Fast Filtering, Sorting & Auth Lookups)
-- =========================================================
CREATE INDEX IF NOT EXISTS idx_products_active_sort
  ON public.products (is_active, title, hrc, base_length_mm);

CREATE INDEX IF NOT EXISTS idx_products_filters
  ON public.products (material_id, finish, tip_config, has_tc_insert);

CREATE INDEX IF NOT EXISTS idx_product_categories_cat
  ON public.product_categories (category_id, product_id);

CREATE INDEX IF NOT EXISTS idx_product_sizes_product
  ON public.product_sizes (product_id, sort_order);

CREATE INDEX IF NOT EXISTS idx_product_images_product
  ON public.product_images (product_id, is_primary, sort_order);

CREATE INDEX IF NOT EXISTS idx_users_email
  ON public.users (LOWER(email));

CREATE INDEX IF NOT EXISTS idx_password_resets_lookup
  ON public.password_resets (token_hash, expires_at);

CREATE INDEX IF NOT EXISTS idx_rfq_inquiries_status
  ON public.rfq_inquiries (status, created_at DESC);

-- =========================================================
-- TRIGGERS (updated_at)
-- =========================================================
DROP TRIGGER IF EXISTS trg_categories_updated_at ON public.categories;
CREATE TRIGGER trg_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_materials_updated_at ON public.materials;
CREATE TRIGGER trg_materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_rfq_inquiries_updated_at ON public.rfq_inquiries;
CREATE TRIGGER trg_rfq_inquiries_updated_at
  BEFORE UPDATE ON public.rfq_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================================================
-- ROW LEVEL SECURITY (Supabase Security Best Practice)
-- Express backend uses SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
-- Private tables stay locked from public anon clients.
-- =========================================================
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_resets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read categories" ON public.categories;
CREATE POLICY "Public read categories" ON public.categories
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public read materials" ON public.materials;
CREATE POLICY "Public read materials" ON public.materials
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public read active products" ON public.products;
CREATE POLICY "Public read active products" ON public.products
  FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public read product_categories" ON public.product_categories;
CREATE POLICY "Public read product_categories" ON public.product_categories
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public read product_sizes" ON public.product_sizes;
CREATE POLICY "Public read product_sizes" ON public.product_sizes
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Public read product_images" ON public.product_images;
CREATE POLICY "Public read product_images" ON public.product_images
  FOR SELECT USING (TRUE);

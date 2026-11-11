import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getSupabaseClient } from './config/supabase.js';

const app = express();

function buildCorsOriginOption() {
  const raw = process.env.FRONTEND_URL;
  if (!raw || raw.trim() === '*') return '*';

  const allowedOrigins = raw
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  return (origin, callback) => {
    if (!origin) return callback(null, true);
    const normalized = origin.replace(/\/+$/, '');
    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  };
}

app.use(helmet());
app.use(
  cors({
    origin: buildCorsOriginOption(),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '1mb' }));

// Root service info (useful when opening the Vercel backend URL directly)
app.get(['/', '/api'], (_req, res) => {
  res.json({
    service: 'BLUENEEDLE Surgical API',
    status: 'ok',
    endpoints: [
      '/api/health',
      '/api/categories',
      '/api/materials',
      '/api/products',
      '/api/rfq',
    ],
  });
});

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('categories').select('id').limit(1);
    if (error) throw error;
    res.json({ status: 'ok', database: 'supabase-connected' });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err instanceof Error ? err.message : 'Database connection error',
    });
  }
});

// List categories (with optional featured filter)
app.get('/api/categories', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    let query = supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (req.query.featured === 'true') {
      query = query.eq('is_featured_home', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    res.json({ categories: data });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load categories' });
  }
});

// List stainless steel / alloy materials
app.get('/api/materials', async (_req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('materials')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    res.json({ materials: data });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load materials' });
  }
});

// List active products with material, sizes, images, and categories
app.get('/api/products', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { finish, tip, search, featured } = req.query;

    let query = supabase
      .from('products')
      .select(
        `
        *,
        material:materials(id, name, din_code, aisi_code, hrc_range),
        sizes:product_sizes(*),
        images:product_images(*),
        categories:product_categories(category:categories(id, slug, name))
      `
      )
      .eq('is_active', true);

    if (finish) query = query.eq('finish', String(finish));
    if (tip) query = query.eq('tip_config', String(tip));
    if (featured === 'true') query = query.eq('is_featured_home', true);
    if (search) {
      const q = String(search).trim();
      query = query.or(
        `title.ilike.%${q}%,ref_code.ilike.%${q}%,sku.ilike.%${q}%,discipline.ilike.%${q}%`
      );
    }

    const { data, error } = await query.order('title', { ascending: true });
    if (error) throw error;
    res.json({ products: data });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load products' });
  }
});

// Single product detail by SKU or Ref Code
app.get('/api/products/:code', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const code = req.params.code;

    const { data, error } = await supabase
      .from('products')
      .select(
        `
        *,
        material:materials(*),
        sizes:product_sizes(*),
        images:product_images(*),
        categories:product_categories(category:categories(id, slug, name))
      `
      )
      .or(`sku.eq.${code},ref_code.eq.${code}`)
      .eq('is_active', true)
      .maybeSingle();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Instrument pattern not found' });
    }
    return res.json({ product: data });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load product' });
  }
});

// Submit RFQ inquiry / manifest
app.post('/api/rfq', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const {
      target_item,
      manifest_items_json = [],
      entity_name,
      procurement_email,
      desired_quantity = 100,
      target_port = '',
      oem_laser_marking = 'BLUENEEDLE Standard',
      technical_notes = '',
    } = req.body || {};

    if (!entity_name || !procurement_email || !target_item) {
      return res.status(400).json({
        error: 'entity_name, procurement_email, and target_item are required.',
      });
    }

    const { data, error } = await supabase
      .from('rfq_inquiries')
      .insert([
        {
          target_item,
          manifest_items_json,
          entity_name,
          procurement_email,
          desired_quantity: Number(desired_quantity) || 100,
          target_port,
          oem_laser_marking,
          technical_notes,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return res.status(201).json({ inquiry: data });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to submit RFQ' });
  }
});

// Admin: Create master instrument pattern (with optional sizes, images, and categories)
app.post('/api/products', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const {
      sku,
      ref_code,
      title,
      discipline,
      material_id,
      has_tc_insert = false,
      finish = 'Satin / Matte Anti-Glare',
      tip_config = 'Curved',
      length_label,
      base_length_mm,
      hrc = 48,
      standard_code = 'DIN EN ISO 7153-1',
      badge_label = null,
      badge_highlight = false,
      short_description,
      full_description = null,
      stock_status = 'EXPORT READY',
      moq_units = 25,
      is_featured_home = false,
      sizes = [],
      images = [],
      category_ids = [],
    } = req.body || {};

    if (!sku || !ref_code || !title || !discipline || !material_id || !length_label || !base_length_mm || !short_description) {
      return res.status(400).json({
        error: 'sku, ref_code, title, discipline, material_id, length_label, base_length_mm, and short_description are required',
      });
    }

    const { data: product, error: productError } = await supabase
      .from('products')
      .insert([
        {
          sku,
          ref_code,
          title,
          discipline,
          material_id,
          has_tc_insert: Boolean(has_tc_insert),
          finish,
          tip_config,
          length_label,
          base_length_mm: Number(base_length_mm),
          hrc: Number(hrc),
          standard_code,
          badge_label,
          badge_highlight: Boolean(badge_highlight),
          short_description,
          full_description,
          stock_status,
          moq_units: Number(moq_units) || 25,
          is_featured_home: Boolean(is_featured_home),
        },
      ])
      .select()
      .single();

    if (productError) throw productError;

    if (Array.isArray(sizes) && sizes.length > 0) {
      const sizeRows = sizes.map((s, idx) => ({
        product_id: product.id,
        variant_ref: s.variant_ref,
        size_label: s.size_label,
        display_label: s.display_label || s.size_label,
        length_mm: Number(s.length_mm),
        available_profiles: s.available_profiles || 'both',
        is_default: Boolean(s.is_default ?? idx === 0),
        sort_order: s.sort_order ?? idx,
      }));
      const { error: sizesError } = await supabase.from('product_sizes').insert(sizeRows);
      if (sizesError) throw sizesError;
    }

    if (Array.isArray(images) && images.length > 0) {
      const imageRows = images.map((img, idx) => ({
        product_id: product.id,
        image_url: img.image_url,
        alt_text: img.alt_text || title,
        view_label: img.view_label || null,
        view_sublabel: img.view_sublabel || null,
        is_primary: Boolean(img.is_primary ?? idx === 0),
        sort_order: img.sort_order ?? idx,
      }));
      const { error: imagesError } = await supabase.from('product_images').insert(imageRows);
      if (imagesError) throw imagesError;
    }

    if (Array.isArray(category_ids) && category_ids.length > 0) {
      const categoryRows = category_ids.map((categoryId) => ({
        product_id: product.id,
        category_id: categoryId,
      }));
      const { error: categoriesError } = await supabase.from('product_categories').insert(categoryRows);
      if (categoriesError) throw categoriesError;
    }

    return res.status(201).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to create product' });
  }
});

// Admin: List RFQ inquiries (optional status filter)
app.get('/api/rfq', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    let query = supabase
      .from('rfq_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (req.query.status) {
      query = query.eq('status', String(req.query.status));
    }

    const { data, error } = await query;
    if (error) throw error;
    return res.json({ inquiries: data });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load RFQs' });
  }
});

// Admin: Update RFQ inquiry status
app.patch('/api/rfq/:id', async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { status } = req.body || {};
    const allowedStatuses = ['new', 'reviewing', 'quoted', 'closed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of: ${allowedStatuses.join(', ')}` });
    }

    const { data, error } = await supabase
      .from('rfq_inquiries')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'RFQ inquiry not found' });
      }
      throw error;
    }

    return res.json({ inquiry: data });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to update RFQ status' });
  }
});

export default app;

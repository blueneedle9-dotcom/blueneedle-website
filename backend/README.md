# BLUENEEDLE Backend (Express.js + Supabase + Vercel)

## 1. Setup Supabase Schema (No Dummy Seed)
1. Create a project on [Supabase](https://supabase.com).
2. Open **SQL Editor** in your Supabase Dashboard.
3. Run `database/001_schema.sql` to create the 9 tables (`categories`, `materials`, `products`, `product_categories`, `product_sizes`, `product_images`, `users`, `password_resets`, `rfq_inquiries`), indexes, triggers, and RLS policies.
4. Insert your real production categories, materials, products, sizes, and images via the Admin Portal (`/admin/patterns`) or Supabase Table Editor.

## 2. Run Locally
```bash
cd backend
npm install
cp .env.example .env
# Fill in SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env
npm run dev
```

## 3. Deploy on Vercel
1. Create a Vercel project with **Root Directory** set to `backend`.
2. Add Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `FRONTEND_URL` (your deployed frontend Vercel URL)
3. Deploy — `vercel.json` routes all incoming API requests to `api/index.js`.

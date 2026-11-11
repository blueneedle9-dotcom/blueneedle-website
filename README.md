# BLUENEEDLE Surgical Manufacturer Portal

Monorepo structured for independent Vercel deployment of both Frontend (React + Vite) and Backend (Express.js + Supabase PostgreSQL).

```text
├── frontend/                  # Vite + React + TypeScript + Tailwind CSS v3
│   ├── src/
│   │   ├── components/        # Header, Footer, RfqModal, AdminLayout
│   │   ├── data/              # Catalog structures
│   │   ├── lib/api.ts         # Backend API client (uses VITE_API_URL)
│   │   └── pages/             # Public pages + src/pages/admin/* (4 Admin screens)
│   ├── vercel.json            # SPA fallback rewrites for React Router
│   └── package.json
└── backend/                   # Express.js Serverless API + Supabase
    ├── api/index.js           # Vercel Serverless entry
    ├── database/
    │   └── 001_schema.sql     # 9-table Supabase PostgreSQL schema (no dummy seed)
    ├── src/
    │   ├── config/supabase.js # Stateless Supabase admin client
    │   └── app.js             # Express API routes
    ├── vercel.json            # Express routing config
    └── package.json
```

## Deploying to Vercel (2 Projects from 1 Repo)

### Step 1: Deploy Backend (`backend/`) First
1. Push this repo to GitHub (or deploy via Vercel CLI).
2. In Vercel Dashboard, click **Add New -> Project** and import your repository.
3. Set **Root Directory** to `backend`.
4. Leave **Framework Preset** as `Other`.
5. Add Environment Variables:
   - `SUPABASE_URL` = your Supabase Project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = your Supabase `service_role` key
   - `FRONTEND_URL` = `*` temporarily (update to your Frontend Vercel URL after Step 2)
6. Deploy and verify `https://<your-backend>.vercel.app/api/health` returns `{"status":"ok","database":"supabase-connected"}`.

### Step 2: Deploy Frontend (`frontend/`)
1. In Vercel Dashboard, click **Add New -> Project** and import the same repository again.
2. Set **Root Directory** to `frontend`.
3. **Framework Preset:** `Vite` (`npm run build` -> `dist`).
4. Add Environment Variable:
   - `VITE_API_URL` = `https://<your-backend>.vercel.app` (no trailing slash)
5. Deploy!
6. Go back to the **Backend** Vercel project -> **Settings -> Environment Variables**, update `FRONTEND_URL` to your deployed frontend URL (comma-separated if multiple domains, e.g. `https://blueneedle.vercel.app,http://localhost:5173`), and trigger a **Redeploy**.

### Optional: Deploy via Vercel CLI
```bash
# Backend
cd backend
npx vercel --prod

# Frontend
cd ../frontend
npx vercel --prod
```

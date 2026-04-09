# RC Patel Interior Website

## Overview

Full-stack website for RC Patel Interior — a professional interior design studio based in Gujarat, India.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React 19 + Vite + Tailwind CSS + framer-motion
- **File uploads**: Replit Object Storage (GCS) via presigned URLs + Uppy

## Artifacts

- `artifacts/rc-patel-interior` — Main website (React + Vite, served at `/`)
- `artifacts/api-server` — Express REST API (served at `/api`)

## Features

### Public Website (`/`)
- Full-page landing with hero, about, services, portfolio, testimonials, process, contact sections
- AI-generated interior design images
- Enquiry form with image upload (floor plans / mood boards, up to 3 files)
- WhatsApp FAB + call button

### Admin Dashboard (`/admin`)
- Password protected with admin key
- View all submitted enquiries (name, phone, project type, status, images)
- Update enquiry status: new → contacted → in_progress → completed → closed
- Admin key: `rcpatel-admin-2025` (set via ADMIN_KEY env var to override)

### API Endpoints
- `POST /api/enquiries` — submit new enquiry
- `GET /api/enquiries?adminKey=xxx` — list all enquiries
- `GET /api/enquiries/:id?adminKey=xxx` — get single enquiry
- `PATCH /api/enquiries/:id?adminKey=xxx` — update status
- `POST /api/storage/uploads/request-url` — get presigned upload URL
- `GET /api/storage/objects/*` — serve uploaded files
- `GET /api/healthz` — health check

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/rc-patel-interior run dev` — run frontend locally

## Database Schema

- `enquiries` table — stores all client enquiry submissions with image paths

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_KEY` — Admin dashboard password (default: `rcpatel-admin-2025`)
- `DEFAULT_OBJECT_STORAGE_BUCKET_ID` — GCS bucket for file uploads
- `PUBLIC_OBJECT_SEARCH_PATHS` — Public object paths
- `PRIVATE_OBJECT_DIR` — Private object directory

## Deployment (Render — Full-Stack, 24/7 Free)

The app deploys as a single web service on Render. The Express server serves both the API and the built React frontend.

### Files
- `render.yaml` — Render configuration (web service + PostgreSQL DB)
- `scripts/build-prod.sh` — Full production build script

### Build Command
```
bash scripts/build-prod.sh
```

### Start Command
```
node --enable-source-maps artifacts/api-server/dist/index.mjs
```

### Steps to Deploy on Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect your GitHub repo — Render auto-reads `render.yaml`
4. Set the `ADMIN_KEY` env var to your preferred password (default: `rcpatel-admin-2025`)
5. Deploy — Render builds and runs everything automatically

### How It Works in Production
- `NODE_ENV=production` → Express serves `artifacts/rc-patel-interior/dist/public/` as static files
- All `/api/*` routes handled by Express
- All other routes serve `index.html` (SPA routing)
- DB schema auto-pushed on every build via `drizzle-kit push`

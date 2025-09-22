# Runbook

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npx prisma generate`
4. Create DB: `npx prisma migrate dev --name init`
5. Start dev server: `npm run dev`

## Workers
- Redis required for workers. Run:
  - `npm run workers:analysis`
  - `npm run workers:podcast`
  - `npm run workers:notification`

## Health check
- GET `/api/healthz` -> `{ status: 'ok', db: 'ok', redis: 'ok|skipped' }`

## Deploy
- Ensure Vercel secrets set. CI will build. Run `npx prisma migrate deploy` before prod.

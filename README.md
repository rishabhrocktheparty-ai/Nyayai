# NYAY Setu

NYAY Setu is a demo-ready legal assistance & case management platform (Citizen, Court Employee, Lawyer, Judge).

Stack: Next.js + TypeScript, Prisma (Postgres), BullMQ (Redis), S3 for storage, OpenAI for advisory drafts.

## Quick start
1. Copy `.env.example` -> `.env`
2. Start local infra (Postgres + Redis): `docker compose up -d`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. Seed demo data: `npm run prisma:seed`
7. `npm run dev`

See `docs/arch.md` and `docs/runbook.md` for more details.
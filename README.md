# NYAY Setu

NYAY Setu is a demo-ready legal assistance & case management platform (Citizen, Court Employee, Lawyer, Judge).

Stack: Next.js + TypeScript, Prisma (Postgres), BullMQ (Redis), S3 for storage, OpenAI for advisory drafts.

## Quick start
1. Copy `.env.example` -> `.env`
2. `npm install`
3. `npx prisma generate`
4. `npx prisma migrate dev --name init`
5. `npm run dev`

See `docs/arch.md` and `docs/runbook.md` for more details.
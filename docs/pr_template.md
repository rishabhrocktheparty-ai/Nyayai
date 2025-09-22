## Summary
This PR adds the initial scaffold for NYAY Setu (demo-ready) including:
- Citizen, Court Employee, Lawyer, Judge modules
- Auth (JWT cookie), OTP registration (dev stub)
- File uploads (S3 presigned), document/evidence hashing
- Background workers (BullMQ): analysis, podcast, notifications, anchor
- AI integration stubs (OpenAI) — all outputs flagged advisory and require legal review
- Blockchain anchor stub (DB + anchorId, txid:null)
- Notifications abstraction (SMS/WhatsApp/email)
- Observability (Sentry stub), healthcheck, structured logging
- CI workflows (lint, test, build) and deploy workflow
- Docs: `docs/arch.md`, `docs/runbook.md`, `docs/security.md`

> NOTE: All LLM-generated legal content is advisory only and requires qualified legal review before any production use.

## How to test locally
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

3. Run tests:
```bash
npm run test
```

4. Smoke tests:
- GET /api/healthz
- Register -> Verify -> check cookie
- Upload presigned -> attach -> verify DB rows
- Enqueue analysis -> check analysis table after worker runs

## Merge Checklist
- [ ] Build passes `npm run build`
- [ ] Migrations applied `npx prisma migrate dev --name init`
- [ ] Unit tests pass `npm run test`
- [ ] CI green
- [ ] `.env` secrets configured in deploy environment
- [ ] Legal review scheduled for any LLM-generated content

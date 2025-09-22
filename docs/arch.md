# NYAY Setu Architecture

NYAY Setu is a demo-ready legal assistance & case management platform.

- Framework: Next.js + TypeScript
- DB: PostgreSQL via Prisma ORM
- Queues: BullMQ (Redis)
- Storage: S3 (presigned uploads)
- AI: OpenAI stubs with advisory flags
- Observability: Sentry stub; health endpoint `/api/healthz`

Key flows:
1. Auth: Register -> OTP logged -> Verify -> JWT cookie `NYAY_TOKEN`
2. Upload: Presign -> PUT file -> Attach -> Hash (SHA-256) -> Anchor stub -> DB rows
3. Analysis: Enqueue analysis job -> worker writes Analysis row
4. Notifications: Enqueue -> worker sends SMS (stub) -> status updated

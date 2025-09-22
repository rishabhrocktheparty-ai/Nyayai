# Security & Compliance

- Cookies: httpOnly, SameSite=Strict, Secure in production.
- Do not store raw Aadhaar numbers. If necessary, store salted+hashed with consent.
- Rate limit auth, uploads, AI endpoints.
- CSP headers applied in `next.config.js`.
- Role-based access at API boundaries.
- All LLM outputs are advisory and must be human reviewed before any official use.

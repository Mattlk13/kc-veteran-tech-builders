# KC Veteran Tech Builders

Veteran-led, civilian-inclusive volunteer technology recruitment site. Built on Cloudflare Workers and D1, versioned in GitHub. No Lovable or Supabase dependencies.

## Operations
- `npx wrangler d1 execute kc-veteran-tech-builders-applicants --remote --file=./schema.sql` applies database schema.
- `npx wrangler deploy` publishes.
- `npx wrangler d1 execute kc-veteran-tech-builders-applicants --remote --command="SELECT id, name, email, level, interests, projects, created_at, status FROM interests ORDER BY created_at DESC LIMIT 100"` views private applications (authorized terminal only).
- Use D1 dashboard or wrangler authenticated CLI to review, update status, and delete applicants. **Never expose applicant information publicly**.
- Configure `HASH_SALT` as secret via `wrangler secret put HASH_SALT` for rate-limit IP hashing; do not commit secret.
- Site does not send automatic notification emails; applicants get on-page confirmation only. Organizer should check D1 regularly.
- Do not solicit minors or guarantee paid opportunities. Add dedicated privacy/contact address before broad outreach.

## Security
Client input validation plus server validation, origin check, honeypot, rate limit, parameterized SQL and no public data read API. For higher traffic add Cloudflare Turnstile and retention policy.

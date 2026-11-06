# Privacy hardening: staging acceptance and production gate

This development branch is NOT authorized for production deployment. Keep the staging Worker and staging D1 database distinct from production. Apply `migrations/0001_privacy_rate_limits.sql` to the existing *staging* database before deploying there. Backup and verify rollback first. The new handler deliberately returns HTTP 503 if its D1 rate-limit table or HASH_SALT is unavailable.

## Controls
- Privacy POST requires exact same-origin `Origin` and JSON Content-Type. Browser fetch sends Origin on same-origin POST; non-browser clients without Origin are rejected.
- Hidden website honeypot returns HTTP 202 without writing a privacy request.
- Every valid request increments a salted, per-IP D1 hourly rate counter; requests above five return 429. This is an abuse limit, not a guarantee of one request per real person. Rate-limit bookkeeping persists even for a later D1 submission error.
- `HASH_SALT` must be an independently generated long secret configured securely for each environment. Never place it in git or use the prior insecure fallback.
- Turnstile is optional and *must* use a securely stored `TURNSTILE_SECRET_KEY` plus non-secret `TURNSTILE_SITE_KEY`. If only one is configured, requests fail closed. Server verifies challenge result and expected hostname. Never use test keys in production.
- The endpoint records a request for **manual, verified review only**. It does not prove email ownership; no personal data may be returned or erased until separate secure requester verification is certified. No email or alert service was enabled.

## Staging-only acceptance checklist
1. Inspect current staging binding, account, migration history and backups. Verify the target DB identity is NOT the production database.
2. Deploy to the dedicated staging Worker only after applying migration there. Ensure staging has its own HASH_SALT and (if enabled) Turnstile site/secret pair.
3. Confirm healthy GET /health and GET /privacy and a browser-visible challenge when configured.
4. Verify wrong/missing Origin -> 403, unsupported Content-Type -> 415, malformed JSON -> 400, and honeypot -> 202 with zero new privacy records. Test rate limiting with a synthetic staging-only identity and confirm 429, recording false-positive behavior behind shared-IP networks.
5. Verify Turnstile missing/invalid token -> 403, configured hostname mismatch -> 403, provider outage -> 503, and valid staging test token -> success. Test accessibility and retries.
6. Verify D1 persistence for one approved staging-only synthetic privacy request and then delete that test record and any associated test rate-counter row. Do not use real applicant data.
7. Implement and certify email-control challenge using an authenticated notification sender, hashed short-lived single-use tokens, expiry, replay protection, confirmation state and rate limiting before privacy fulfillment. Do not rely on an email address typed into the form.
8. Use a controlled staging-only failure injection and confirmed receipt in an authorized alert destination. Do not disrupt production or falsely certify delivery based on successful HTTP response alone.
9. Before any production rollout, verify origin/CSRF compatibility, migration backup/rollback, accessibility, key isolation, expected alerting, and signed human acceptance.

## Cloudflare D1 error 7403 investigation
Correlate UTC timestamps, account ID and request IDs from failed *read-only* Wrangler/API requests with Cloudflare audit or authorization records where available. Use `wrangler whoami`, list D1 resources and a read-only `SELECT 1` under the *same authenticated context*; record result codes only, never token contents. Compare account scopes, membership, D1 permission grants, credential expiry and account selection. If 7403 occurs, retry once and record both responses. **Do not rotate keys, replace databases, or alter production records without evidence.** If Cloudflare authorization logs cannot be accessed, mark them unavailable.

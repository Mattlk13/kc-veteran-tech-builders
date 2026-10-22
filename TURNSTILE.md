# Optional form abuse protection

The interest and privacy-request forms support Cloudflare Turnstile. Existing
behavior remains until deployment configuration explicitly enables protection.

1. Create a Turnstile widget restricted to the site's actual hostname.
2. Set `TURNSTILE_SITE_KEY` to its public site key and `TURNSTILE_HOSTNAME` to
   the exact hostname, without scheme, port, or path.
3. Store `TURNSTILE_SECRET_KEY` as a Worker secret; never put it in source control.
4. Set `TURNSTILE_REQUIRED=true` in staging. Test both forms with synthetic data,
   including expiration, invalid tokens, provider outage, and a successful write.
5. Enable the same configuration in production only after the staging checks.

The server validates success, hostname, and the form-specific action before D1
writes. Siteverify receives only its secret and the token, not applicant fields
or the connection IP. Provider calls time out after eight seconds. An enabled
but incomplete configuration fails closed. Tokens are single-use; the client
resets the widget after a response (and after all interest-form attempts).

The CSP permits only the official widget script and frame host in addition to
the existing inline page scripts. Turnstile is abuse protection, not identity
verification. Existing origin, honeypot, rate limits, and manual privacy-request
review remain relevant. No credentials or deployed settings are included.

Run `node --test tests/*.test.mjs`. The PR workflow runs these isolated tests
without secrets, database access, or deployment. Live browser/widget and actual
D1 checks remain staging prerequisites.

References:
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- https://developers.cloudflare.com/turnstile/reference/content-security-policy/

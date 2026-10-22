# Public Markdown

GET /about.md provides a small public project overview and links to the join form
and privacy page. It never queries D1 or exposes submissions. This is an explicit
application endpoint, not activation of Cloudflare's paid-plan zone feature.
The normal HTML homepage is unchanged.

Clients should use Content-Type to identify Markdown and must not depend on
x-markdown-tokens or x-original-tokens. Cloudflare removed those conversion
headers on October 9, 2026. No token estimate or AI-training permission is added.

Reference: https://developers.cloudflare.com/changelog/post/2026-10-09-markdown-for-agents-in-process-conversion/

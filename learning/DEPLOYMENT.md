# Learning site deployment

Published 2026-10-23 from commit 7652576d5ce8b58bf019921638daa7eee06fb985.

- URL: https://kc-veteran-tech-builders-learning.hm2krebsmatthewl.workers.dev/
- Cloudflare version: dede0b3f-f90a-4c36-8b9d-4059c843254d
- Wrangler 4.151.3 dry-run and deployment succeeded. No bindings; no database migration or recruitment Worker changes.
- Two source tests passed on Linux and Windows. Live GET/HEAD returned 200, POST 405, unknown path 404, with restrictive CSP.
- Rendered desktop and 320px mobile screenshots reviewed. At 320/768/1024/1440 widths all six labs rendered without horizontal overflow or uncaught runtime exceptions. Cloud-browser Tab reached the skip link.
- This is a basic rendered smoke check, not human screen-reader certification or a complete accessibility audit.
- No dependency installation/build is required for these modules; the existing Wrangler installation was used. No software was installed by the WinGet setup.

Other applications were not deployed or merged. All examples are original sanitized learning exercises, not records of completed live project acceptance.

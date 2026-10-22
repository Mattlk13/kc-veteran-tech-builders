# UptimeFlare integration profile

This directory integrates the existing KC Veteran Tech Builders public routes with
UptimeFlare's monitor configuration format. It does not replace the recruitment
Worker or its D1 database. No signup data, credentials, cookies, administrative
routes or notification destinations are included.

## Implemented and verified

- `profile.mjs`: two stable GET monitors for the landing page and `/health`.
- `export-config.mjs`: generates a new `uptime.config.ts` compatible with the
  reviewed upstream PageConfig/WorkerConfig/MonitorTarget fields. Never overwrites.
- `check.mjs`: read-only, bounded smoke test that can be run now without UptimeFlare.

```sh
node monitoring/uptimeflare/check.mjs
node monitoring/uptimeflare/export-config.mjs /path/to/new-uptime.config.ts
```

On 2026-10-22 at 02:13 America/Chicago, both live routes returned HTTP 200 and
matched their configured keywords. The `/health` source runs `SELECT 1`; this is
database connectivity evidence, not proof of schema, signup persistence, privacy
request handling or end-to-end recruitment acceptance.

Config generation, JS syntax, unique IDs, public target restriction and no-secret
profile checks passed. No package installation or application build was needed
for these standalone scripts. The upstream full build and scheduled checks have
NOT RUN. No continuous availability history exists from this change.

## Upstream selection

- Repository: https://github.com/lyc8503/UptimeFlare
- Reviewed commit: `8035521268a54222959eaf720c82f530e755b6bb`
- License inspected: Apache-2.0. No upstream implementation files are vendored here.
- Security advisory: https://github.com/lyc8503/UptimeFlare/security/advisories/GHSA-36q9-v7p3-vj6v
- GitHub comparison confirms the selected commit is 4 commits ahead of patched
  commit `377a5963c66ba9a798abebfe8d80378b053435e9`, with none behind.

This verifies ancestry of that fix only, not a full security or dependency audit.
Keep the profile credential-free, including webhook URLs. Reassess advisories and
the locked dependency audit before building/deploying upstream.

## Complete deployment

Use a separately named UptimeFlare deployment pinned to the reviewed revision.
Check for an existing monitoring deployment before provisioning another. Export
this profile, review it, and use it as upstream's root `uptime.config.ts` instead
of the demo configuration. Preserve upstream license/notices. Run `npm ci` using
the upstream lockfile before any build; follow its worker/UI build procedure and
do not bypass a failed dependency audit.

The upstream application needs its own monitoring D1 database and scheduled Worker,
plus status UI. Do not bind it to recruitment D1 or reuse recruitment deployment
secrets. Review account quota usage; open-source software does not make unlimited
Cloudflare usage free. See upstream deployment instructions:
https://github.com/lyc8503/UptimeFlare/wiki/Quickstart

After deployment, verify a real scheduled execution and stored history timestamps,
then a controlled synthetic failure/recovery. Do not take the community site down
for that test. Keep notifications unset unless a destination and sending are
explicitly authorized. No deployment credentials were added or used here.

## Catalog review decisions

Catalog: https://github.com/theoephraim/awesome-cloudflare-selfhosted

UptimeFlare addresses availability visibility using the site's existing health
route. Other catalog categories do not justify blanket installations:

- FormZero would duplicate the existing recruitment form and D1 handling.
- R2 Explorer/WebDAV tools overlap the current storage work; bucket authorization
  and restore validation must precede exposing another file-management surface.
- Counterscale/other analytics require a separate measurement and privacy purpose.
- CMS, email, billing and authentication replacements require migrations and do
  not resolve the current release blockers.
- Remote-terminal apps overlap existing RDC and the protected-tunnel work.
- Catalog license badges are discovery hints; inspect each actual license and
  deployment configuration before reuse. No blanket license/security clearance.

Only this monitoring profile and smoke-check code were added. No production code,
DNS, database, authentication, account subscription or cloud deployment changed.

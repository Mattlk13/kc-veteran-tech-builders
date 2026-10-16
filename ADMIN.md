# KC Veteran Tech Builders — Administrator operations

All applicant data stays inside Cloudflare D1. This is **not** a browser-accessible admin panel. Authorized operators use Wrangler with their authenticated Cloudflare account. Do not add any public admin API without implementing Cloudflare Access + server-side JWT verification.

```powershell
npx.cmd wrangler d1 execute kc-veteran-tech-builders-applicants --remote --command="SELECT id,name,email,level,interests,status,created_at FROM interests ORDER BY created_at DESC LIMIT 50"
npx.cmd wrangler d1 execute kc-veteran-tech-builders-applicants --remote --command="SELECT id,email,request_type,status,created_at FROM privacy_requests WHERE status='new' ORDER BY created_at"
npx.cmd wrangler d1 execute kc-veteran-tech-builders-applicants --remote --command="SELECT a.id,i.name,p.name,a.status FROM assignments a JOIN interests i ON a.applicant_id=i.id JOIN projects p ON p.id=a.project_id"
```

To move an applicant to a status: `UPDATE interests SET status='screening' WHERE id=NUMBER;`. Before editing or deleting, confirm the ID is correct. Use parameterized statements when writing application code. Assign a project: `INSERT INTO assignments(applicant_id,project_id,status) VALUES (NUMBER,'forgeai','invited');` and record administrator actions in `audit_log`. Valid proposed statuses: new, screening, contacted, active, declined, withdrawn.

Data access/deletion requests require identity verification, not merely possession of an arbitrary email in the form. Check privacy requests daily. Do not email personal information or delete someone else's data without verifying requester control.

Privacy: Until verified automation is deployed, manually review inactive application data every 90 days, delete unneeded applications after 180 days, and record legitimate exceptions. Keep account-level access limited to trusted administrators. An automatic retention job is not in place.

Follow-up: Access-protected admin UI, Turnstile, email ownership verification, automated privacy deletion retention, accessibility audit, secure email notifications, and verified social media pages remain open work.

# Original engineering labs

This separate, read-only Cloudflare Worker publishes six sanitized walkthroughs and workflow diagrams. It has no database, secrets, analytics, forms, third-party scripts, or privileged endpoints. It does not replace the recruitment Worker or modify applicant storage.

Validate with `node --test learning/worker.test.mjs`. Deploy from this directory using a reviewed Wrangler v4 installation: `wrangler deploy --config wrangler.jsonc`. Verify HTTP GET, HEAD, unknown paths, method rejection, keyboard navigation and mobile rendering after deployment. No npm install or build is required for these source modules.

Publication is not certification of the products described. The examples omit real identities, infrastructure secrets, logs and private source. They are original exercises, not copied course content or exam material.

export const labs = [
  {
    "id": "access",
    "title": "1. Prove who can act",
    "project": "PackForge",
    "concept": "Authentication identifies a player; authorization decides which match and actions that player may access.",
    "steps": [
      "Create two approved staging identities in separate browser profiles. Verify distinct application user IDs without copying session cookies.",
      "Submit a valid 60-card deck and invalid 59/61-card, duplicate and off-faction decks. Record status codes, never tokens.",
      "Use a third nonparticipant to request the isolated match and submit an action. Require denial before any state change.",
      "After session expiry, repeat a protected request and require a login challenge or 401/403. Sign in again; verify persisted state."
    ],
    "evidence": "Record build revision, UTC time, test alias, action, expected result and observed result. Two tabs with one identity do not prove isolation.",
    "diagram": [
      "Signed-in player",
      "Access verification",
      "Match ownership",
      "Allowed action"
    ]
  },
  {
    "id": "tracing",
    "title": "2. Diagnose a slow request",
    "project": "ForgeAI",
    "concept": "A trace connects an operation with its provider attempts. Duration, outcomes and attempt numbers make failures diagnosable without private content.",
    "steps": [
      "Enable the reviewed staging-only tracing flag at a low sampling rate. Keep production disabled until staging acceptance.",
      "Send a synthetic prompt to a controlled provider. Compare normal, slow, timeout and failed responses.",
      "Inspect provider category, duration and fallback ordinal; verify the application returns the expected response.",
      "Search the captured trace for a synthetic secret marker. Reject the trace if prompts, credentials, URL query secrets or raw provider errors appear."
    ],
    "evidence": "Keep sanitized timings and outcome counts. A provider span duration covers its wrapper; it does not independently measure every internal model retry.",
    "diagram": [
      "Synthetic request",
      "Provider attempt",
      "Safe trace attributes",
      "Incident review"
    ]
  },
  {
    "id": "evidence",
    "title": "3. Preserve uploaded evidence",
    "project": "FieldProof",
    "concept": "A hash detects changed bytes. It does not prove who created a file or whether its contents are true. Preserve identity, tenant scope and audit history separately.",
    "steps": [
      "Use a tiny synthetic PDF and compute its SHA-256 before upload. Do not upload real client evidence in a public tutorial.",
      "Test a field worker, a read-only role and a different organization. Only authorized uploads may reach storage.",
      "Compare the server hash with the original. Confirm metadata and audit event commit together.",
      "Inject a metadata-write failure in a local fixture; require object cleanup and no success response. If cleanup also fails, reconcile the private orphan before retrying."
    ],
    "evidence": "Record expected hash, byte count, scoped object reference and sanitized audit action. Restore a test copy into an isolated location and verify hash equality before recovery sign-off.",
    "diagram": [
      "Authorized upload",
      "Private object",
      "Metadata and audit",
      "Verified recovery"
    ]
  },
  {
    "id": "roles",
    "title": "4. Separate identity from privileges",
    "project": "AfterFormation",
    "concept": "A valid login is not an admin grant and is not identity or service verification.",
    "steps": [
      "Validate signed issuer, audience, expiry and application identity. Reject missing, expired and forged assertions.",
      "Assign admin privileges through reviewed database grants with expiry and revocation. Ignore client role headers.",
      "Test suspended accounts and expired verification records. Access must fail closed.",
      "Before public beta, choose approved verification providers and validate signed callbacks, replay protection and revocation in staging. Mock verification remains localhost-only."
    ],
    "evidence": "Use synthetic accounts. Retain boolean outcomes and test references; do not publish identity documents, birthdates or credentials.",
    "diagram": [
      "Signed identity",
      "Account status",
      "Application role",
      "Protected resource"
    ]
  },
  {
    "id": "network",
    "title": "5. Test server authority and recovery",
    "project": "Celestium / MMORPG",
    "concept": "The dedicated server owns game state. A healthy HTTP endpoint does not demonstrate game-transport health.",
    "steps": [
      "Build and hash a dedicated server using the reviewed Unreal source and matching toolchain. Do not expose an unvalidated listener publicly.",
      "Connect two independent clients with signed admission. Submit forged movement and foreign-character commands; verify server rejection.",
      "Use an isolated test network to introduce delay, loss and disconnects. Measure application round-trip acknowledgements with a monotonic clock.",
      "Reconnect using fresh authorization. Verify one authoritative character, no duplicate rewards, and rejection of stale commands."
    ],
    "evidence": "Record build hash, transport, sample count, p50/p95/p99 RTT, timeout count and reconnect outcomes. No runtime acceptance is claimed until the real build exists.",
    "diagram": [
      "Client intent",
      "Signed admission",
      "Authoritative server",
      "State acknowledgement"
    ]
  },
  {
    "id": "windows",
    "title": "6. Reproduce a Windows development setup",
    "project": "All project contributors",
    "concept": "WinGet installs developer tools. Lockfiles and repository tests control application dependencies.",
    "steps": [
      "Review tools/windows/setup.ps1 in GitHub. Its default mode prints a plan and installs nothing.",
      "Check free disk space and the supported Node major. Install only missing Git and GitHub CLI with -Install.",
      "Optionally add -IncludeUniGetUI for the graphical interface. Keep blanket automatic upgrades off for project runtimes.",
      "Run npm.cmd ci in a clean npm checkout, then the documented test and build commands. Preserve failure output without credentials."
    ],
    "evidence": "Record tool versions and build exit codes. Installing tools does not establish application readiness.",
    "diagram": [
      "Reviewed setup",
      "Developer tools",
      "Locked dependencies",
      "Tests and build"
    ]
  }
];

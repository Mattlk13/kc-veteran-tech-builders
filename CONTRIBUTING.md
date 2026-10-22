# Contributor starting guide

Choose one small task and ask an organizer which repository and issue it belongs to. Participation is voluntary; completing learning material does not promise project access, employment, or compensation.

## Learn a skill, then apply it

| Goal | Upstream resource | Suggested first contribution |
| --- | --- | --- |
| Learn HTML, CSS and JavaScript | [freeCodeCamp](https://www.freecodecamp.org/learn/) · [source repository](https://github.com/freeCodeCamp/freeCodeCamp) | Review this site's form labels and instructions; propose a small clarity or accessibility improvement. |
| Choose a frontend or backend learning path | [Developer Roadmap](https://roadmap.sh/) · [source repository](https://github.com/nilbuild/developer-roadmap) | Pick one skill relevant to a maintainer-assigned issue and document a reproducible bug or setup clarification. |
| Explore AI concepts | [Microsoft AI for Beginners](https://github.com/microsoft/AI-For-Beginners) | Discuss a synthetic-input evaluation case with a ForgeAI maintainer before changing model or provider behavior. |

These are links to upstream learning resources, not bundled curriculum or installed dependencies. Review each exercise's prerequisites and service costs before running it. Keep third-party licenses and attribution when reusing material. No completion certificate or course purchase is required to volunteer.

## First change in this repository

1. Read README.md, TURNSTILE.md and MARKDOWN.md. Agree on a small issue with an organizer.
2. Work on a branch. Use Node.js 24 for the existing test suite.
3. Run `node --test tests/*.test.mjs` from the repository root. These tests use synthetic requests; they do not require production D1 access.
4. For behavior changes, include a reproducer or relevant regression test. For copy-only changes, review wording and links.
5. Open a draft pull request describing the user problem, changed behavior, validation and remaining limitations.

Do not run the README's remote database commands or deployment command as a setup step. Applicant information stays private; use invented test data. Never paste secrets or applicant records into an issue, course, external AI tool or pull request.

## Cross-project work

This guide is an entry point; each project's own instructions and review gates apply. Ask for an assigned issue and access before contributing to another repository.

- **PBN:** synthetic examples and documentation; preserve authoritative benefits sources and existing decision boundaries.
- **ForgeAI:** synthetic provider/error cases and documentation; tracing remains disabled until staging validation.
- **PackForge:** documentation and maintainer-assigned QA; preserve the production hold and approved art.
- **Celestium:** server-build documentation and asset-validation cases; Nakama and Agones remain conditional on their readiness criteria.

## Resource maintenance

Checked 2026-10-22 against the upstream repositories. Links and offerings can change. Report broken or paywalled paths; prefer the upstream free material. Popularity lists are discovery aids, not compatibility or security evidence. OSSInsight's star-based trending rankings were paused at review time.

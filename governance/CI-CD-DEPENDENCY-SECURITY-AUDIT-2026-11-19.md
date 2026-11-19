# CI/CD, dependency and secret-pattern audit — 2026-11-19

## Repository-wide inventory
- All 65 repositories had their default-branch file trees inspected.
- Workflow YAML paths and dependency/deployment configuration paths are inventoried in:
  - governance/manifests/ci-dependency-paths-core.json
  - governance/manifests/ci-dependency-paths-batch-01.json through batch-04.json
  - governance/manifests/ci-dependency-paths-fork-retries.json
- The path inventory contains 1,588 workflow-file paths and 148 dependency/deployment configuration paths. Many are upstream templates, nested examples, or sample workflows; they are not necessarily all active workflow definitions.
- This pass inventoried paths for all 65 repositories but inspected workflow and package file contents in depth for the 10 priority repositories below.

## Priority repository review

| Repository | Stack / build boundary | Recent Actions sample | Findings |
|---|---|---|---|
| OCodejs/ask-chatbot | React 18, Vite 8, Node/Express 5, MCP SDK, Vitest; npm lockfile; Vercel static frontend + Node API; optional Docker API image | Latest OSSAR, Code Quality, MobSF, Trivy and PHPMD runs observed successful | 43 workflow YAML files, including generic scanner/template workflows. Keep Pages/Vercel/API deployment paths distinct; avoid enabling every template workflow in the monorepo. |
| OCodejs/mcp.auth.ocodejs | Next.js 15, Auth.js v5 beta, Prisma 6/Postgres, OpenNext Cloudflare, Wrangler | Auth CI and static Pages runs successful; Code Quality successful | 5 workflows. OpenNext Cloudflare and Wrangler are declared as latest, so pin them before import. Build DB helper only runs db push when VERCEL_ENV=preview and AUTH_PREVIEW_DB_PUSH=true; otherwise it generates Prisma Client. Preserve this Preview-only guard and separate DB credentials. |
| OCodejs/THU365 | pnpm workspace; web/PWA plus native mobile checks; lockfile and workspace catalog | Native checks and validation sample successful | 5 workflows. Keep pnpm workspace and mobile build jobs separate from web-only checks. Workspace enforces a 1,440-minute minimum package release age. |
| OCodejs/ocodejs.github.io | Jekyll/GitHub Pages dashboard/docs with control API, registry and secret-file checks | Control API and Pages deployment sample successful | 7 workflows. Preserve the Pages publisher boundary and existing secret-file guard. |
| OCodejs/OCODEJS | TypeScript ESM package ocode-js@0.1.0; npm package build/test/coverage | Latest CodeQL and Super-Linter successful; CI failed at Build and run tests; Publish workflow skipped | 62 workflow YAML files, many templates. Do not enable publish in monorepo CI. Root package declares TypeScript ^7.0.2; investigate failing build/test before import. |
| OCodejs/cli-hub | Static GitHub Pages catalog; Node validation/test scripts; auth worker/server separate | CodeQL, Pages deploy and catalog validation samples successful | 8 workflows. Keep static catalog and auth runtime separate. |
| OCodejs/docs-ocodejs | Jekyll/docs | Latest five sampled Daily Spending Forecast runs failed at Generate agentic run info | 11 workflows. Failure is in scheduled automation activation, not evidence of a docs build failure. |
| OCodejs/hello-working | Jekyll/docs | Latest sampled Pages build failed at Build with Jekyll; docs validation also failed | 10 workflows. Quarantine until intended role and broken validation are resolved. |
| OCodejs/skills | Skills/docs | Docs validation failed at Validate local Markdown links; Jekyll Docker and Conda jobs also failed in latest sampled runs | 11 workflows. Separate real skill package checks from inherited sample workflows. |
| OCodejs/platform-ocodejs-dev | Node/Vercel plus many generic security workflows | OSSAR success; MobSF, CodeScan and Trivy failures; NeuraLegion queued | 42 workflow YAML files. Tree differs from ask-chatbot; quarantine and identify relevant scanners before import. |

## Secret-pattern scan — sanitized result only
Searches covered default-branch code in the OCodejs organization and the 16 related repositories for common private-key, GitHub-token, AWS-key, Stripe-live-key, and Slack-token indicators.

Observed matches were reviewed in a limited sample and categorized as:
- UI placeholders requesting a GitHub token (not credential values).
- Mock token strings in automated test fixtures.
- Regular expressions used by secret-audit scripts.
- Documentation/specification examples containing key-format markers.
- Comments or validation code that detects token prefixes.

No live credential was confirmed in the inspected match lines. No secret value is reproduced in this report. Zero matches were returned for the tested Stripe live-key and Slack bot-token prefixes in the OCodejs organization search.

**Important limitation:** this was a default-branch pattern search plus spot inspection, not a complete historical secret scan. The GitHub secret-scanning alerts endpoint was not available through the connected read interface, and the ephemeral Git workspace could not be created because the Upstash OAuth grant is read-only (HTTP 403). Therefore no claim is made that all historical commits, unreachable objects, every branch, or every tag are secret-free. Before any source import, run Gitleaks or TruffleHog against full mirror clones of all approved source refs and history. If a real credential is found, rotate it first; do not copy the value into the monorepo or audit artifacts.

## Import gates
1. Pin exact source branch/tag SHAs from the manifests.
2. Preserve commit ancestry through a full Git mirror/subtree import, not file copy or synthetic GitHub Contents API commits.
3. Re-run CI in isolated Preview; no Production deployment, package publication, domain changes, or shared database migration.
4. Pin mutable dependencies such as latest, reconcile lockfiles, and deduplicate only after package-level compatibility tests.
5. Keep deployment credentials out of source files and history; use Preview-only secret references.
6. Do not import upstream forks or duplicated docs/templates as first-party applications without license and ownership review.

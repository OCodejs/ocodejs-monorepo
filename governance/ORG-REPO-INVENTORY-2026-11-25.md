# OCodejs organization inventory — 2026-11-25

## Scope and confidence

- GitHub repository search scoped to the `OCodejs` organization returned **76 repositories**: **73 public** and **3 private**.
- Root directory contents were enumerated for all 76 repositories. This is a first-pass inventory, not a complete source-code audit.
- Default branches and visibility below are taken from the current GitHub repository search snapshot.
- The earlier monorepo audit dated 2026-11-19 covered 49 OCodejs repositories plus 16 related repositories (65 total), with 65 recursive trees and 1,262 branch refs. The current 76-org-repository result must be reconciled against that older 49-org snapshot before migration.
- No source repository was modified, imported, merged, or deployed by this inventory update.

## Current organization repositories

| Repository | Default branch | Visibility |
|---|---|---|
| `OCodejs/.github` | main | public |
| `OCodejs/.agents-skills-prisma-cli-SKILL.md` | main | public |
| `OCodejs/0codejs` | main | private |
| `OCodejs/Autorun` | main | public |
| `OCodejs/Authentication` | main | public |
| `OCodejs/Cloudxx` | main | public |
| `OCodejs/Codespaces-OCodeJS` | main | public |
| `OCodejs/OCode-js-pages` | main | public |
| `OCodejs/OCODEJS` | main | public |
| `OCodejs/Ocodejs-codespaces` | main | public |
| `OCodejs/PostgreSQL` | main | public |
| `OCodejs/SKILLS.SH` | main | public |
| `OCodejs/Signs` | main | public |
| `OCodejs/Spoon-Knife` | main | public |
| `OCodejs/THU365` | main | public |
| `OCodejs/aitools-agent` | main | public |
| `OCodejs/ai` | main | public |
| `OCodejs/annotated_implementation_skill` | main | public |
| `OCodejs/api` | main | public |
| `OCodejs/ask-chatbot` | main | public |
| `OCodejs/ask-ocodejs` | main | public |
| `OCodejs/auth-gateway-phase-1-2` | main | public |
| `OCodejs/chatbot` | main | public |
| `OCodejs/checkout` | main | public |
| `OCodejs/cli-hub` | main | public |
| `OCodejs/codespaces` | main | public |
| `OCodejs/demo-repository` | main | public |
| `OCodejs/docss` | main | public |
| `OCodejs/docs` | main | public |
| `OCodejs/docs-ocodejs` | main | public |
| `OCodejs/docs.md` | main | public |
| `OCodejs/docs.mdx` | main | public |
| `OCodejs/docs.rtf` | main | public |
| `OCodejs/documentation` | main | public |
| `OCodejs/dotfiles.github.com` | master | public |
| `OCodejs/eve-chat-template` | main | private |
| `OCodejs/feat-ocodejs-chatbot-integration` | main | public |
| `OCodejs/gh-aw` | main | public |
| `OCodejs/github-mcp-server` | main | public |
| `OCodejs/github-pages` | main | public |
| `OCodejs/hello-working` | main | public |
| `OCodejs/host` | main | public |
| `OCodejs/mcp.auth.ocodejs` | main | public |
| `OCodejs/mcp.server.auth` | main | public |
| `OCodejs/next-platform-starter` | main | public |
| `OCodejs/next-platform-starter-3d98a` | main | public |
| `OCodejs/nextjs-auth0` | main | public |
| `OCodejs/nextjs-boilerplate` | main | public |
| `OCodejs/oauth` | main | public |
| `OCodejs/octocat.github.io` | master | public |
| `OCodejs/ocode.js` | canary | public |
| `OCodejs/ocodejs-api` | main | public |
| `OCodejs/ocodejs-legal` | main | public |
| `OCodejs/ocodejs-monorepo` | main | public |
| `OCodejs/ocodejs.github.io` | main | public |
| `OCodejs/opencode` | dev | public |
| `OCodejs/platform-ocodejs-dev` | main | public |
| `OCodejs/pnpm` | main | public |
| `OCodejs/probot` | master | public |
| `OCodejs/proof-html` | master | public |
| `OCodejs/qstash-js` | main | public |
| `OCodejs/repository` | main | public |
| `OCodejs/satori` | main | public |
| `OCodejs/sdk` | main | public |
| `OCodejs/skills` | main | public |
| `OCodejs/skills-agentc` | main | public |
| `OCodejs/spec` | main | public |
| `OCodejs/studio` | main | public |
| `OCodejs/surge` | master | public |
| `OCodejs/v0-chat` | main | private |
| `OCodejs/v0-sdk` | main | public |
| `OCodejs/vercel` | main | public |
| `OCodejs/vscode-codeql-starter` | main | public |
| `OCodejs/website` | main | public |
| `OCodejs/workflow` | main | public |
| `OCodejs/workflow-examples` | main | public |

## Verified upstream forks (keep as external dependencies unless ownership/license review approves vendoring)

- `OCodejs/website` → `neondatabase/website`
- `OCodejs/workflow` → `vercel/workflow`
- `OCodejs/ai` → `vercel/ai`
- `OCodejs/sdk` → `vercel/sdk`
- `OCodejs/vercel` → `vercel/vercel`
- `OCodejs/pnpm` → `pnpm/pnpm`
- `OCodejs/documentation` → `npm/documentation`
- `OCodejs/satori` → `vercel/satori`
- `OCodejs/qstash-js` → `upstash/qstash-js (parent zskbot/qstash-js)`
- `OCodejs/probot` → `probot/probot`
- `OCodejs/github-mcp-server` → `github/github-mcp-server (parent HT-TOL/github-mcp-server)`
- `OCodejs/opencode` → `anomalyco/opencode`
- `OCodejs/SKILLS.SH` → `vercel-labs/skills`

## Existing monorepo migration decisions to preserve

The current `governance/MIGRATION-MANIFEST-2026-11-19.md` identifies a small candidate-import set and keeps upstream forks, duplicate candidates, and ambiguous repositories quarantined. Key first-party candidates include:

- `OCodejs/ask-chatbot` → `apps/ask-chatbot`
- `OCodejs/mcp.auth.ocodejs` → `services/auth`
- `OCodejs/THU365` → `apps/thu365-web` + `apps/thu365-mobile`
- `OCodejs/ocodejs.github.io` → `apps/central-dashboard` + `docs/central`
- `OCodejs/OCODEJS` → `packages/ocode-js`
- `OCodejs/cli-hub` → `apps/cli-hub`

Additional candidates such as `OCodejs/host`, `zskbot/ocodejs-api`, `zskbot/ask-ocodejs`, and `zskbot/OCodejs-Profile` require their existing review gates and ownership/ancestry reconciliation.

## Important architecture findings

- `OCodejs/ocodejs-monorepo` currently has target directories for apps, packages, services, integrations, infrastructure and governance, but the application/package/service directories are mostly placeholders; only `apps/brand-guidelines` was present in the inspected tree.
- The monorepo README explicitly says source repositories remain authoritative until migration is reviewed and approved.
- The monorepo migration plan requires history-preserving Git transport, pinned source SHAs, staged imports, per-project verification and PR review. File-copy or synthetic commits are not an acceptable substitute for preserving Git history.
- Multiple overlapping identity/auth repositories exist (`mcp.auth.ocodejs`, `mcp.server.auth`, `Authentication`, `auth-gateway-phase-1-2`, `oauth`, plus legacy API/auth surfaces). Select a canonical identity service only after contract, deployment and data-ownership comparison.
- Static documentation, npm libraries, SDKs, templates, upstream forks and mobile/web applications need different release targets. Do not create one Vercel app per repository indiscriminately.

## Deployment snapshot (Vercel team `ocode-jss`)

Read-only project inspection found 14 projects. Notable states:
- `ocodejs-monorepo`: latest deployment state READY, but project `live=false`; SSO protection is enabled for all deployments.
- `mcp-auth-ocodejs`: latest deployment READY from a feature branch with no production target; project `live=false`; SSO protection enabled.
- `ocodejs-profile`: latest deployment ERROR.
- `auth-server`: latest deployment READY; a main-branch production-target deployment exists; SSO protection enabled.
- `ocode-ai-platform`: latest deployment ERROR.
- `ask-chat-ocodejs`: READY deployments exist, but this project is not evidence that the current `OCodejs/ask-chatbot` repo is deployed.
- `pages`: main-branch production-target deployment READY, but project `live=false`; SSO protection enabled.

A READY build is not proof of public availability, working authentication, healthy data dependencies, or production readiness.

## Next audit/import gates

1. Reconcile all 76 current org repositories against the 2026-11-19 49-org manifest and capture exact branch/tag SHAs for the newly visible or changed repos.
2. Complete recursive tree, ancestry, fork, submodule, LFS, workflow, dependency, licensing and secret-pattern reviews. Do not copy secret values into reports.
3. Keep third-party forks as upstream references; keep ambiguous/duplicate repositories quarantined.
4. Import only approved first-party candidates using full Git history into staging refs/paths, then create draft PRs.
5. Run project-specific tests/builds in isolated Preview environments; verify database, OAuth, provider and storage dependencies before any public release.
6. Production promotion, domain changes, database migrations, secret changes and source-repository deletion remain separate approval gates.

**Status:** inventory snapshot only; not a production deployment plan approval and not evidence that all 76 repositories have been fully code-audited.
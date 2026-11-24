# CI/CD, dependency and secret-scan audit — 2026-11-19

## Scope and method

Read-only inspection of GitHub default-branch trees and selected package/workflow/deployment files. This report is an inventory, not a claim that CI jobs were executed. Tree scans were complete (not truncated) for the ten priority repositories listed below. Code-search checks covered selected credential-like patterns on default branches; the connector did not permit reading GitHub Secret Scanning or Dependabot alert endpoints, and no complete Git-history clone was available.

## Workflow and build inventory

| Repository | Default tree entries | Workflow files observed | Dependency/build markers | Deployment markers |
|---|---:|---:|---|---|
| OCodejs/ask-chatbot | 520 | 42 | package.json, package-lock.json, Node 22, Vite, React, Express, Vitest | vercel.json: static build plus Node API routes; Pages workflow also present |
| OCodejs/mcp.auth.ocodejs | 131 | 5 | package.json, package-lock.json, Prisma, Next.js 15, TypeScript | vercel.json, wrangler.jsonc, Token Vault worker wrangler.toml |
| OCodejs/THU365 | 202 | 5 | pnpm workspace, pnpm-lock.yaml, Node 22, React/Expo packages | wrangler.jsonc; nested Vercel config in mockup sandbox |
| OCodejs/ocodejs.github.io | 143 | 7 | Jekyll config; no JS lockfile found in tree | GitHub Pages workflows; dedicated secret-file guard |
| OCodejs/OCODEJS | 5,663 | 64+ | package.json, package-lock.json, TypeScript, nested Bun and npm projects | netlify.toml; Pages/Jekyll and deploy workflows; npm release workflows |
| OCodejs/cli-hub | 91 | 8 | package.json; Node >=20; Node test runner; separate auth-server and auth-worker tests | Pages/static/Jekyll workflows; Cloudflare worker auth tests |
| OCodejs/platform-ocodejs-dev | 512 | 42 | package.json, package-lock.json, Bun lock, Python requirements | Vercel config; Pages deploy workflow |
| OCodejs/docs-ocodejs | 133 | 11 | Gemfile/Gemfile.lock, Jekyll | Vercel config; Cloudflare docs MCP worker |
| OCodejs/hello-working | 124 | 10 | Jekyll config; no lockfile found | Vercel config; Cloudflare docs MCP worker |
| OCodejs/skills | 119 | 11 | Jekyll config; no lockfile found | Vercel config |

## Verified configuration details

- `ask-chatbot`: CI installs with `npm ci`, validates Vercel config, runs Vitest, and builds the Vite frontend. The Vercel config routes static frontend traffic and Node API routes separately. The repository contains a large set of generic/template workflows; retain only workflows with a demonstrated owner and purpose during consolidation.
- `mcp.auth.ocodejs`: CI checks tests, Prisma generation/schema validation, TypeScript and build. The CI environment uses a clearly labelled CI-only AUTH_SECRET placeholder. `wrangler.jsonc` enables Workers preview URLs and workers.dev. The build helper only applies a schema push when `VERCEL_ENV=preview` and `AUTH_PREVIEW_DB_PUSH=true`; keep that gate and never point it at shared/Production DB.
- `THU365`: pnpm 10.11.1 workspace, frozen-lockfile install, TypeScript validation and a targeted web build. A one-day minimum package release age is configured in pnpm workspace policy. Android/iOS builds have separate workflows; do not collapse them into the web pipeline.
- `ocodejs.github.io`: Jekyll/Pages workflows plus tests for control API, MCP server, registry, Token Vault and an explicit guard against tracked .env/.dev.vars files.
- `OCODEJS`: mixed monorepo with many nested package managers and a high workflow count. npm release preflight runs tests, coverage, pack dry-run and package-name availability checks. Netlify publishes `_site` using `scripts/prepare-site.mjs`; preserve this distinct site build from the utility package build.
- `cli-hub`: focused catalog validation/test workflow also runs auth server and Worker tests. Node >=20. Static catalog and auth runtimes are separate components.
- `docs-ocodejs`, `hello-working`, and `skills`: highly similar Jekyll/Vercel/Cloudflare path layouts and overlapping branch-name families. They remain quarantined pending full recursive tree-hash and commit-graph comparison.

## Secret scan — sanitized findings

### What was checked

- GitHub code search for `BEGIN PRIVATE KEY`, `ghp_`, `github_pat_`, `AKIA`, and `xoxb-`.
- Selected matching source/test/documentation files were fetched and inspected in memory; credential-like values were never copied into this report.
- Search results for token prefixes in `cli-hub` were in test fixtures, and the related `cli` repository contained an explicitly named mock preview token in tests.
- A `github_pat_` match in an auth-server test was used as a local encryption/decryption test input.
- The inspected `BEGIN PRIVATE KEY` hits were not reproduced as private-key blocks when their current default-branch files were fetched; search matches appear to include documentation/examples or indexing context.

### Result and limitations

- Confirmed exposed live credential: **none in the inspected sample**.
- Test/example token-like literals: **present**; retain them only if clearly synthetic and nonfunctional. Consider replacing them with unmistakable fixed dummy fixtures such as `ghp_TEST_NOT_A_REAL_TOKEN`.
- Full organization-wide source scan: **not certified**.
- Full Git-history scan: **not performed**.
- GitHub Secret Scanning alert state and Dependabot alert state: **not verifiable through the available connector endpoints**.
- Therefore this is **not a clean bill of health**. Before any import, run a dedicated secret scanner (e.g. gitleaks) against every source repository with full history and review GitHub security alerts. If any live credential is found, rotate/revoke it first; do not copy the value into reports or the monorepo.

## CI/CD consolidation recommendations

1. Keep independent build jobs for Vite/Node, Next.js/Cloudflare, pnpm/Expo, Jekyll/Pages and npm package release.
2. Replace duplicated template workflows only after confirming no branch protection, external status check, release or deployment consumer depends on them.
3. Require PR CI with read-only permissions and pin third-party actions to immutable SHAs.
4. Disable deployment jobs on monorepo staging branches by default. Use Preview-only environments with separate credentials and databases.
5. Add path filters and a build matrix so a docs-only change does not invoke mobile or package publishing.
6. Keep publish/deploy jobs behind explicit manual approval and environment protection; do not run them in this migration PR.

## Import decision

No source files or Git objects were imported. The GitHub connector can create new blobs, trees and commits, but its exposed commit API cannot faithfully recreate original commit metadata, signatures, tags and all branch ancestry. A history-preserving import requires a controlled Git mirror/filter workflow and explicit ref mapping. Do not create synthetic import commits and label them history-preserving.

# Source Audit — Phase 1

**Snapshot date:** 2026-11-19  
**Scope:** Read-only audit of 10 high-priority OCodejs repositories.  
**Policy:** No source repository was changed. No source branch was merged, deleted, rebased, or rewritten. No Production deployment was performed. The audit branch is separate from the single bootstrap commit on `main`.

## 1. Verified default-branch fingerprints

The SHAs below are the observed `main` commit tips at audit time. They are immutable migration anchors, not proof that every feature branch has been inventoried at SHA level.

| Source repository | Default branch | main SHA | Commit date (UTC) | Observed branch count |
|---|---|---|---|---:|
| OCodejs/ask-chatbot | main | `913f47289e066b6f395e65d44d7c13bbbf1f2680` | 2026-11-17 | 74 |
| OCodejs/mcp.auth.ocodejs | main | `1fb874ced0e83734b5e5ded62f8adaa0eb1aa5a5` | 2026-11-17 | 26 |
| OCodejs/THU365 | main | `9378e567974fba90323284d7e29e87e7d9555ea4` | 2026-11-07 | 38 |
| OCodejs/ocodejs.github.io | main | `618c3027fa73d43a5142c494dc06de2b6e8dacbe` | 2026-11-16 | 54 |
| OCodejs/OCODEJS | main | `7fb540bb9b8917322212dda1381de001a6afeb7e` | 2026-11-19 | 77 |
| OCodejs/docs-ocodejs | main | `7a4d89aafd3134b63eefd45835249beafc895eca` | 2026-11-05 | 44 |
| OCodejs/hello-working | main | `99cd7421d03fc09afe5ec059e1d156d5e909a15a` | 2026-10-31 | 41 |
| OCodejs/skills | main | `f45956b24cb92de032fd1dab74d264651da70e49` | 2026-10-29 | 41 |
| OCodejs/cli-hub | main | `bd2372333bc8b22a16565588c644cab1890970f6` | 2026-11-12 | 55 |
| OCodejs/platform-ocodejs-dev | main | `9ac83009840dc0377f536a8d198dc64d822bb982` | 2026-11-05 | 64 |

Branch names were enumerated for these repositories. Individual branch-tip SHAs, tags, protected-ref settings, and full ancestry are still pending. Do not treat the branch counts as a complete all-organization ref manifest.

## 2. Runtime and product classification from source manifests

| Repository | Observed stack / role | Proposed monorepo destination | Migration treatment |
|---|---|---|---|
| `ask-chatbot` | React 18 + Vite + Node/Express, TypeScript, Vitest, MCP SDK; provider-based chat | `apps/ask-chatbot` + `services/ai-gateway` + `integrations/ai-providers` | Import as a distinct application; preserve backend and frontend boundaries. README explicitly warns that generated-app preview and GitHub write-back are not yet proven features. |
| `mcp.auth.ocodejs` | Next.js 15, Auth.js v5, Prisma/PostgreSQL, Cloudflare OpenNext adapter | `services/auth` + `apps/account` | Keep auth service isolated; Preview DB schema and Token Vault secrets must remain environment-scoped. Never migrate real secrets. |
| `THU365` | pnpm workspace; web/PWA and React Native/Expo native app | `apps/thu365-web` + `apps/thu365-mobile` | Preserve the existing workspace boundary and native/web feature differences. Requires mobile build and device QA separate from web CI. |
| `ocodejs.github.io` | Jekyll/GitHub Pages central dashboard/docs surface | `apps/central-dashboard` + `docs` | Keep Pages-specific publishing separate; audit workflow ownership before any consolidation. |
| `OCODEJS` | TypeScript utility package, ESM exports, Node test runner, CLI binary | `packages/ocode-js` | Treat as a package, not the app-builder product. README metadata and previously reported npm publication status must be reconciled before release automation is moved. |
| `cli-hub` | Static GitHub Pages site, JSON catalog, Node validation/tests, separate auth worker/server | `apps/cli-hub` + `services/auth` (only after boundary review) | Keep catalog/site separate from auth runtime. Browser localStorage features are not server-side project execution or audit logs. |
| `docs-ocodejs` | Documentation / Jekyll site | `docs/ocodejs` | Compare with `hello-working` and `skills` by tree and commit graph; identical branch names alone are not evidence of duplicate source. |
| `hello-working` | Repository currently shares many branch names with docs/skills | Undetermined | Quarantine from migration pending repository identity, tree, and ancestry comparison. |
| `skills` | Skills and documentation-oriented repository; shares many branch names with docs/hello-working | `integrations/skills` (provisional) | Do not combine with docs-ocodejs or hello-working until content and history comparison completes. |
| `platform-ocodejs-dev` | Source README/package not yet inspected in this pass; branch set overlaps ask-chatbot substantially | Undetermined | Treat as a possible mirror/fork/related workspace; inspect fork parent, root tree, and commit graph before importing. |

## 3. High-risk migration findings

1. **Shared branch-name families:** `docs-ocodejs`, `hello-working`, and `skills` expose large overlapping branch-name sets. This may reflect mirrored refs or shared automation; branch names are not sufficient to infer common ancestry.
2. **Application overlap:** `ask-chatbot` and `platform-ocodejs-dev` expose a strongly overlapping branch family. Determine fork parent and tree/commit equivalence before choosing a canonical source.
3. **Distinct OCode.js product layers:** `OCODEJS` is a utility library; `ask-chatbot` is an AI chat/builder application; `cli-hub` is a catalog/workspace UI; `mcp.auth.ocodejs` is an identity service. These must not be flattened into one app.
4. **Independent deployment surfaces:** GitHub Pages/Jekyll, Vite static hosting, Next.js server runtime, Cloudflare Worker, and native mobile builds require separate build/deploy adapters.
5. **Secrets and user data:** migrate only configuration schemas and placeholder examples. Never copy `.env`, provider credentials, OAuth secrets, signing certificates, database dumps, or real user data into the monorepo.
6. **Production safety:** no migration step may switch custom domains, publish packages, run database migrations against shared/Production databases, or deploy Production as part of this phase.

## 4. Required next audit gates

- Enumerate every branch and tag with exact ref SHA for all 49 organization repositories and the 16 related external repositories; paginate all branch search cursors.
- Record fork parent, visibility, default branch, last update, branch protection/rulesets, tags, and archived state.
- Compare likely mirror pairs using commit ancestry and recursive tree hashes, not names alone.
- Inspect root manifests, lockfiles, CI workflows, Pages/Vercel/Cloudflare deployment workflows, and path-based build boundaries.
- Run secret scanning on source content and history before any import; redact findings and never store secret values in the audit report.
- Produce a per-repository migration decision: import, preserve as external dependency, archive from monorepo scope, or quarantine pending ownership/identity review.
- Import only after the exact source refs and history-preserving strategy have been approved in a separate migration PR.

## 5. Current status

- Source audit: **in progress**.
- Default-branch SHA anchors: **10 repositories captured**.
- Branch names: **10 repositories enumerated**.
- Full branch/tag SHA manifest: **not complete**.
- Source history imported: **none**.
- Source repositories modified: **none**.
- PRs merged: **none**.
- Production deployments: **none**.

# P0 source revalidation — 2026-11-25

**Scope:** focused read-only revalidation of first-wave source repositories. This is not a full 65-repository refresh and does not authorize imports.

## Repository metadata observed

| Source | Default branch | Language / size | Latest push observed | Access | Initial finding |
|---|---|---:|---|---|---|
| `OCodejs/OCODEJS` | main | TypeScript / 5.6 MB | 2026-11-24 15:02 UTC | admin/push | First-party MIT utility package, v0.1.0, early development, not yet published to npm |
| `OCodejs/mcp.auth.ocodejs` | main | TypeScript / 412 KB | 2026-11-23 22:56 UTC | admin/push | Next.js 15 + Auth.js v5 beta + Prisma/PostgreSQL account/profile application; Cloudflare and Vercel-related build paths |
| `OCodejs/Authentication` | main | TypeScript / 83 KB | 2026-11-17 11:49 UTC | admin/push | Separate Fastify/PostgreSQL identity gateway; Argon2id, hashed opaque sessions, CSRF, email verification/reset, SMTP |
| `OCodejs/ask-chatbot` | main | TypeScript / 6.6 MB | 2026-11-24 15:09 UTC | admin/push | React/Vite frontend + Node/Express API, MCP and RAG surfaces, multi-provider dependencies, Vitest/ESLint |
| `OCodejs/cli-hub` | main | HTML / 384 KB | 2026-11-24 15:09 UTC | admin/push | Static developer catalog with separate auth-server and Cloudflare auth-worker test/start scripts |
| `OCodejs/THU365` | main | TypeScript / 11 MB | 2026-11-24 14:59 UTC | admin/push | pnpm workspace; separate web/PWA and native mobile app boundaries |
| `OCodejs/ocodejs.github.io` | main | JavaScript / static | see GitHub metadata | admin/push | Static OCodeJS Control Center; no build step beyond static validation |

Metadata values are a snapshot from GitHub API on 2026-11-25. Branch tips must be pinned again at import time.

## Architecture corrections

### Identity is not one interchangeable repository
- `mcp.auth.ocodejs` is a Next.js/Auth.js account and profile application with Prisma/PostgreSQL and provider-account/session models.
- `Authentication` is a separate Fastify service implementing email/password account lifecycle, verification/reset tokens, CSRF, and server-side opaque sessions.
- These are different products/layers, not proven duplicates. Do not merge either or designate one as sole canonical authority until route/schema/claims/session interoperability is mapped. Proposed split: account/profile UI and federation adapter versus identity/session API, subject to a security review.

### Ask Chatbot license gate
- `OCodejs/ask-chatbot` package manifest reports `NOASSERTION` from GitHub metadata.
- Its README badge claims Apache-2.0 and points to `zskbot/ask-ocodejs`.
- Treat licensing as unresolved until the actual LICENSE file, copyright notices, and source ownership are checked. Do not import or redistribute based only on a README badge.

### Build boundaries
- OCODEJS is a package with its own TypeScript build/test scripts; do not combine it into the application runtime.
- THU365 is a pnpm workspace; keep web and native release jobs independent.
- CLI Hub is static-first and has separate auth services. Its browser-local activity log is not a central audit log.
- The public homepage/control-center repo is static. It is not the backend Control API itself.

## P0 decision update

| Source | Updated action | Reason |
|---|---|---|
| OCodejs/OCODEJS | Proceed to pinned-ref + package test audit | First-party MIT package; clean package boundary |
| OCodejs/mcp.auth.ocodejs | Hold for identity integration design | Auth.js + Prisma app; separate from Fastify identity gateway |
| OCodejs/Authentication | Hold for identity integration design | Independent Fastify auth/session service; security tests and deployment readiness need review |
| OCodejs/ask-chatbot | Hold license gate + source comparison | GitHub license is NOASSERTION; README claims Apache-2.0 |
| OCodejs/cli-hub | Proceed to static build/validation audit | Clear static app boundary; keep auth worker separate |
| OCodejs/THU365 | Proceed to workspace/build audit | Separate web/mobile outputs and pnpm requirements |
| OCodejs/ocodejs.github.io | Proceed to static validation audit | Static dashboard surface, no backend assumptions |

## Required next checks before import
1. Read actual LICENSE, lockfiles, workflow permissions, environment examples, deployment configs, database schemas, and migration scripts.
2. Enumerate all refs/tags and pin source SHA; compare full history for candidate mirrors.
3. Run each project's own test/build in an isolated environment using placeholder credentials and no production data.
4. Scan for secrets, private data, unsafe workflow triggers, untrusted PR execution, and vulnerable dependencies.
5. Use history-preserving Git transport to create a migration batch; verify refs, tags, commit graph, LFS/submodules, and file hashes.
6. Open a draft import PR with evidence. Never auto-merge or deploy production.

## Explicitly not done
- No source repository was modified.
- No secrets were read or copied.
- No import was performed.
- No production deployment, database migration, OAuth provider change, or domain/DNS change was performed.

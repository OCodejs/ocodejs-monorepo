# OCode.js ecosystem implementation roadmap

**Status:** implementation blueprint; source code imports and production deployments are not performed by this document.
**Baseline:** repository inventory and migration decision manifest dated 2026-11-19. Revalidate every source ref before each import batch.

## 1. Target ecosystem

OCode.js is organized as a product platform with independent deployable applications and shared platform services. A monorepo is the integration workspace, not a reason to force every project into one runtime or release.

| Domain | Canonical target | Source candidates | Integration contract |
|---|---|---|---|
| Public web and docs | `apps/homepage`, `docs/` | `OCodejs/ocodejs.github.io`, docs candidates | Static build, link checks, versioned docs |
| AI workspace | `apps/ask-chatbot` | `OCodejs/ask-chatbot`, `zskbot/ask-ocodejs` | Provider adapter API, SSE chat, isolated builder preview |
| Developer hub | `apps/cli-hub` | `OCodejs/cli-hub` | Static catalog; browser-local workspace remains explicitly local-first until server sync exists |
| Mobile/creative | `apps/thu365-web`, `apps/thu365-mobile` | `OCodejs/THU365` | Separate web and native build/release pipelines |
| Account and identity | `services/auth` | `OCodejs/mcp.auth.ocodejs`, `OCodejs/Authentication` | One canonical account/session authority after API and migration review |
| Central API and MCP | `services/central-api`, `services/mcp` | `zskbot/ocodejs-api`, related MCP projects | Versioned OpenAPI, scoped service tokens, audit events |
| Shared JS toolkit | `packages/ocode-js` | `OCodejs/OCODEJS` | Package tests, type checks, semver and provenance |
| Skills and integrations | `integrations/skills`, `integrations/github`, `integrations/ai-providers` | `OCodejs/skills-agentc`, `OCodejs/skills`, bridge candidates | Signed/allowlisted manifests; no arbitrary code execution |
| Hosting/control plane | Separate service boundary initially | `OCodejs/host`, Control API docs | Keep Velclaw ownership and secrets separate until ownership is confirmed |

## 2. Dependency direction

```text
Public Web / Account / Ask Chatbot / CLI Hub / THU365
                       |
                API Gateway / BFF
                  /    |     \
              Identity  MCP  Product APIs
                  |      |      |
               Postgres  Skills  Domain stores
                  |
       Audit / Events / Observability

Shared packages: ocode-js, contracts, UI primitives
Integrations: GitHub, AI providers, deployment adapters
Infrastructure: CI, preview environments, secrets, telemetry
```

Rules:
- Apps may depend on shared packages and published API contracts; shared packages must not depend on apps.
- Identity owns account/session lifecycle. Product services consume verified identity claims; they do not implement competing login stores.
- Each app keeps its own runtime, database boundary, and deployment pipeline until compatibility is demonstrated.
- Provider credentials and deployment secrets are never committed or copied between repos.
- Generated previews run in isolated sandboxes with strict CPU, memory, filesystem, network, and time limits.

## 3. Delivery phases

### Phase A — source inventory and risk gates
1. Re-fetch metadata, default branch, all refs, tags, fork parents, permissions, and last activity for all 49 organization repos and 16 related repos.
2. Pin source commit SHAs and compare complete trees/ancestry for docs, chatbot, identity, and skills overlaps.
3. Scan package manifests, workflows, Dockerfiles, migrations, submodules, LFS pointers, large binaries, licenses, and secret exposure.
4. Mark each source as import, external dependency, duplicate/mirror, quarantine, or out of scope. No import by repository name alone.

Exit: every source has a signed-off disposition and immutable ref manifest.

### Phase B — first-party app/service imports
Order:
1. `OCODEJS -> packages/ocode-js`
2. `mcp.auth.ocodejs -> services/auth` (compare with `Authentication` first)
3. `ask-chatbot` and `zskbot/ask-ocodejs` (diff before selecting canonical app)
4. `cli-hub -> apps/cli-hub`
5. `THU365 -> apps/thu365-web + apps/thu365-mobile`
6. `ocodejs.github.io -> apps/homepage/docs`
7. central API and skills only after ownership, API contract, and overlap review.

Use a history-preserving Git transport. The GitHub Contents API is not a substitute for preserving commit graphs, tags, signatures, or author timestamps.

### Phase C — platform integration
- Publish OpenAPI/JSON Schema contracts and generate typed clients.
- Implement OIDC/session verification through the canonical identity service.
- Add service-to-service auth, scopes, rate limits, idempotency, request IDs, and audit events.
- Add a provider registry with capability checks, quotas, health checks, and secret references.
- Add project registry, job queue, isolated preview workers, artifact storage, and explicit deploy approvals.
- Add admin console with RBAC, audit trail, feature flags, and break-glass access.

### Phase D — release and operations
- CI per app/package/service; required checks before PR merge.
- Preview deployments per PR; production deploy requires a human approval gate.
- Database migrations are backward-compatible and separately approved.
- SLOs, dashboards, alert routing, backup/restore drills, incident runbooks, and rollback tests.
- Publish release notes, SBOM, provenance, and dependency/license reports.

## 4. Security baseline
- OIDC with short-lived sessions/tokens; MFA for maintainers.
- Least-privilege GitHub/Vercel/Cloudflare credentials; environment-scoped secrets.
- CSRF protection for cookie-authenticated browser writes; exact origin allowlists.
- RBAC roles: owner, platform-admin, maintainer, developer, support, read-only auditor.
- Audit actor, action, target, timestamp, request ID, outcome; redact secrets and personal data.
- Explicit confirmation for destructive actions, deployments, provider changes, and data exports.
- Never accept PATs or provider API keys in browser localStorage.

## 5. Current verified limitations
- The monorepo target folders `packages/`, `services/`, `integrations/`, and `infrastructure/` are currently placeholders.
- `apps/` currently contains only brand-guidelines.
- Existing inventory/decision documents are snapshots from 2026-11-19; they are not proof that branch tips are unchanged.
- CLI Hub documents its workspace as browser-local metadata/activity, not server audit or code generation.
- Ask OCode.js documentation says visual editing, isolated preview, GitHub write-back, and deploy are not yet complete.
- OCodeJS identity and the CLI Hub GitHub OAuth worker are separate systems and must not be conflated.
- No source app has been imported by this roadmap, and no production deployment is authorized or claimed.

## 6. Acceptance criteria
A project is integrated only when:
1. source commit/ref and license are recorded;
2. history and file integrity checks pass;
3. secrets scan and dependency/license checks pass;
4. project-specific tests/build pass in CI;
5. deployment environment and rollback are documented;
6. API/auth boundaries and ownership are reviewed;
7. draft PR receives maintainer approval.

## 7. Immediate next batch
Create a machine-readable catalog from the 65-repository decision manifest, then run a fresh read-only metadata/ref/tree audit for the P0 candidates. Only after that audit should the first history-preserving import PR be prepared.

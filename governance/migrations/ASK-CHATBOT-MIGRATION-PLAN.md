# First application migration plan — Ask OCode.js

**Status:** Preparation only; no source code imported.  
**Source:** `OCodejs/ask-chatbot`  
**Source ref:** `refs/heads/main`  
**Pinned source commit:** `913f47289e066b6f395e65d44d7c13bbbf1f2680`  
**Snapshot:** 2026-11-19  
**Target:** `apps/ask-chatbot` (provisional)  
**Execution policy:** staging/Preview only; preserve source Git history; no Production deploy, package publish, DNS/domain switch, database migration, or source repository mutation.

## 1. Source facts verified

Root `package.json` blob:
- SHA: `3632a0c0996fac2c1be35782c0e84f69f30fdb84`
- Package name: `ask-ocodejs`
- ESM package, private, Node/Vite scripts.
- Scripts include `dev`, `build`, `preview`, `api`, `mcp`, `test`, `lint`.
- Runtime dependencies include React 18, Express 5, MCP SDK, provider SDKs, Socket.IO, SQLite and Vitest.
- Vite config uses root deployment base by default and proxies `/v1`, `/chat`, and `/api` to localhost:3000.
- TypeScript config targets ES2022, uses bundler resolution, JSX transform and noEmit.

README blob:
- SHA: `5f8bb966be48aba61b51ca0fc661d57b42574389`
- Describes a React/Vite frontend and Node/Express backend.
- README explicitly says the current app is a chat experience; a successful response is not proof of generated files, isolated previews, GitHub write-back, or deployment.
- Provider credentials are server-side only; billable provider integrations require deliberate opt-in.
- Deployment documentation describes Vercel configuration, but this migration must not activate it.

Vite config blob:
- SHA: `b20449eeea3f82832f153e7ee657fc58b2829a5b`

## 2. Migration decision

**Import as one application first. Do not split frontend, API, MCP and provider code into independent services in the initial history-preserving import.**

Reason: the root package scripts, Vite proxy, Express API, MCP runtime and provider adapters currently form a coupled application. Prematurely splitting the app could break module resolution, shared config, streaming, auth, or local development.

Provisional destination:

```text
apps/
  ask-chatbot/
    (preserve the source repository root and history)
```

A later refactor can extract shared packages only after dependency boundaries and tests are demonstrated.

## 3. Required import method

The migration must preserve Git history and all source refs:
1. Re-fetch and pin the exact source commit and default branch tip immediately before import.
2. Import the repository Git object history using a Git-native history-preserving operation (for example, subtree with `--squash` disabled, or an equivalent object-preserving migration). Do not copy files into a new commit and claim history preservation.
3. Retain a source-to-destination mapping file with original repository, source ref, commit SHA, import commit SHA, and destination path.
4. Preserve tags and branch refs in the source repository. Do not rewrite or delete source refs.
5. Keep the import in a separate staging branch and Draft PR. Review the full diff and path collisions before any merge.

The connected GitHub file/tree API is suitable for read-only inspection and documentation updates, but it does not provide a verified local Git clone/push workflow in this execution. Therefore this plan does not claim that history-preserving import has been executed.

## 4. Preview-only build gate

Before import can be considered ready:
- Confirm supported Node version from `.nvmrc`, `engines`, CI and deployment runtime.
- Confirm npm lockfile version and use `npm ci` rather than an unconstrained install.
- Run `npm test`, `npm run lint`, and `npm run build` in isolated CI.
- Verify API health and frontend-to-API proxy behavior.
- Test streaming responses, error handling, provider selection and MCP startup using local fixtures.
- Verify no test requires real paid provider credentials.
- Run dependency audit and secret scanning against both the pinned tree and Git history.
- Ensure the app's preview cannot access production DBs, provider keys, OAuth secrets, or write-enabled GitHub credentials.

No CI success is claimed; these checks have not been run in an isolated build environment during this audit.

## 5. Workflow policy

Do not copy `build-and-deploy.yml` as-is. It includes release/tag logic and Production target selection.

The monorepo workflow must:
- Trigger only on PRs and approved staging branches.
- Set `permissions: contents: read` by default.
- Use path filters for `apps/ask-chatbot/**`.
- Run install, lint, tests, and build only.
- Avoid `deploy`, `publish`, `release`, production environments, DNS and database migration jobs.
- Pin third-party actions to reviewed full commit SHAs.
- Use no source repository secrets and no real provider keys.

## 6. Acceptance checklist

- [ ] Exact source ref and commit revalidated immediately before import.
- [ ] Git history and all original refs preserved.
- [ ] No path collision with existing monorepo apps/packages.
- [ ] Dependencies and lockfile install deterministically.
- [ ] Unit tests, lint, TypeScript checks and build pass in Preview CI.
- [ ] API health, streaming and frontend proxy tests pass.
- [ ] Secret scan of source tree and history has no unresolved findings.
- [ ] Preview uses isolated credentials and data.
- [ ] Draft PR reviewed; no automatic merge.

## 7. Explicitly out of scope

- Production deployments or custom-domain cutover.
- Publishing npm packages.
- Database migrations or copying user data.
- Moving provider/API secrets.
- Changing source repository branches, workflows, tags, settings or permissions.
- Deleting or archiving source repositories.
- Claiming visual editor, generated-app runtime, GitHub write-back or deployment features that README says are not yet proven.

**Current outcome:** Ask OCode.js is the first migration candidate, but the import is blocked pending a history-preserving Git transfer mechanism and Preview CI validation.

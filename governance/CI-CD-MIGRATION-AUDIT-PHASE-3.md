# CI/CD migration audit — Phase 3

**Snapshot:** 2026-11-19  
**Scope:** Read-only inspection of selected CI and deployment workflows in five priority source repositories.  
**No source workflows were run or changed.**

## 1. Workflow review

| Repository / workflow | Trigger and permissions | Findings | Migration treatment |
|---|---|---|---|
| `ask-chatbot/.github/workflows/ci.yml` | push + pull_request; no explicit top-level permissions | Node 22, npm ci, Vercel config validation, npm test, frontend build. Add explicit least-privilege `contents: read` in a future source PR. | Good candidate for adapted monorepo CI; adjust working-directory and path filters. |
| `ask-chatbot/.github/workflows/build-and-deploy.yml` | push tags `v*`, push branches, PR, workflow_dispatch; reads `secrets.TURBO_TOKEN`; 398 lines | Contains release-target selection and a Production target for release tags. It is unsafe to copy or activate in a staging-only monorepo without removing release/deploy jobs and auditing every target. | Do not migrate as-is. Extract only build/test jobs after review; never transfer secrets. |
| `mcp.auth.ocodejs/.github/workflows/ci.yml` | PR to main, pushes main/feat/fix, workflow_dispatch; `contents: read` | Uses local CI-only DB/Auth placeholders, npm install, tests, Prisma generation/validation, lint and build. | Candidate isolated auth CI. Replace npm install with lockfile-enforcing npm ci if verified compatible; retain local-only test services. |
| `THU365/.github/workflows/thu365-validation.yml` | branch push and PR to main with path filters; `contents: read` | pnpm frozen install, workspace typecheck and Vite build. Uses version tags for actions rather than pinned SHAs. | Candidate workspace CI. Pin third-party actions to reviewed SHAs before production-grade reuse. |
| `OCODEJS/.github/workflows/ci.yml` | push/PR to main; `contents: read` | npm ci, tests, coverage, npm pack dry-run, package availability check and public export smoke test. | Candidate package CI, but map package root and workspace first. |
| `OCODEJS/.github/workflows/npm-release-preflight.yml` | PR to main + workflow_dispatch; `contents: read` | Test, coverage, pack dry-run and package-name check; does not publish. | Safe as a preflight template after package-root verification. |
| `OCODEJS/.github/workflows/publish.yml` | push main, PR, workflow_dispatch, workflow_call; job condition `github.repository_owner == 'npm'`; deploy job has Pages write/id-token permissions | The build job is gated to owner `npm`, so it is not expected to run for OCodejs. It still contains privileged Pages deployment permissions and should not be copied to this monorepo. | Exclude from monorepo; create a separate, explicitly Preview-only Pages workflow only if needed. |
| `cli-hub/.github/workflows/validate.yml` | PR main, push main/feat, workflow_dispatch; `contents: read` | Catalog validation, unit tests, auth tests and Worker tests. | Candidate for a separate catalog/auth test job with path filters. |

## 2. Security and operational observations

1. Several source workflows do not declare explicit least-privilege permissions. New monorepo workflows should declare permissions at workflow/job scope, default to read-only, and elevate only a narrowly scoped job.
2. `ask-chatbot` contains a long deployment workflow with release-tag handling and a Production branch. Never copy it into the monorepo unchanged.
3. The OCODEJS Pages publish workflow has a privileged Pages deployment job even though its build job is gated to the npm organization. It is not an appropriate general monorepo workflow.
4. `mcp.auth.ocodejs` CI uses obvious local-only placeholder credentials and a local test database URL. These are test fixtures, not deployment configuration.
5. Some workflows pin actions to full commit SHAs; others use mutable version tags. Pin and review all third-party actions before adopting them.
6. Workflow inventory is not proof that a workflow has passed. The monorepo audit commit currently has no reported status checks and no PR-triggered workflow runs; no CI success is claimed.
7. No GitHub Actions secrets or environment variables were read. Secret values must never be copied from source repositories.

## 3. Monorepo CI proposal (not yet activated)

Create a small, non-deploying CI workflow only after the first app/package migration PR defines its working directory:
- Trigger on pull_request and push to staging branches only.
- Set default permissions to `contents: read`.
- Use path filters so unrelated projects do not build.
- Install using the repository's committed lockfile and frozen/immutable mode.
- Run format/lint, typecheck, unit tests and build only.
- Do not run deploy, publish, release, database migration, DNS, domain, or production jobs.
- Do not use production secrets; use local fixtures or Preview-scoped secrets only.
- Pin third-party actions to reviewed commit SHAs.

## 4. PR and CI status snapshot

At the time of this audit:
- PR #8 is open, Draft, and not merged.
- The PR #8 head commit returned no combined status entries and no PR-triggered workflow runs through the connected GitHub API.
- PR #1 and PR #2 are now reported by GitHub as merged (timestamps: 2026-11-19 12:18:26Z and 12:22:29Z). This status changed after earlier observations; this audit did not invoke merge operations.
- No claim is made that the monorepo has passing CI.

## 5. Remaining gates

- Inspect all deployment and release workflows in each candidate source, not just the selected samples.
- Build a normalized workflow inventory keyed by source repo/path/ref SHA.
- Determine the monorepo's actual package/workspace layout before writing CI.
- Run a dedicated secret scan against repository history in a controlled environment; this GitHub connector inspection is not a secret scan.
- Prepare per-app migration PRs with isolated tests; never copy Production deploy jobs or source secrets.

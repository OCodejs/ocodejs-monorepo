# Migration plan

## Phase 0 — foundation (this PR)
- Bootstrap the empty repository once on `main`.
- Create the working line `staging/monorepo-foundation` (branch protection is a separate repository-settings task).
- Add governance, inventory snapshot, architecture map, and empty target layout.

## Phase 1 — read-only source audit
For every approved source repository:
1. Capture repository metadata, default branch, visibility, fork parent, archived state, and permissions.
2. Enumerate every branch and tag, recording exact ref names and commit SHAs.
3. Capture commit graph/ancestry and tree manifests; identify overlapping content and generated/vendor assets.
4. Detect secrets, large files, Git LFS objects, submodules, workflows, deployment configuration, and licensing constraints. Never copy secrets into the monorepo.
5. Classify each repository as app, package, service, integration, documentation, infrastructure, upstream fork, duplicate, or out-of-scope.

## Phase 2 — migration design
- Assign a stable project ID and target path for each accepted repository.
- Preserve each source Git history by importing its refs/objects (preferred: mirror/fetch/push from a controlled Git client) and use a documented history-preserving subtree/filter-repo strategy for directory placement.
- Keep original branch tips under collision-safe `imports/<owner>/<repo>/<branch>` refs until review is complete. Never overwrite an existing ref.
- Record source URL, source SHA, source branch/tag, destination ref/path, transformation command, and verification result in a machine-readable manifest.

## Phase 3 — staged import batches
- Import one bounded batch at a time to `staging/*` branches.
- Validate file counts, blob hashes where practical, commit reachability, tags, executable bits, symlinks, LFS pointers/objects, and submodule references.
- Run project-specific tests/builds only after inspecting each project's package manager, runtime, and CI requirements.
- Open draft PRs with per-project evidence. Do not merge automatically.

## Phase 4 — integration and governance
- Establish workspace tooling only after versions and package boundaries are verified.
- Add CI matrix jobs per app/package/service; keep secrets in GitHub Actions environments or external secret stores.
- Configure CODEOWNERS, contribution rules, dependency policy, release strategy, and deployment approvals.
- Production deployment is out of scope and requires separate explicit approval.

## Rollback
Source repositories and refs remain untouched. If a batch fails, close/revert its staging PR or discard only the corresponding staging branch after preserving its manifest and logs. Never rewrite source history.

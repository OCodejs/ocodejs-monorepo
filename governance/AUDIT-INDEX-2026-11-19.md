# OCodeJS Monorepo audit index — 2026-11-19

## Git refs and repository identity
- Exact branch/tag SHA batches: governance/manifests/git-refs-batch-01.json through git-refs-batch-10.json.
- Omitted org repository 0codejs: governance/manifests/git-refs-missing-0codejs.json.
- Related repositories: governance/manifests/related-refs-batch-01.json through related-refs-batch-03.json.
- Enriched per-repository migration decisions: governance/manifests/migration-manifest-2026-11-19.json and governance/MIGRATION-MANIFEST-2026-11-19.md.

## CI/CD and dependency inventory
- Priority repositories: governance/manifests/ci-dependency-paths-core.json.
- Remaining organization/external repositories: ci-dependency-paths-batch-01.json through batch-04.json and ci-dependency-paths-fork-retries.json.

## Reviews
- Fork and ancestry findings: governance/ANCESTRY-AND-MIRROR-REVIEW-2026-11-19.md.
- CI, dependency and sanitized secret-pattern results: governance/CI-CD-DEPENDENCY-SECURITY-AUDIT-2026-11-19.md.
- First source fingerprints: governance/SOURCE-AUDIT-PHASE-1.md.

## Snapshot totals
- 65 repositories (49 OCodejs + 16 related).
- 1,262 branch refs and 3 tag refs.
- 25 GitHub forks with parent metadata.
- 65 default-branch trees inventoried.
- 1,588 workflow-file paths and 148 dependency/deployment configuration paths discovered.

## Import readiness
- Candidate imports: 10.
- Upstream references/forks: 25.
- Quarantine/review: 30.
- No source code has been imported.
- No source repository was modified.
- Full history secret scan and history-preserving Git transport are blocked until a writable Git workspace is available.
- No Production deployment, package publication, domain change, or PR merge was performed by this audit.

# Source tree audit — Phase 2

**Snapshot:** 2026-11-19  
**Branch:** `staging/source-tree-audit`  
**Scope:** Recursive Git tree inspection at the recorded default-branch commit anchors for 10 priority repositories.  
**Source impact:** Read-only. No source repository or source ref was modified.

## 1. Ref-manifest coverage

The preceding staging branch `staging/source-ref-manifest` now contains eight shards covering the 49 repositories in the OCodejs organization and 16 related repositories in zskbot/Velclaw namespaces (65 repositories total). Each entry records default branch, visibility, archived flag, branch names and exact branch-tip SHAs, plus tags and tag target SHAs as returned by GitHub matching-refs.

Files:
- `governance/ref-manifest/01-ocodejs-core.md`
- `governance/ref-manifest/02-ocodejs-docs-tools.md`
- `governance/ref-manifest/03-ocodejs-auth-skills.md`
- `governance/ref-manifest/04-ocodejs-misc.md`
- `governance/ref-manifest/05-ocodejs-platform.md`
- `governance/ref-manifest/06-ocodejs-infrastructure.md`
- `governance/ref-manifest/07-related-repositories-a.md`
- `governance/ref-manifest/08-related-repositories-b.md`

The manifest is a point-in-time snapshot. It does not establish ownership rights for external repositories, branch protection, successful CI, or the absence of secrets.

## 2. Recursive tree inventory

All ten inspected trees returned `truncated=false`.

| Repository | Commit anchor | Files | Package/build manifests | Workflow files | Lockfiles | .env-named files |
|---|---|---:|---:|---:|---:|---:|
| OCodejs/ask-chatbot | `913f47289e066b6f395e65d44d7c13bbbf1f2680` | 387 | 2 | 43 | 1 | 1 |
| OCodejs/mcp.auth.ocodejs | `1fb874ced0e83734b5e5ded62f8adaa0eb1aa5a5` | 76 | 4 | 5 | 1 | 1 |
| OCodejs/THU365 | `9378e567974fba90323284d7e29e87e7d9555ea4` | 157 | 12 | 5 | 1 | 0 |
| OCodejs/ocodejs.github.io | `618c3027fa73d43a5142c494dc06de2b6e8dacbe` | 98 | 0 | 7 | 0 | 0 |
| OCodejs/OCODEJS | `7fb540bb9b8917322212dda1381de001a6afeb7e` | 3,537 | 8 | 61 | 5 | 1 |
| OCodejs/docs-ocodejs | `7a4d89aafd3134b63eefd45835249beafc895eca` | 89 | 2 | 11 | 0 | 0 |
| OCodejs/hello-working | `99cd7421d03fc09afe5ec059e1d156d5e909a15a` | 78 | 1 | 10 | 0 | 0 |
| OCodejs/skills | `f45956b24cb92de032fd1dab74d264651da70e49` | 76 | 1 | 11 | 0 | 0 |
| OCodejs/cli-hub | `bd2372333bc8b22a16565588c644cab1890970f6` | 68 | 2 | 8 | 0 | 2 |
| OCodejs/platform-ocodejs-dev | `9ac83009840dc0377f536a8d198dc64d822bb982` | 379 | 2 | 43 | 2 | 1 |

The `.env` column counts filenames only (for example, `.env.example`); it does not imply a credential leak. No secret values were copied into this report.

## 3. Tree-content comparison

Comparisons use path and Git blob SHA at each recorded default-branch snapshot.

| Pair | Identical blobs at same path | Changed blobs at same path | Files only in first | Files only in second |
|---|---:|---:|---:|---:|
| ask-chatbot vs platform-ocodejs-dev | 349 | 29 | 9 | 1 |
| docs-ocodejs vs hello-working | 67 | 5 | 17 | 6 |
| docs-ocodejs vs skills | 68 | 4 | 17 | 4 |
| hello-working vs skills | 72 | 2 | 4 | 2 |

### Interpretation

- `ask-chatbot` and `platform-ocodejs-dev` are highly similar (349 identical blobs), but they are not identical trees. Both repository metadata responses report `fork=false`; neither has a GitHub parent/source relationship exposed. **Do not delete or collapse either repository.** Keep ask-chatbot as the candidate canonical app and hold platform-ocodejs-dev in quarantine until commit ancestry, issue history, and branch-level divergence are reviewed.
- `docs-ocodejs`, `hello-working`, and `skills` are also close variants. Their trees are distinct, despite substantial shared content. Treat as related snapshots/variants, not proven duplicates. Keep all three sources and preserve all refs.
- The exact overlap of shared files may reflect common generated templates/workflows. A future cleanup should be path-aware and only occur after the original Git histories are imported or otherwise preserved.

## 4. Architecture and CI findings

- `ask-chatbot` and `platform-ocodejs-dev` both have Vite configuration and package manifests. Their tree inventories contain 43 workflow files each, including many generic language/security/deployment workflows. This creates a CI noise and duplicate-deployment risk; do not copy all workflows blindly.
- `mcp.auth.ocodejs` contains Next.js and Cloudflare Wrangler configurations, including a nested token-vault worker. It should remain a separate auth service with isolated Preview secrets and databases.
- `THU365` is a pnpm workspace with multiple app/library manifests, an Expo/mobile app, API artifacts and Wrangler config. It must be migrated as a workspace boundary, not flattened.
- `OCODEJS` contains multiple packages and nested applications (including a cloud-agent app and a framework subtree), multiple lockfiles, and 61 workflow files. This repository is a multi-project source tree; it is not safe to classify it as a single npm utility package without a deeper directory-level ownership map.
- `cli-hub` has a root package and a separate `auth-server` package. Keep static catalog/UI and auth runtime separated.
- `ocodejs.github.io` is workflow-driven Pages/dashboard content with no package manifest at the inspected root; preserve its Pages deployment path separately.
- Documentation repos include Jekyll/Gemfile and a Cloudflare docs MCP worker. Do not assume they are static-only without checking nested runtime code.

## 5. Migration disposition (provisional)

| Source | Decision | Reason |
|---|---|---|
| ask-chatbot | Candidate import to `apps/ask-chatbot` | Distinct app with frontend/backend boundaries; audit workflows before adoption |
| mcp.auth.ocodejs | Candidate import to `services/auth` | Separate Next.js/Auth/Cloudflare runtime |
| THU365 | Candidate import as separate web/mobile workspace | pnpm workspace and native build requirements |
| ocodejs.github.io | Candidate import to `apps/central-dashboard` + docs | Pages publishing must remain isolated |
| OCODEJS | Quarantine for decomposition | Large multi-project tree; map subprojects before import |
| cli-hub | Candidate import to `apps/cli-hub` plus isolated auth service | Separate catalog and auth-server packages |
| docs-ocodejs | Preserve as docs source | Distinct tree; compare against related repos before consolidation |
| hello-working | Quarantine as related docs variant | Distinct tree with high overlap |
| skills | Quarantine as skills/docs variant | Distinct tree with high overlap |
| platform-ocodejs-dev | Quarantine pending ancestry review | 349 shared blobs with ask-chatbot, but not identical |

## 6. Remaining mandatory gates

1. Inspect branch/tag ancestry for the high-overlap pairs; compare merge bases and per-branch tip commits.
2. Inspect all active workflows for write permissions, deployment targets, package publishing, and secret references. Do not transfer workflow secrets.
3. Perform a dedicated secret scan of repository content and history using an approved scanner in a controlled environment. This connector-only tree inventory is not a secret scan.
4. Validate each proposed app/package build in isolated CI without publishing packages or deploying Production.
5. Produce import manifests mapping source repository + exact ref SHA to destination path, including history-preserving strategy.
6. Open separate Draft PRs per migration unit. Do not merge automatically.

## 7. Safety status

- 65 repository ref snapshots recorded in the preceding ref-manifest branch.
- 10 priority default-branch trees inspected; all returned complete, non-truncated trees.
- 4 high-overlap tree comparisons completed.
- No source repository writes, branch changes, PR merges, package publishing, secret transfer, or Production deployment performed.
- No source history imported yet.

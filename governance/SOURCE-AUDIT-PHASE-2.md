# Source Audit — Phase 2

**Snapshot:** 2026-11-19  
**Mode:** Read-only source and CI audit  
**Scope:** 49 OCodejs organization repositories plus 16 related repositories.

## 1. Exact refs completed

- 65 repositories inspected.
- 1,262 branch refs captured with exact object SHAs.
- 3 tag refs captured with exact object SHAs.
- All 65 repositories returned metadata and matching refs successfully.
- Ref details are stored in `governance/ref-manifest/` across eight shards.
- Organization-only subtotal: 681 branches across 49 repositories.
- Related-repository subtotal: 581 branches across 16 repositories.

For annotated tags, the recorded SHA is the tag-object SHA returned by the ref endpoint; a peeled commit SHA has not yet been separately recorded. Ref inventory is a timestamped snapshot and must be refreshed before importing.

## 2. Root tree and build-boundary inspection

| Repository | Files in root tree | Workflow files | Runtime/build indicators |
|---|---:|---:|---|
| ask-chatbot | 387 | 43 | Vite, React, Node/Express, Vitest, npm |
| mcp.auth.ocodejs | 76 | 5 | Next.js, OpenNext/Cloudflare Worker, Prisma, npm |
| THU365 | 157 | 5 | pnpm workspace, Expo/mobile, API/client packages, Wrangler |
| ocodejs.github.io | 98 | 7 | GitHub Pages/Jekyll and central API/dashboard validation |
| OCODEJS | 3,537 | 61 | Multi-package TypeScript/Node workspace, nested Next.js app, multiple lockfiles |
| docs-ocodejs | 89 | 11 | Jekyll/Gemfile, docs MCP Worker |
| hello-working | 78 | 10 | Jekyll/docs, Pages publishing |
| skills | 76 | 11 | Jekyll/docs and Python workflow |
| cli-hub | 68 | 8 | Static catalog/site plus separate auth-server package |
| platform-ocodejs-dev | 379 | 43 | Vite, React, Node/Express, Vitest, npm |

Tree scans completed without GitHub's recursive-tree truncation for these ten default branches.

## 3. Mirror and overlap evidence

### ask-chatbot vs platform-ocodejs-dev

- Both repositories are non-forks according to repository metadata; no parent/source repository was reported.
- Both have package name `ask-ocodejs` and matching root scripts/dependency structure.
- Their default-branch trees contain 378 common paths.
- 349 common paths have identical blob SHAs; 29 common paths differ.
- ask-chatbot has 9 files not present in platform-ocodejs-dev; platform-ocodejs-dev has 1 file not present in ask-chatbot.
- CI workflows are substantially similar, but install behavior differs: ask-chatbot uses `npm ci`, while platform-ocodejs-dev uses `npm install`.
- Conclusion: these are highly overlapping code lines, but not identical snapshots and not proven Git forks. **Do not import both as independent apps.** Quarantine platform-ocodejs-dev pending owner confirmation and commit-history analysis; nominate ask-chatbot as the provisional canonical app only, not an approved migration decision.

### docs-ocodejs, hello-working, skills

- All three are reported as non-forks; no parent/source repository was returned.
- docs-ocodejs vs hello-working: 72 common paths, 67 identical blobs, 5 differing blobs; 17 files only in docs-ocodejs and 6 only in hello-working.
- docs-ocodejs vs skills: 72 common paths, 68 identical blobs, 4 differing blobs; 17 files only in docs-ocodejs and 4 only in skills.
- hello-working vs skills: 74 common paths, 72 identical blobs, 2 differing blobs; 4 files only in hello-working and 2 only in skills.
- README, homepage HTML, and configuration files differ. Their workflow families overlap strongly.
- Conclusion: these are closely related copies/templates with distinct content, not exact duplicates. Keep separate until purpose and canonical ownership are confirmed; do not collapse them based on branch names.

## 4. CI snapshot — latest five workflow runs per priority repository

| Repository | Latest observed result | Assessment |
|---|---|---|
| ask-chatbot | Latest OSSAR, Code Quality, MobSF, Trivy, PHPMD all success | Green sample |
| mcp.auth.ocodejs | Latest Code Quality and main Auth CI / Pages runs success | Green sample |
| THU365 | Latest Code Quality and native checks success | Green sample |
| ocodejs.github.io | Latest Control API, Pages build and Code Quality success | Green sample |
| OCODEJS | Latest Code Quality success; main CI failed; Publish skipped | **Needs investigation** |
| docs-ocodejs | Daily Spending Forecast failed repeatedly on Nov 14–18 | **Needs investigation** |
| hello-working | Pages build and Documentation validation failed on Oct 31 | Historical failures |
| skills | Documentation validation and Conda install failed Oct 29; latest scheduled quality run succeeded | Historical failures |
| cli-hub | Latest CodeQL, quality, Pages deployment and catalog validation success | Green sample |
| platform-ocodejs-dev | Latest OSSAR success; MobSF and CodeScan failed; NeuraLegion queued | **Needs investigation** |

### Failure-step findings

- OCODEJS main CI run `44504910227`: dependency installation succeeded; **Build and run tests** failed; package validation and publish preflight steps were skipped.
- docs-ocodejs run `44368466568`: Daily Spending Forecast failed at **Generate agentic run info**; later steps were skipped. The workflow appears unrelated to the documentation site's build and should be assessed for removal or isolation only in a separate PR.
- hello-working run `41208498395`: local Markdown link validation failed.
- skills run `40964275259`: Conda dependency installation failed.
- platform-ocodejs-dev run `44367535904`: Python setup failed before MobSF scan; CodeScan run `44227768974` failed during analysis.
- Run details show failing step names, but logs were not retrieved in this pass; root causes are not yet proven.

## 5. Secret-handling and deployment findings

- Tree scans found tracked `.env.example` files in ask-chatbot, mcp.auth.ocodejs and platform-ocodejs-dev, and auth-server example files in cli-hub. These are examples, not evidence of exposed secrets.
- ocodejs.github.io has a dedicated secret-file tracking guard workflow that rejects tracked local environment files.
- No secret values were copied into this report. A complete history-aware secret scan is still pending and must run in a controlled scanner environment with findings redacted.
- mcp.auth.ocodejs config uses Cloudflare Workers/OpenNext, preview URLs and query-string redaction. Its database/auth environment must remain isolated from Production during migration.
- GitHub Pages, static Vite, Next.js/OpenNext Worker, and Expo/mobile require separate build/deployment targets. A single root build command would be unsafe.

## 6. Migration decisions — provisional

| Source | Decision now | Reason |
|---|---|---|
| ask-chatbot | Candidate canonical app; no import yet | Active app; overlapping sibling needs quarantine first |
| platform-ocodejs-dev | Quarantine | 349 identical blobs with ask-chatbot, 29 differing shared paths |
| mcp.auth.ocodejs | Separate auth service candidate | Independent Next.js/OpenNext/Prisma boundary |
| THU365 | Separate web/mobile app family candidate | pnpm workspace and native build requirements |
| ocodejs.github.io | Separate dashboard/docs app candidate | Pages/Jekyll and central dashboard workflows |
| OCODEJS | Package/workspace decomposition candidate | 3,537 files and nested apps; not a simple package move |
| cli-hub | Separate static app plus auth boundary review | Distinct catalog and auth-server runtime |
| docs-ocodejs | Docs candidate, pending workflow cleanup | Distinct docs content and Jekyll boundary |
| hello-working | Quarantine / purpose confirmation | Closely related to docs/skills, historical validation failures |
| skills | Skills candidate, pending purpose confirmation | Distinct files but highly overlapping workflow/template layer |
| 16 external repositories | Hold for ownership review | Organization membership and import authorization are not established by ref visibility |

## 7. Next gates

1. Inspect the failing OCODEJS CI logs and correct root cause only in a separate source PR after user authorization.
2. Inspect the docs-ocodejs scheduled spending workflow; do not execute or enable spending-related workflows during monorepo migration.
3. Reconcile canonical source ownership for ask-chatbot/platform-ocodejs-dev and docs/hello-working/skills.
4. Capture commit ancestry and annotated-tag peeled commit SHAs; branch/tag refs are already snapshotted.
5. Perform a history-aware secret scan with redacted output.
6. Define independent CI workflows and deployment adapters for each app/package/service.
7. Only then create history-preserving import PRs, one source at a time.

## 8. Safety status

- Source repositories modified: **0**.
- Source refs rewritten or deleted: **0**.
- Source history imported: **0**.
- Production deployments: **0**.
- PRs merged by this audit execution: **0**.
- PR #2 was subsequently observed as merged at `2026-11-19T12:22:29Z`; GitHub attributes the merge to account `zskbot`. This execution did not invoke a merge action.
- PR #7 remains Draft/Open and unmerged.
- Repository visibility currently reads **public**; an earlier audit snapshot recorded it as private. This execution did not change repository visibility. Confirm this setting is intentional because the repository now contains governance and source inventory metadata.
- All manifest/report commits are on `staging/source-ref-manifest`.
- The foundation PR #1 was also observed as merged during the previous audit. This execution did not initiate either merge and did not write directly to `main`.

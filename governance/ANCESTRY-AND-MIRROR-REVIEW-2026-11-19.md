# Fork, mirror and commit-ancestry review — 2026-11-19

## Coverage
- 65 repositories: 49 in OCodejs and 16 related external repositories.
- 1,262 branch refs and 3 tag refs captured with exact object SHAs.
- 25 repositories are GitHub forks; parent metadata is recorded in the migration manifest.
- No source refs were modified.

## Confirmed relationships and comparisons

| Pair | Evidence | Finding | Migration consequence |
|---|---|---|---|
| OCodejs/docs.mdx ↔ zskbot/docs-1 | GitHub compare on main | Identical; common SHA 4de977888b79048b5cc66dd1c43d010eb099eb0c | Do not import twice. Keep fork relationship and select one canonical docs source only after ownership review. |
| OCodejs/OCODEJS ↔ zskbot/OCodeJS | Fork metadata + cross-fork compare | zskbot fork is 19 commits behind OCodejs main | OCodejs/OCODEJS is canonical for the package candidate; do not import both. |
| OCodejs/.agents-skills-prisma-cli-SKILL.md ↔ zskbot/ask-ocodejs | Fork metadata + cross-fork compare | Shared fork network; compare shows substantial divergence (66 commits in comparison result) and distinct file changes | Treat the one-file-named repository as a fork snapshot, not an independent application. |
| OCodejs/ask-chatbot ↔ OCodejs/platform-ocodejs-dev | Main commit tree SHAs | 71a1df75e266a4dddd6a2552e60b2574f625555d vs c92a5c80b65ef3763ab2a5c090a53971f82d5aad | Not identical root trees. Branch overlap alone is not proof of a mirror; quarantine platform until its app/service boundaries are inspected. |
| OCodejs/docs-ocodejs ↔ OCodejs/hello-working ↔ OCodejs/skills | Main commit tree SHAs | db276ba61cfcdfd3823738a4eb34839cde305ef8, 763b1efbe4755bdd40b97845543d976a57988d44, 1aef11ce15bb9facd7dd12f28d62c03cb13548e8 | Distinct root trees. Shared branch-name families are not enough to merge; keep all three quarantined pending content/license review. |

## Fork inventory
The 25 fork records and exact parents are in the migration manifest. Most are upstream samples, libraries, docs, or tooling forks (for example proof-html, opencode, pnpm, probot, surge, GitHub Pages, GitHub MCP Server, and skills). These should normally remain external references rather than be copied into the OCodeJS product monorepo.

## Limits
- The comparisons above are targeted, not an exhaustive all-pairs comparison of 65 repositories.
- Root tree hashes detect exact tree equality only; different tree hashes do not prove that two projects share no code.
- Full ancestry graphs across unrelated repositories require fetching their Git object databases. GitHub's compare endpoint is useful for fork networks, not arbitrary unrelated repositories.
- Exact branch/tag SHA manifests are immutable audit snapshots, not a promise that upstream refs will remain unchanged.

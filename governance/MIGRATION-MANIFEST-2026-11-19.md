# Migration manifest — 2026-11-19

**Scope:** 49 OCodejs organization repositories and 16 related repositories. **No source repository was modified.** All decisions are provisional gates, not approval to rewrite or delete source repositories.

## Summary

- Repositories: 65
- Branch refs: 1262
- Tag refs: 3
- Candidate imports: 10
- Upstream references/forks: 25
- Quarantine/review: 27
- Legacy candidates requiring comparison: 9

## Per-repository decision matrix

| Repository | Branches | Tags | Fork / parent | Decision | Proposed target | Priority |
|---|---:|---:|---|---|---|---|
| `OCodejs/ask-chatbot` | 74 | 0 | no | candidate-import | apps/ask-chatbot | P0 |
| `OCodejs/mcp.auth.ocodejs` | 26 | 0 | no | candidate-import | services/auth | P0 |
| `OCodejs/THU365` | 38 | 0 | no | candidate-import | apps/thu365-web + apps/thu365-mobile | P0 |
| `OCodejs/ocodejs.github.io` | 54 | 0 | no | candidate-import | apps/central-dashboard + docs/central | P0 |
| `OCodejs/OCODEJS` | 77 | 1 | no | candidate-import | packages/ocode-js | P0 |
| `OCodejs/docs.mdx` | 1 | 0 | yes: zskbot/docs-1 | upstream-reference | external/upstream-docs | P3 |
| `OCodejs/docs` | 42 | 0 | no | quarantine-compare | docs/shared | P1 |
| `OCodejs/skills-agentc` | 10 | 0 | no | review-before-import | integrations/skills-agentc | P2 |
| `OCodejs/docs.rtf` | 3 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/cli` | 1 | 0 | no | quarantine-compare | undetermined | P1 |
| `OCodejs/proof-html` | 1 | 0 | yes: anishathalye/proof-html | upstream-reference | external/upstream/proof-html | P3 |
| `OCodejs/docs-ocodejs` | 44 | 0 | no | quarantine-compare | docs/ocodejs | P1 |
| `OCodejs/octocat.github.io` | 1 | 0 | yes: octocat/octocat.github.io | upstream-reference | external/upstream/octocat-pages | P3 |
| `OCodejs/annotated_implementation_skill` | 1 | 0 | yes: vpj/annotated_implementation_skill | upstream-reference | external/upstream/annotated-skill | P3 |
| `OCodejs/opencode` | 2 | 0 | yes: anomalyco/opencode | upstream-reference | external/upstream/opencode | P3 |
| `OCodejs/demo-repository` | 2 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/dotfiles.github.com` | 1 | 0 | yes: dotfiles/dotfiles.github.com | upstream-reference | external/upstream/dotfiles | P3 |
| `OCodejs/Authentication` | 6 | 0 | no | review-before-import | services/auth-legacy | P1 |
| `OCodejs/github-pages` | 1 | 0 | yes: skills/github-pages | upstream-reference | external/upstream/github-pages | P3 |
| `OCodejs/SKILLS.SH` | 1 | 0 | yes: vercel-labs/skills | upstream-reference | external/upstream/skills-sh | P3 |
| `OCodejs/v0-chat` | 1 | 0 | yes: zskbot/v0-chat | upstream-reference | external/upstream/v0-chat | P3 |
| `OCodejs/.agents-skills-prisma-cli-SKILL.md` | 1 | 0 | yes: zskbot/ask-ocodejs | upstream-reference | external/upstream/ask-ocodejs-skill | P3 |
| `OCodejs/spec` | 1 | 0 | yes: devcontainers/spec | upstream-reference | external/upstream/devcontainers-spec | P3 |
| `OCodejs/hello-working` | 41 | 0 | no | quarantine-compare | undetermined | P2 |
| `OCodejs/Cloudxx` | 1 | 0 | yes: Velclaw/Cloudxx | upstream-reference | external/upstream/velclaw-cloudxx | P3 |
| `OCodejs/probot` | 1 | 0 | yes: probot/probot | upstream-reference | external/upstream/probot | P3 |
| `OCodejs/surge` | 1 | 0 | yes: sintaxi/surge | upstream-reference | external/upstream/surge | P3 |
| `OCodejs/OCode-js-pages` | 3 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/repository` | 1 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/studio` | 1 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/chatbot` | 2 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/nextjs-boilerplate` | 1 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/gh-aw` | 1 | 0 | yes: zskbot/gh-aw | upstream-reference | external/upstream/gh-aw | P3 |
| `OCodejs/skills` | 41 | 0 | no | quarantine-compare | integrations/skills | P1 |
| `OCodejs/ocodejs-legal` | 1 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/cli-hub` | 55 | 0 | no | candidate-import | apps/cli-hub | P0 |
| `OCodejs/vscode-codeql-starter` | 1 | 0 | yes: zskbot/vscode-codeql-starter | upstream-reference | external/upstream/vscode-codeql-starter | P3 |
| `OCodejs/Signs` | 1 | 0 | yes: zskbot/Signs | upstream-reference | external/upstream/signs | P3 |
| `OCodejs/.github` | 44 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/aitools-agent` | 1 | 0 | no | quarantine-review | undetermined | P2 |
| `OCodejs/qstash-js` | 1 | 0 | yes: zskbot/qstash-js | upstream-reference | external/upstream/qstash-js | P3 |
| `OCodejs/Spoon-Knife` | 1 | 0 | yes: octocat/Spoon-Knife | upstream-reference | external/upstream/spoon-knife | P3 |
| `OCodejs/pnpm` | 1 | 0 | yes: pnpm/pnpm | upstream-reference | external/upstream/pnpm | P3 |
| `OCodejs/documentation` | 1 | 0 | yes: npm/documentation | upstream-reference | external/upstream/npm-documentation | P3 |
| `OCodejs/auth-gateway-phase-1-2` | 1 | 0 | yes: zskbot/Authentication | upstream-reference | external/upstream/authentication | P2 |
| `OCodejs/github-mcp-server` | 1 | 0 | yes: HT-TOL/github-mcp-server | upstream-reference | external/upstream/github-mcp-server | P3 |
| `OCodejs/host` | 24 | 0 | no | review-before-import | apps/host-console | P1 |
| `OCodejs/platform-ocodejs-dev` | 64 | 0 | no | quarantine-compare | undetermined | P1 |
| `OCodejs/0codejs` | 1 | 0 | no | quarantine | undetermined | P2 |
| `zskbot/ask-ocodejs` | 75 | 1 | no | candidate-import | apps/ask-ocodejs | P0 |
| `Velclaw/.ocodejs` | 41 | 0 | no | quarantine-compare | undetermined | P1 |
| `Velclaw/OCodejs` | 55 | 1 | no | quarantine-review | undetermined | P2 |
| `Velclaw/Velclaw-OCodejs` | 138 | 0 | no | quarantine-review | undetermined | P1 |
| `zskbot/OCodejs-Profile` | 1 | 0 | no | candidate-import | apps/account-profile | P1 |
| `Velclaw/OCodejs-docs` | 32 | 0 | no | quarantine-compare | docs/velclaw-ocodejs | P1 |
| `zskbot/ocodejs-api` | 5 | 0 | no | candidate-import | services/central-api | P0 |
| `Velclaw/OCodejs-VelClaw` | 38 | 0 | no | quarantine-review | undetermined | P2 |
| `zskbot/ocodejs-web4s-bridge` | 9 | 0 | no | candidate-import | integrations/web4s-bridge | P1 |
| `zskbot/docs-ocodejs` | 58 | 0 | no | quarantine-compare | docs/legacy-mirror | P1 |
| `zskbot/OCodeJS` | 1 | 0 | yes: OCodejs/OCODEJS | upstream-reference | packages/ocode-js | P2 |
| `zskbot/feat-ocodejs-chatbot-integration` | 1 | 0 | yes: OCodejs/docs | upstream-reference | undetermined | P2 |
| `Velclaw/ocode.js` | 54 | 0 | no | quarantine-review | undetermined | P2 |
| `zskbot/ocode.js` | 23 | 0 | no | quarantine-review | undetermined | P2 |
| `zskbot/cli-ocode.js` | 27 | 0 | no | quarantine-review | undetermined | P2 |
| `zskbot/www.ocode.js` | 23 | 0 | no | quarantine-review | apps/homepage | P1 |

## Rules before an import PR

1. Import only from a pinned source commit SHA recorded in the ref manifests.
2. Preserve source commit ancestry using a full Git transport (mirror clone/subtree or equivalent); a file copy or synthetic GitHub contents commit is not history preservation.
3. Never rewrite source branches, delete source repositories, or merge an import PR automatically.
4. Keep app, auth, API, docs, mobile, and static-hosting deployment boundaries separate until their build/test contracts pass in Preview.
5. Exclude all real credentials, environment files, database dumps, signing material, and user data. Recreate environment variables as Preview-only secret references.
6. Forks of third-party upstream repositories remain external references unless an explicit license/ownership review approves vendoring.
7. Resolve ambiguous source identities and likely mirrors before creating import PRs.

Full ref SHA data is retained in `governance/manifests/git-refs-*.json` and `governance/manifests/related-refs-*.json`. Full enriched records are in `governance/manifests/migration-manifest-2026-11-19.json`.

# Migration decision manifest — 2026-11-19

## Coverage
- Organization repositories: 49 expected
- Related repositories: 16 expected
- Captured repositories: 65
- Branch refs with exact SHA: 1262
- Tag refs with exact SHA: 3

## Rules
- Preserve source repositories and history until a dedicated import PR is reviewed.
- Never copy secrets, private user data, production database contents, signing keys, or OAuth credentials.
- Third-party forks remain external dependencies unless licensing and ownership are reviewed.
- Duplicate candidates remain quarantined until tree hashes and ancestry are compared.
- A candidate-import decision is a proposed destination, not approval to import or merge.

## Per-repository disposition

| Repository | Default | Branches | Tags | Fork parent | Proposed destination | Decision |
|---|---|---:|---:|---|---|---|
| OCodejs/ask-chatbot | main | 74 | 0 | — | apps/ask-chatbot | candidate-import |
| OCodejs/mcp.auth.ocodejs | main | 26 | 0 | — | services/auth | candidate-import |
| OCodejs/THU365 | main | 38 | 0 | — | apps/thu365-web + apps/thu365-mobile | candidate-import |
| OCodejs/ocodejs.github.io | main | 54 | 0 | — | apps/central-dashboard + docs | candidate-import |
| OCodejs/OCODEJS | main | 77 | 1 | — | packages/ocode-js | candidate-import |
| OCodejs/docs.mdx | main | 1 | 0 | zskbot/docs-1 | docs/* | quarantine-compare |
| OCodejs/docs | main | 42 | 0 | — | docs/* | quarantine-compare |
| OCodejs/skills-agentc | main | 10 | 0 | — | integrations/skills | candidate-import |
| OCodejs/docs.rtf | main | 3 | 0 | — | docs/* | quarantine-compare |
| OCodejs/cli | main | 1 | 0 | — | unassigned/cli | hold-for-review |
| OCodejs/proof-html | master | 1 | 0 | anishathalye/proof-html | third-party-forks/proof-html | external-dependency-or-quarantine |
| OCodejs/docs-ocodejs | main | 44 | 0 | — | docs/* | quarantine-compare |
| OCodejs/octocat.github.io | master | 1 | 0 | octocat/octocat.github.io | third-party-forks/octocat.github.io | external-dependency-or-quarantine |
| OCodejs/annotated_implementation_skill | main | 1 | 0 | vpj/annotated_implementation_skill | third-party-forks/annotated_implementation_skill | external-dependency-or-quarantine |
| OCodejs/opencode | dev | 2 | 0 | anomalyco/opencode | third-party-forks/opencode | external-dependency-or-quarantine |
| OCodejs/demo-repository | main | 2 | 0 | — | private-scope/demo-repository | hold-private |
| OCodejs/dotfiles.github.com | master | 1 | 0 | dotfiles/dotfiles.github.com | third-party-forks/dotfiles.github.com | external-dependency-or-quarantine |
| OCodejs/Authentication | main | 6 | 0 | — | unassigned/Authentication | hold-for-review |
| OCodejs/github-pages | main | 1 | 0 | skills/github-pages | third-party-forks/github-pages | external-dependency-or-quarantine |
| OCodejs/SKILLS.SH | main | 1 | 0 | vercel-labs/skills | third-party-forks/SKILLS.SH | external-dependency-or-quarantine |
| OCodejs/v0-chat | main | 1 | 0 | zskbot/v0-chat | third-party-forks/v0-chat | external-dependency-or-quarantine |
| OCodejs/.agents-skills-prisma-cli-SKILL.md | main | 1 | 0 | zskbot/ask-ocodejs | third-party-forks/.agents-skills-prisma-cli-SKILL.md | external-dependency-or-quarantine |
| OCodejs/spec | main | 1 | 0 | devcontainers/spec | third-party-forks/spec | external-dependency-or-quarantine |
| OCodejs/hello-working | main | 41 | 0 | — | docs/* | quarantine-compare |
| OCodejs/Cloudxx | main | 1 | 0 | Velclaw/Cloudxx | third-party-forks/Cloudxx | external-dependency-or-quarantine |
| OCodejs/probot | master | 1 | 0 | probot/probot | third-party-forks/probot | external-dependency-or-quarantine |
| OCodejs/surge | master | 1 | 0 | sintaxi/surge | third-party-forks/surge | external-dependency-or-quarantine |
| OCodejs/OCode-js-pages | main | 3 | 0 | — | unassigned/OCode-js-pages | hold-for-review |
| OCodejs/repository | main | 1 | 0 | — | unassigned/repository | hold-for-review |
| OCodejs/studio | main | 1 | 0 | — | unassigned/studio | hold-for-review |
| OCodejs/chatbot | main | 2 | 0 | — | unassigned/chatbot | hold-for-review |
| OCodejs/nextjs-boilerplate | main | 1 | 0 | — | private-scope/nextjs-boilerplate | hold-private |
| OCodejs/gh-aw | main | 1 | 0 | zskbot/gh-aw | third-party-forks/gh-aw | external-dependency-or-quarantine |
| OCodejs/skills | main | 41 | 0 | — | docs/* | quarantine-compare |
| OCodejs/ocodejs-legal | main | 1 | 0 | — | unassigned/ocodejs-legal | hold-for-review |
| OCodejs/cli-hub | main | 55 | 0 | — | apps/cli-hub | candidate-import |
| OCodejs/vscode-codeql-starter | main | 1 | 0 | zskbot/vscode-codeql-starter | third-party-forks/vscode-codeql-starter | external-dependency-or-quarantine |
| OCodejs/Signs | main | 1 | 0 | zskbot/Signs | third-party-forks/Signs | external-dependency-or-quarantine |
| OCodejs/.github | main | 44 | 0 | — | unassigned/.github | hold-for-review |
| OCodejs/aitools-agent | main | 1 | 0 | — | private-scope/aitools-agent | hold-private |
| OCodejs/qstash-js | main | 1 | 0 | zskbot/qstash-js | third-party-forks/qstash-js | external-dependency-or-quarantine |
| OCodejs/Spoon-Knife | main | 1 | 0 | octocat/Spoon-Knife | third-party-forks/Spoon-Knife | external-dependency-or-quarantine |
| OCodejs/pnpm | main | 1 | 0 | pnpm/pnpm | third-party-forks/pnpm | external-dependency-or-quarantine |
| OCodejs/documentation | main | 1 | 0 | npm/documentation | third-party-forks/documentation | external-dependency-or-quarantine |
| OCodejs/auth-gateway-phase-1-2 | main | 1 | 0 | zskbot/Authentication | third-party-forks/auth-gateway-phase-1-2 | external-dependency-or-quarantine |
| OCodejs/github-mcp-server | main | 1 | 0 | HT-TOL/github-mcp-server | third-party-forks/github-mcp-server | external-dependency-or-quarantine |
| OCodejs/host | main | 24 | 0 | — | integrations/velclaw | external-or-quarantine |
| OCodejs/platform-ocodejs-dev | main | 64 | 0 | — | quarantine/platform-ocodejs-dev | quarantine |
| zskbot/ask-ocodejs | main | 75 | 1 | — | unassigned/ask-ocodejs | hold-for-review |
| Velclaw/.ocodejs | main | 41 | 0 | — | unassigned/.ocodejs | hold-for-review |
| Velclaw/OCodejs | main | 55 | 1 | — | private-scope/OCodejs | hold-private |
| Velclaw/Velclaw-OCodejs | main | 138 | 0 | — | integrations/velclaw | external-or-quarantine |
| zskbot/OCodejs-Profile | main | 1 | 0 | — | apps/account-profile | candidate-import |
| Velclaw/OCodejs-docs | main | 32 | 0 | — | docs/* | quarantine-compare |
| zskbot/ocodejs-api | main | 5 | 0 | — | unassigned/ocodejs-api | hold-for-review |
| Velclaw/OCodejs-VelClaw | main | 38 | 0 | — | integrations/velclaw | external-or-quarantine |
| zskbot/ocodejs-web4s-bridge | main | 9 | 0 | — | integrations/skills | candidate-import |
| zskbot/docs-ocodejs | main | 58 | 0 | — | docs/* | quarantine-compare |
| zskbot/OCodeJS | main | 1 | 0 | OCodejs/OCODEJS | third-party-forks/OCodeJS | external-dependency-or-quarantine |
| zskbot/feat-ocodejs-chatbot-integration | main | 1 | 0 | OCodejs/docs | third-party-forks/feat-ocodejs-chatbot-integration | external-dependency-or-quarantine |
| Velclaw/ocode.js | main | 54 | 0 | — | unassigned/ocode.js | hold-for-review |
| zskbot/ocode.js | main | 23 | 0 | — | unassigned/ocode.js | hold-for-review |
| zskbot/cli-ocode.js | main | 27 | 0 | — | unassigned/cli-ocode.js | hold-for-review |
| zskbot/www.ocode.js | main | 23 | 0 | — | unassigned/www.ocode.js | hold-for-review |
| OCodejs/0codejs | main | 1 | 0 | — | private-scope/0codejs | hold-private |

Full metadata and exact refs remain in the batch JSON files under `governance/manifests/`.

## Import gate
History-preserving imports require Git transport that can push original commit objects and all refs (for example a controlled mirror push or git-filter-repo workflow followed by explicit ref mapping). The currently available GitHub content/tree/commit API creates new commit objects and cannot faithfully reproduce original author/committer timestamps, signatures, tags, and full branch graph. Therefore no source-code import PR is fabricated in this phase.

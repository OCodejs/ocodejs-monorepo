# OCode.js repository inventory (initial discovery)

This is a discovery snapshot, not an authorization to migrate every repository. Branch counts are the results observed during the initial GitHub inventory; branch tips and commit ancestry must be re-read immediately before import.

## OCodejs organization repositories

| Repository | Branches observed | Initial disposition |
|---|---:|---|
| ask-chatbot | 74 | In-scope app candidate |
| mcp.auth.ocodejs | 26 | In-scope auth service candidate |
| 0codejs | 1 | Review identity/legacy |
| THU365 | 38 | In-scope app candidate |
| ocodejs.github.io | 54 | In-scope homepage/docs platform candidate |
| OCODEJS | 77 | In-scope core candidate; compare with .github and mirrors |
| docs.mdx | 1 | Review documentation source |
| docs | 42 | In-scope docs candidate; compare with docs-ocodejs and hello-working |
| skills-agentc | 10 | In-scope skills candidate |
| docs.rtf | 3 | Review format/legacy |
| cli | 1 | In-scope CLI candidate |
| proof-html | 1 | Review/demo |
| docs-ocodejs | 44 | In-scope docs candidate; compare with docs and hello-working |
| octocat.github.io | 1 | Exclude unless ownership/purpose confirmed |
| annotated_implementation_skill | 1 | Review skill source |
| opencode | 2 | Review upstream/fork status |
| demo-repository | 2 | Exclude unless OCode.js-specific work confirmed |
| dotfiles.github.com | 1 | Exclude unless OCode.js-specific work confirmed |
| Authentication | 6 | In-scope auth candidate; compare with mcp.auth.ocodejs |
| github-pages | 1 | Review hosting template |
| SKILLS.SH | 1 | Review upstream/fork status |
| v0-chat | 1 | Review integration/app candidate |
| .agents-skills-prisma-cli-SKILL.md | 1 | Review skill artifact |
| spec | 1 | Review specifications |
| hello-working | 41 | Compare with docs/docs-ocodejs/skills; likely sync/mirror candidate |
| Cloudxx | 1 | Review infrastructure/auth lineage |
| probot | 1 | Exclude unless customized OCode.js fork confirmed |
| surge | 1 | Exclude unless customized OCode.js fork confirmed |
| OCode-js-pages | 3 | In-scope site candidate |
| repository | 1 | Review purpose |
| studio | 1 | Review app candidate |
| chatbot | 2 | Compare with ask-chatbot |
| nextjs-boilerplate | 1 | Review template |
| gh-aw | 1 | Review automation/upstream status |
| skills | 41 | In-scope skills candidate; compare with docs/hello-working |
| ocodejs-legal | 1 | In-scope legal/docs candidate |
| cli-hub | 55 | In-scope CLI hub candidate |
| vscode-codeql-starter | 1 | Review security template/upstream status |
| Signs | 1 | Review purpose |
| .github | 44 | In-scope org automation candidate; compare with OCODEJS |
| aitools-agent | 1 | Review integration candidate |
| qstash-js | 1 | Exclude unless customized OCode.js fork confirmed |
| Spoon-Knife | 1 | Exclude (GitHub sample) |
| pnpm | 1 | Exclude unless customized fork confirmed |
| documentation | 1 | Review docs candidate |
| auth-gateway-phase-1-2 | 1 | In-scope auth-gateway candidate |
| github-mcp-server | 1 | Review upstream/customization before inclusion |
| host | 24 | Review hosting/Velclaw boundary |
| platform-ocodejs-dev | 64 | In-scope platform candidate |

## Related repositories outside the OCodejs organization

These were discovered by owner/name search. Their presence does not imply permission to import; verify access, ownership, fork status, and intended scope before any migration.

| Repository | Branches observed |
|---|---:|
| zskbot/ask-ocodejs | 75 |
| Velclaw/.ocodejs | 41 |
| Velclaw/OCodejs | 55 |
| Velclaw/Velclaw-OCodejs | 138 |
| zskbot/OCodejs-Profile | 1 |
| Velclaw/OCodejs-docs | 32 |
| zskbot/ocodejs-api | 5 |
| Velclaw/OCodejs-VelClaw | 38 |
| zskbot/ocodejs-web4s-bridge | 9 |
| zskbot/docs-ocodejs | 58 |
| zskbot/OCodeJS | 1 |
| zskbot/feat-ocodejs-chatbot-integration | 1 |
| Velclaw/ocode.js | 54 |
| zskbot/ocode.js | 23 |
| zskbot/cli-ocode.js | 27 |
| zskbot/www.ocode.js | 23 |

## Important discovery notes
- The OCodejs organization search returned 49 repositories and 681 branch refs in the initial pass.
- Similar branch-name patterns occur across `docs`, `docs-ocodejs`, `hello-working`, and `skills`, and across `.github` and `OCODEJS`. Compare tree and commit ancestry before classifying them as duplicates or mirrors.
- The earlier lookup for `zskbot/ocodejs-cli` did not resolve. `OCodejs/cli-hub` and `zskbot/cli-ocode.js` are known candidates; do not silently substitute one for another.
- This file is a preliminary index. It is not a complete ref manifest: record every branch name, commit SHA, tag, default branch, visibility, fork parent, and last-updated timestamp in the next inventory pass before importing.

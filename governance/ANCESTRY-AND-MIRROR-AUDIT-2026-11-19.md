# Fork, mirror and ancestry comparison — 2026-11-19

## Exact tree fingerprints

| Repository | Default commit | Root tree SHA | Parent commits |
|---|---|---|---|
| OCodejs/docs-ocodejs | `7a4d89aafd3134b63eefd45835249beafc895eca` | `db276ba61cfcdfd3823738a4eb34839cde305ef8` | `fbf32aef5fcd30ea1e1a464e52c94433e08534ef` |
| OCodejs/hello-working | `99cd7421d03fc09afe5ec059e1d156d5e909a15a` | `763b1efbe4755bdd40b97845543d976a57988d44` | `a01321df41789c323aec01fe26de36ba7d6cb93b` |
| OCodejs/skills | `f45956b24cb92de032fd1dab74d264651da70e49` | `1aef11ce15bb9facd7dd12f28d62c03cb13548e8` | `886bce679cdda287c44574eff40097a3de8546da` |
| OCodejs/ask-chatbot | `913f47289e066b6f395e65d44d7c13bbbf1f2680` | `71a1df75e266a4dddd6a2552e60b2574f625555d` | two parents |
| OCodejs/platform-ocodejs-dev | `9ac83009840dc0377f536a8d198dc64d822bb982` | `c92a5c80b65ef3763ab2a5c090a53971f82d5aad` | no parents reported |
| OCodejs/docs | `3652201116ef59e7a28ae426ab89cae2d4b7be18` | `20ee13a2fcc828818f6d05599045bc8c1eed58b7` | `6700a1e9e986d4526637ebadc56d75cde240d91f` |
| zskbot/docs-ocodejs | `98eadbfaecab2042f514b380b86d9544b60f2add` | `c5dea69bba7a63872797135cf1934ba4d718caf8` | two parents |
| Velclaw/OCodejs-docs | `1f8580543ff03bc678516d38cd1273325dd0b6cc` | `e8f397e2ebd98780de5b5bc617353a2c07ff2ba9` | two parents |

The three OCodejs docs/hello-working/skills root tree SHAs are different. Their overlapping branch names and similar Jekyll/Cloudflare file layouts do not establish identical content or ancestry.

The ask-chatbot and platform-ocodejs-dev root trees are also different. Their default trees have 520 and 512 entries respectively and share a highly similar workflow family, but this alone does not prove a fork or mirror. platform-ocodejs-dev reports no parent commits on its current main tip. Keep both isolated until a path-level diff and full commit graph are compared.

## Fork ancestry comparisons

| Fork | Declared parent | Compare result | Interpretation |
|---|---|---|---|
| zskbot/OCodeJS | OCodejs/OCODEJS | Parent main is 19 commits ahead; fork tip is an ancestor of parent main (0 ahead, 19 behind) | Fork has no unique commits on that compared default tip; do not import as an independent app |
| zskbot/feat-ocodejs-chatbot-integration | OCodejs/docs | Parent main is 1 commit ahead; fork tip is an ancestor (0 ahead, 1 behind) | No fork-only commit on compared default tip |
| OCodejs/docs.mdx | zskbot/docs-1 | Compared commit is identical to parent main | Exact same commit at inspected default tip |
| Other forks | Various upstream projects | Metadata parent recorded in ref manifests; not all compared | Keep as upstream-derived dependency/fork; license and delta review required |

## Decision

- Never deduplicate by branch name alone.
- Tree equality is a useful exact content check at a commit, but does not prove licensing, ownership or all-ref equivalence.
- Before migration, compare every branch/tag SHA and commit graph, then map refs to a non-colliding namespace.
- Forks with zero unique commits on the compared tip should normally be represented as upstream references rather than copied as separate first-party apps.
- No source refs were changed and no source repository was modified by this audit.

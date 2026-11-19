# Exact Git ref manifest

Snapshot date: 2026-11-19. The manifest captures exact ref names and object SHAs returned by GitHub's Git matching-refs API. For annotated tags, the SHA is the ref's tag-object SHA, not necessarily its peeled commit SHA.

| Shard | Scope | Repositories | Branch refs | Tag refs |
|---|---|---:|---:|---:|
| 01 | Core OCodejs apps/packages | 8 | 313 | 1 |
| 02 | Docs and tools | 8 | 63 | 0 |
| 03 | Auth and skills | 8 | 14 | 0 |
| 04 | Misc organization repos | 8 | 51 | 0 |
| 05 | Platform repos | 8 | 145 | 0 |
| 06 | Infrastructure repos | 9 | 95 | 0 |
| 07 | Related repositories A | 8 | 385 | 2 |
| 08 | Related repositories B | 8 | 196 | 0 |
| **Total** | **49 OCodejs + 16 related repos** | **65** | **1,262** | **3** |

## Shards

- [01 — OCodejs core](01-ocodejs-core.md)
- [02 — OCodejs docs and tools](02-ocodejs-docs-tools.md)
- [03 — OCodejs auth and skills](03-ocodejs-auth-skills.md)
- [04 — OCodejs miscellaneous](04-ocodejs-misc.md)
- [05 — OCodejs platform](05-ocodejs-platform.md)
- [06 — OCodejs infrastructure](06-ocodejs-infrastructure.md)
- [07 — Related repositories A](07-related-repositories-a.md)
- [08 — Related repositories B](08-related-repositories-b.md)

## Interpretation and limitations

- Branch and tag ref names and their object SHAs were captured for all 65 repositories successfully.
- This is a point-in-time snapshot. Re-run before any migration because branch refs can move.
- The 16 related repositories are candidates only. Their ownership, fork lineage, and authorization to import must be confirmed separately.
- GitHub's matching-refs response was used to capture refs. This does not by itself prove branch protection, ruleset enforcement, or whether a ref is actively maintained.
- No source repository was changed.

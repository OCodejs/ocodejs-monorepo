# Governance

This directory contains the repository registry, migration manifests, branch inventory, and release controls for the OCode.js monorepo.

## Non-negotiable migration controls
- Existing repositories remain intact and authoritative until an individual migration is reviewed and accepted.
- Preserve Git commit history, tags, and branch tips; never squash-import source history as a substitute for history preservation.
- Import source branches under collision-safe names such as `imports/<owner>/<repo>/<branch>` only after validating ref-name length and collisions.
- Do not merge pull requests automatically, delete source repositories, rewrite source refs, or deploy to production.
- Every migration batch must have a manifest, source SHA, destination mapping, validation evidence, and rollback path.

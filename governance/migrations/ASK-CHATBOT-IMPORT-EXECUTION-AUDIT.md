# Ask OCode.js import execution audit

**Snapshot:** 2026-11-19  
**Source:** `OCodejs/ask-chatbot`  
**Pinned source commit:** `913f47289e066b6f395e65d44d7c13bbbf1f2680`  
**Destination:** `apps/ask-chatbot`  
**Status:** Source import blocked by missing writable Git transport; Preview CI prepared independently.

## 1. Git-native import method

The selected method is a non-squashed Git subtree import:

```bash
git remote add ask-chatbot https://github.com/OCodejs/ask-chatbot.git
git fetch ask-chatbot main
git subtree add --prefix=apps/ask-chatbot ask-chatbot/main
```

Do not add `--squash`. A non-squashed subtree import creates a merge commit whose second parent is the original source tip, retaining the original source commit objects and their ancestry. Verify after import:

```bash
git log --graph --oneline --decorate -- apps/ask-chatbot
git merge-base --is-ancestor 913f47289e066b6f395e65d44d7c13bbbf1f2680 HEAD
git rev-parse ask-chatbot/main
```

The import is only valid if the source commit remains an ancestor and the subtree content matches the pinned source tree. Record source URL, source ref, source SHA, subtree prefix, resulting merge SHA, and validation output.

**Execution limitation:** GitHub's connected API can read trees/files and create blobs, trees, commits, refs and PRs, but does not expose a Git clone/fetch/push operation. The available ephemeral Git box rejected creation because its OAuth grant is read-only. The local shell also cannot resolve `github.com`. Therefore no Git object transfer or source import has been performed. Creating a new tree from copied file contents would not preserve source commit history and is explicitly rejected.

## 2. Source and dependency inventory

At the pinned source commit:
- Recursive tree: 387 files; tree response was not truncated.
- Workflow files: 43.
- Root package manifest: `ask-ocodejs`, ESM, private.
- Root lockfile: npm lockfile v3, 556 package records.
- Root manifest and lockfile dependency declarations match exactly (runtime and development dependencies).
- Declared dependency groups: 32 runtime dependencies and 6 development dependencies.
- No Git URL or local `file:` dependencies were found in the lockfile.
- Six nested optional platform package records omit `resolved` and `integrity`; these are optional nested records and should be confirmed by a clean `npm ci` after import rather than treated as install failures.
- Source CI currently uses Node.js 22; the package manifest does not declare an `engines` range.
- Scripts available: `test`, `lint`, `build`, `dev`, `preview`, `api`, and `mcp`. No dedicated typecheck script is declared.

### Dependency gate

Use the committed lockfile with `npm ci`; do not regenerate or update it during import. The Preview workflow runs tests, lint and frontend build. A separate TypeScript check should only be added after confirming a local TypeScript compiler and project-specific typecheck command.

## 3. Workflow audit — all 43 files

The source workflow set is not suitable for wholesale migration:
- `ci.yml` is the best starting reference: Node 22, `npm ci`, tests and build, with checkout/setup-node pinned to full commit SHAs. It has no explicit top-level `permissions` and no path filters.
- `review.yml` runs on pull requests, installs with `npm install`, and passes four provider API secrets into an AI review script. Do not migrate this workflow or expose provider credentials to PR code.
- `build-and-deploy.yml` includes release/tag and Production-target behavior plus `TURBO_TOKEN`; exclude it.
- Multiple Pages workflows grant `pages: write` and use deployment actions; exclude them.
- SLSA release workflows and Maven publish include release triggers or write permissions; exclude them.
- The remaining files include language-specific and third-party security scanners (Dart, CMake, Python, PHP, R, Sonar, Trivy, Fortify, Datadog, etc.). Retain only after a separate relevance and permission review.
- Many actions are referenced by mutable version tags (for example `actions/checkout@v4`, `actions/setup-node@v4`, Pages actions, and security scanner tags). Pin any adopted third-party action to a reviewed full commit SHA.
- Several scanner workflows reference repository secrets. Do not copy those secret references into the monorepo by default.
- No source workflow has been copied into the monorepo.

## 4. Credential exposure finding

The tracked source file `.env.example` contains a value matching the format of a Google API key under `GEMINI_API_KEY`. The value is intentionally not reproduced here. Because the source repository is publicly readable, treat this as a potentially exposed credential:
1. Revoke/rotate the corresponding key at its provider if it is real.
2. Review provider usage and restrictions.
3. Replace the committed example with an empty placeholder in a separately reviewed source-repository change.
4. Scan current files and Git history before importing.
5. Do not copy `.env.example` into the monorepo until sanitized.

This finding is based on the tracked file content; it is not proof that the key is valid or active. A full historical secret scan has not been run.

## 5. Independent Preview CI

Added `.github/workflows/ask-chatbot-preview.yml`:
- PR checks target `main` and are path-filtered to the app, workflow and audit document.
- Staging branch push checks are limited to `staging/ask-chatbot-*`.
- Manual dispatch is supported.
- Explicit `contents: read` only; third-party actions are SHA-pinned.
- Node.js 22 and locked `npm ci`.
- Runs tests, lint and Vite build only.
- No provider credentials, deployment, publish, release, database migration, DNS, or Production environment.
- Before source import, the workflow reports a notice and skips app checks. After import, the checks activate automatically.

This is CI validation, not a hosted Preview deployment.

## 6. PR and repository state

- The preparation PR #10 is now closed and merged at `d3cafeec1227a36b903e08930d9ef48a0490319e` (observed at 2026-11-19 14:23:46 UTC). It contained the migration plan only; no source files were imported. This merge was observed, not performed as part of this execution.
- The monorepo repository API currently reports visibility `public`, not private. No visibility setting was changed here.
- Source `main` still points to the pinned commit above.
- No source branch, tag, workflow, secret, or repository setting was changed.

## 7. Acceptance status

- [x] Source commit pinned and revalidated.
- [x] All 43 workflow files enumerated and reviewed for deployment/release/secret/permission patterns.
- [x] Root manifest and lockfile declarations compared.
- [x] Git-native non-squashed subtree method selected.
- [x] Independent Preview CI prepared.
- [ ] Writable Git transport available.
- [ ] Source commit imported as a non-squashed subtree.
- [ ] Source-to-destination tree equivalence and ancestor checks passed.
- [ ] Clean `npm ci`, tests, lint and build completed in GitHub Actions.
- [ ] Dedicated source-import PR opened.

**Next gate:** provide a writable Git transport for the connected Git sandbox, or run the documented subtree commands from a machine with write access to the monorepo. Do not use file-copy import as a substitute.

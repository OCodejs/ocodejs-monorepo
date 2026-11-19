# Ask OCode.js import gate — Git-native verification and security hold

**Snapshot:** 2026-11-19  
**Source:** `OCodejs/ask-chatbot`  
**Source branch:** `main`  
**Pinned source commit:** `913f47289e066b6f395e65d44d7c13bbbf1f2680`  
**Destination:** `apps/ask-chatbot/`  
**Status:** Git-native method verified; source import intentionally blocked pending credential remediation and history scan.

## 1. Git-native import method

The source is public and its pinned commit is still exactly the current `main` tip: GitHub compare returned `identical`, with 0 commits ahead/behind and the same merge base.

Recommended operation in a full Git clone of the monorepo:

```bash
git remote add ask-chatbot https://github.com/OCodejs/ask-chatbot.git
git fetch ask-chatbot main
git subtree add --prefix=apps/ask-chatbot ask-chatbot 913f47289e066b6f395e65d44d7c13bbbf1f2680
```

Do not add `--squash`. The subtree merge commit must have the destination staging tip and source commit in its ancestry. Validate with:

```bash
git merge-base --is-ancestor 913f47289e066b6f395e65d44d7c13bbbf1f2680 HEAD
git log --graph --oneline --decorate --all
```

This method preserves source commit ancestry, unlike copying files or creating a fresh snapshot commit. The connector's Git object API does not itself provide a full clone/push transport or a bulk source-history transfer. A Git runner is therefore required.

## 2. Source lockfile and dependency inventory

Verified at source `main`:
- `package.json` blob: `3632a0c0996fac2c1be35782c0e84f69f30fdb84`
- `package-lock.json` blob: `e0530bdfa25c7912bca0378eade0e848feafb158`
- Lockfile format: npm lockfileVersion 3.
- Lockfile package records: 556.
- Root package: `ask-ocodejs`, private ESM package.
- One root npm lockfile; no pnpm/yarn/bun lockfile was found in the complete 387-file tree.
- Root scripts include `test` (Vitest), `lint` (ESLint), and `build` (Vite).
- Runtime includes React 18, Express 5, MCP SDK, provider SDKs, Octokit, Socket.IO, SQLite and other libraries.
- Native dependency `better-sqlite3` means the CI runner must support native module installation/build.
- Source CI uses Node 22 and `npm ci --no-audit --no-fund`.
- The package does not declare an `engines` field in the inspected root manifest; Node 22 is selected to align with the source CI.

## 3. Workflow inventory and migration rules

The source contains 43 files under `.github/workflows/`. Notable workflows:
- `ci.yml`: PR/push tests and build; Node 22, npm ci.
- `build-and-deploy.yml`: long release/deployment pipeline with tag-based Production target selection and a Turbo token reference. Must not be copied or activated in the monorepo.
- `nextjs.yml`: GitHub Pages deployment workflow with `pages: write` and `id-token: write`; must not be copied or activated.
- `review.yml`: uses paid provider API secrets; must not be copied or activated.
- Remaining workflow templates include multiple language, security, deployment and publishing workflows. They are not automatically migrated.

Source workflows are nested under `apps/ask-chatbot/.github/workflows/` after subtree import and will not become active root monorepo workflows. Only the new root Preview CI workflow is intended to run.

## 4. Security hold — do not import yet

The tracked source file `.env.example` contains a value matching the shape of a live Google API credential. Its value is deliberately omitted from this report.

Required before importing source history:
1. Treat the credential as compromised and rotate/revoke it with its provider.
2. Run a history-aware secret scanner (for example, Gitleaks) against every source branch and tag, with redacted output.
3. Confirm whether the credential appears in historical commits, branches, tags, releases, issues, or logs.
4. If history contains a live credential, stop and obtain an approved remediation decision. Rewriting source history conflicts with the current requirement to preserve original history; importing the unchanged history would replicate the credential into the new repository.
5. Do not allow CI logs to print matched secret values.

This is a blocker, not a routine warning. No source file has been imported into this monorepo.

## 5. Preview CI prepared

A separate root workflow is added at `.github/workflows/ask-chatbot-preview.yml`. It:
- Runs only for PRs and pushes to staging branches when `apps/ask-chatbot/**` changes.
- Uses Node 22 and `npm ci`.
- Runs tests, lint, build and an npm dependency audit.
- Has `contents: read` only.
- Does not deploy, publish, access production credentials, migrate databases, or change DNS.
- Uses pinned GitHub Actions commit SHAs.

The workflow will remain dormant until the app source is imported. Its checks have not yet run and no CI pass is claimed.

## 6. Current disposition

- Git-native history-preserving method: verified.
- Source branch/commit: pinned and revalidated.
- Lockfile/dependency inventory: inspected.
- Workflow inventory: 43 source workflows enumerated; high-risk examples reviewed.
- Preview CI: prepared, awaiting source import.
- Git subtree import: blocked pending credential rotation and history-aware scan.
- Source repository: unchanged.
- Production: untouched.
- PR merge: not performed by this operation.

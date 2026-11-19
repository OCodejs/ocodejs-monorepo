# OCodejs Brand Guidelines import

This staging change invokes the repository-owned ZIP extraction workflow to import the application from the root `code.zip` into `apps/brand-guidelines/`.

## Scope
- Preserve the original `code.zip` archive.
- Scan archive paths and text files for credential patterns before extraction.
- Reuse existing monorepo assets from `assets/`.
- Configure Vite for relative-path hosting and validate with `npm ci` and `npm run build`.
- Keep all extracted source changes on the staging pull request until reviewed.

## Non-goals
- No Production deployment.
- No changes to source repositories.
- No automatic merge.

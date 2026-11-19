# OCodejs Brand Guidelines

Standalone Vite application extracted from the monorepo's `code.zip` archive.

## Development

Restore and verify the archived npm lockfile before installing dependencies:

```bash
npm run restore-lockfile
npm ci
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The lockfile archive is checked against a pinned SHA-256 digest before it is written to `package-lock.json`. The Preview CI runs the same restore step, then uses `npm ci` for a reproducible install.

The app uses relative Vite paths for repository-subpath hosting and reuses existing brand assets from `assets/`.

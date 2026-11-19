# OCode.js monorepo architecture (proposed)

This is a target map, not a claim that projects have already been migrated. Paths are provisional until source manifests, package boundaries, runtime requirements, and deployment ownership are audited.

```text
apps/
  homepage/       # OCode.js public homepage
  ask-chatbot/    # Ask Chatbot application
  cli-hub/        # CLI / developer hub
  thu365/         # THU365 application
  account/        # Profile and account experience
packages/
  core/           # shared core only after dependency audit
  sdk/            # public SDKs
  cli/            # CLI packages
  ui/             # shared UI components
  shared/         # framework-neutral utilities
services/
  central-api/    # central API
  auth/           # authentication services
  mcp/            # MCP server and protocol adapters
  preview-runtime/# isolated project preview runtime
integrations/
  github/
  vercel/
  ai-providers/
docs/
infrastructure/
governance/
.github/workflows/
```

## Architectural constraints
- Avoid premature workspace unification: preserve each app's existing build/runtime until its migration is independently validated.
- Isolate preview workloads by project and enforce resource, network, filesystem, and credential boundaries.
- Keep provider-specific adapters behind explicit interfaces.
- No shared production database is introduced by this repository foundation.

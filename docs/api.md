---
title: Core API Reference
---

# Core API Reference

This page documents the key functions used by the CLI located in `src`.

**`resolveDbTemplate(a)`**: Determines which DB template path to use.

- **Params**: `a` — object with `language` (`TypeScript` | `JavaScript`) and `database` (`Mongoose` | `Prisma` | `Drizzle` | `None`).
- **Returns**: a relative template path string like `mongoose/ts` or `prisma/js`, or `null` when `None`.

Reference: [src/resolveDbTemplates.ts](src/resolveDbTemplates.ts#L1-L999)

**`mergeDeps(targetDir, depsPath)`**: Merges `deps.json` into the new project's `package.json`.

- **Params**:
  - `targetDir` — path to the generated project root
  - `depsPath` — path to a `deps.json` file inside template folder

It reads `package.json` at `targetDir`, merges dependencies/devDependencies/scripts from `depsPath`, and writes back.

**`appendEnv(targetDir, envPath)`**: Appends contents of `env.append` to the project's `.env` if present.

**`mergeDbConfigToRoot(targetDir, templateDir)`**: Copies database config files from `templateDir` into `targetDir`, filtering out certain files such as `env.append`, `deps.json`, template entrypoints, and Prisma schema (if present).

Reference: [src/dbHelper.ts](src/dbHelper.ts#L1-L999)

**`index` (CLI entry)**: `src/index.ts` implements the CLI flow using `commander` and `@clack/prompts`. Major steps:

- Build template path from language
- Copy template to target folder
- Resolve and copy DB template (if chosen)
- Merge deps, append env, merge DB config, run `npm install`

Reference: [src/index.ts](src/index.ts#L1-L999)

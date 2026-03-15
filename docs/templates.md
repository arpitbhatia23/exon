---
title: Templates & Structure
---

# Templates & Structure

Exon ships with ready-made templates under `templates/` for both JavaScript and TypeScript projects and separate DB template folders.

- Project templates:
  - `node-express-template-js` — JavaScript Express starter
  - `node-express-template-ts` — TypeScript Express starter

- DB templates (copied into `src/db` inside generated project when selected):
  - `mongoose/js` and `mongoose/ts`
  - `prisma/js` and `prisma/ts`
  - `drizzle/js` and `drizzle/ts`

During project creation the CLI performs:

- copy of selected project template
- if DB selected: copy of the DB template into `src/db`
- merge of `deps.json` into project `package.json`
- append of `env.append` into project `.env`

If you want to add your own template, add a folder under `templates/` and follow the structure of existing templates. Provide a `deps.json` and `env.append` if additional deps or environment variables are required.

Reference: [templates folder](templates)

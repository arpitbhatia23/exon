---
title: CLI Usage
---

# CLI Usage

## Commands

- `create <name>`: Scaffold a new Express project.

### Examples

```bash
exon-cli create blog-backend
```

The CLI is interactive. It will ask:

- Which language do you want to use? (TypeScript / JavaScript)
- Which database ORM do you want to use? (Mongoose / Prisma / Drizzle / None)

Output messages and progress are shown, and the tool attempts to run `npm install` in the created folder.

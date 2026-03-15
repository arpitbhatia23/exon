---
title: Getting Started
---

# Getting Started

## Install

Install `exon-cli` globally (recommended) or use npx:

```bash
npm i -g exon-cli
# or
npx exon-cli create my-api
```

## Create a new project

Run the `create` command and follow prompts to pick language and database:

```bash
exon-cli create my-api
```

The CLI will:

- copy a JavaScript or TypeScript Express template into `my-api`
- optionally copy database scaffolding into `my-api/src/db`
- merge dependencies and environment entries
- run `npm install` in the created project

After completion, change into the directory and start the app:

```bash
cd my-api
npm start
```

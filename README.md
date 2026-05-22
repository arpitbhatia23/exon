# ⚡ Exon CLI

> Stop wasting hours configuring Express.
>
> Generate a production-ready Express.js API with TypeScript, Swagger, Prisma, Docker, Logging, and modern project architecture in under 30 seconds.

```bash
npx exon-cli create my-api
```

## What You Get

Instead of spending your first hour doing this:

❌ Configure TypeScript  
❌ Setup Swagger  
❌ Configure Prisma/Mongoose  
❌ Setup Winston Logging  
❌ Create Dockerfile  
❌ Create folder structure  
❌ Configure error handling

Exon generates everything for you.

```bash
npx exon-cli create my-api --ts --prisma --docker
```

Result:

```txt
✅ TypeScript
✅ Swagger/OpenAPI
✅ Prisma ORM
✅ Docker
✅ Winston Logging
✅ Error Handling
✅ Production Structure
✅ Socket.IO

```

---

## Why Developers Use Exon

### Traditional Express Setup

```txt
Create Project
├── Install packages
├── Configure TypeScript
├── Configure Swagger
├── Configure Database
├── Configure Logging
├── Configure Docker
├── Setup Error Handling
└── Create Structure

⏱️ 45–90 minutes
```

### Exon

```bash
npx exon-cli create my-api
```

```txt
⏱️ 30 seconds
```

---

## Features

### 🚀 Project Generation

- TypeScript or JavaScript
- ESM Support
- Swagger/OpenAPI
- Prisma
- Drizzle
- Mongoose
- Docker
- Winston Logging
- Production Error Handling

### 🔌 Plugin System

```bash
npx exon-cli add swagger
npx exon-cli add logger
npx exon-cli add prisma
npx exon-cli add docker
```

Remove anytime:

```bash
npx exon-cli remove swagger
```

---

## Example Project Structure

```txt
src/
├── controllers/
├── routes/
├── middleware/
├── models/
├── db/
├── helpers/
├── utils/
│   ├── apiError.ts
│   ├── apiResponse.ts
│   └── asyncHandler.ts
├── app.ts
└── index.ts
```

---

## Quick Start

```bash
npx exon-cli create my-api --ts --prisma --docker

cd my-api
npm run dev
```

Swagger:

```txt
http://localhost:3802/docs
```

---

## Roadmap

### Current

- ✅ TypeScript
- ✅ JavaScript
- ✅ Swagger
- ✅ Docker
- ✅ Prisma
- ✅ Drizzle
- ✅ Mongoose
- ✅ Winston Logger
- ✅ Socket.IO

### Coming Soon

- 🚧 Socket.IO
- 🚧 JWT Auth
- 🚧 Redis
- 🚧 BullMQ
- 🚧 Email Module
- 🚧 S3 Uploads
- 🚧 Microservices

---

## Built For

- SaaS Startups
- REST APIs
- Mobile App Backends
- Microservices
- Hackathons
- Enterprise Projects

---

## Why Exon Exists

Most Express generators stop after creating a basic app.

Exon generates a backend that is actually ready to build on.

No boilerplate.
No repetitive setup.
No spending your first day configuring tooling.

Just start building features.

---

## Support The Project

⭐ Star the GitHub repository  
🐛 Report issues  
🚀 Contribute plugins

```bash
npm i exon-cli
```

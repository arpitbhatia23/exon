# ⚡ Exon — Express Backend Boilerplate Generator

> **The fastest way to create production-ready Express.js APIs.**
> Think **Create React App — but for backend APIs.**

Exon is a powerful **CLI tool** that generates a **production-ready Express.js backend** with best practices, logging, Swagger docs, and database support in seconds.

Instead of spending **30+ minutes setting up an Express backend**, Exon gives you a **fully structured project instantly**.

```
npx exon-cli create my-api
cd my-api
npm start
```

## Demo

[![asciicast](https://asciinema.org/a/kbs72JTWSFpOkuNn.svg)](https://asciinema.org/a/kbs72JTWSFpOkuNn)

🚀 Your backend is ready.

---

# ⭐ Why Developers Love Exon

Setting up a backend usually means installing and configuring:

- Express
- TypeScript
- Logger
- Error handling
- Swagger documentation
- Database ORM
- Middleware structure

Exon **automatically configures everything**.

⚡ Setup time: **30 seconds**

---

# ✨ Features

- ⚡ **Instant Backend Setup**
- 🔄 **TypeScript & JavaScript Support**
- 📚 **Swagger/OpenAPI Documentation**
- 🧠 **Production Logging System**
- 🛡️ **Error Handling Utilities**
- 🔐 **JWT Authentication Ready**
- 🗄️ **Database Ready**
- 📦 **Clean Project Structure**
- 🚀 **Production Best Practices**

---

# 📦 Installation

Install globally:

```
npm install -g exon-cli
```

Or run directly with **npx**:

```
npx exon-cli create my-app
```

---

# 🚀 Quick Start

### 1️⃣ Create Project

```
exon-cli create my-express-app
```

### 2️⃣ Choose Language

Select:

- TypeScript
- JavaScript

### 3️⃣ Choose Database

Options:

- Prisma
- Drizzle
- Mongoose
- None

### 4️⃣ Start Server

```
cd my-express-app
npm start
```

Server runs instantly with **Swagger docs enabled**.

---

# 🎬 Example Workflow

```
npx exon-cli create my-api
cd my-api
npm start
```

Output:

```
Server running on http://localhost:3802
Swagger Docs: http://localhost:3802/docs
```

---

# 📁 Generated Project Structure

```
my-express-app
│
├── src
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── helpers
│   ├── db
│   ├── utils
│   │   ├── apiError.ts
│   │   ├── apiResponse.ts
│   │   └── asyncHandler.ts
│   ├── app.ts
│   └── index.ts
│
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🔎 Production Logging (Built-In)

Every Exon project includes **production-ready logging** powered by:

- Morgan → HTTP request logging
- Winston → application logging
- Daily log rotation

### Log Output Example

```
2026-03-09 11:40:10 [info] GET /api/users 200 12ms
2026-03-09 11:40:12 [warn] Invalid login attempt
2026-03-09 11:40:15 [error] Database connection failed
```

### Logs Folder

```
logs
├── app-2026-03-09.log
├── app-2026-03-10.log
├── error-2026-03-09.log
```

---

# 📚 Swagger API Documentation

Every project includes **automatic Swagger documentation**.

Open:

```
http://localhost:3802/docs
```

Example route documentation:

```ts
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
```

---

# 🧠 Included Utilities

### asyncHandler

Automatically catch async errors.

```ts
router.get(
  "/users",
  asyncHandler(async (req, res) => {
    // code
  }),
);
```

---

### apiResponse

Standardized responses.

```ts
res.status(200).json(new apiResponse(200, data, "Success"));
```

---

### apiError

Consistent error handling.

```ts
throw new apiError(400, "Invalid request");
```

---

# 🌍 Works With

Databases:

- MongoDB
- PostgreSQL
- MySQL
- SQLite

ORMs:

- Prisma
- Drizzle
- Mongoose
- TypeORM

Platforms:

- AWS
- Vercel
- Docker
- Google Cloud
- Heroku

---

# ⚔️ Comparison

| Feature           | Exon          | Manual Setup |
| ----------------- | ------------- | ------------ |
| Setup Time        | ⚡ 30 seconds | 30+ minutes  |
| API Docs          | ✅            | ❌           |
| Logging           | ✅            | ❌           |
| Error Handling    | ✅            | ❌           |
| Project Structure | ✅            | ❌           |

---

# 🎯 Perfect For

- REST API development
- SaaS backends
- microservices
- mobile app backends
- authentication servers
- data APIs

---

# ⚙️ Environment Variables

Create `.env`

```
PORT=3000
NODE_ENV=development
DB_URI=your_database_uri
```

---

# 🎮 Easter Egg

Default port:

```
3802
```

Leet Speak:

```
E → 3
X → 8
O → 0
N → 2
```

**EXON = 3802**

---

# 📊 Performance

- Lightweight dependencies
- Fast startup
- Scalable architecture
- Production optimized

---

# 🤝 Contributing

Contributions welcome.

Ways to contribute:

- Report issues
- Suggest features
- Submit pull requests
- Improve docs

---

# ⭐ Star History

If you like this project please **star the repository**.

---

# 🔍 SEO Keywords

express boilerplate
express cli
nodejs backend starter
typescript express template
node api generator
rest api scaffold
express backend template

---

# 📄 License

MIT License.

---

# ❤️ Support

GitHub: https://github.com/arpitbhatia23/exon

---

⭐ **If Exon helped you, consider starring the repo!**

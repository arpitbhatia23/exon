# ⚡ Exon — The "Create React App" for Express APIs

🔥 Bootstrap production-ready Express.js backends in **30 seconds**

<p align="center">
  <img src="./demo.png" alt="Exon CLI Demo" width="800"/>
</p>

---

## ⚡ Try It Now

```bash
npx exon-cli create my-api
cd my-api && npm start
```

🚀 Your backend is live with Swagger docs.

---

## 😩 The Problem

Setting up an Express backend every time is repetitive and slow:

- Install Express
- Setup TypeScript
- Configure logging
- Setup error handling
- Add Swagger docs
- Create folder structure

⏱️ Takes **30–60 minutes** every time.

---

## ⚡ The Solution

**Exon does everything instantly.**

👉 Production-ready backend in **under 30 seconds**

---

## ⭐ Why Developers Love Exon

- ⚡ Zero setup time
- 📚 Built-in Swagger API docs
- 🧠 Clean architecture
- 🛡️ Production-ready error handling
- 📦 Scalable folder structure
- 🔥 Works out of the box

---

## ✨ Features

- ⚡ Instant Express backend setup
- 🔄 TypeScript & JavaScript support
- 📚 Swagger/OpenAPI documentation
- 🧠 Production logging system
- 🛡️ Error handling utilities
- 🗄️ Database ready
- 📦 Clean project structure
- 🚀 Production best practices

---

## 📦 Installation

### Option 1: Use with npx (recommended)

```bash
npx exon-cli create my-app
```

### Option 2: Install globally

```bash
npm install -g exon-cli
```

---

## 🚀 Quick Start

### 1️⃣ Create Project

```bash
exon-cli create my-express-app
```

### 2️⃣ Choose Language

- TypeScript
- JavaScript

### 3️⃣ Choose Database

- Prisma
- Drizzle
- Mongoose
- None

### 4️⃣ Start Server

```bash
cd my-express-app
npm start
```

---

## 🎬 Example Output

```
Server running on http://localhost:3802
Swagger Docs: http://localhost:3802/docs
```

---

## 📁 Project Structure

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

## 🔎 Production Logging (Built-In)

Every project includes:

- **Morgan** → HTTP request logging
- **Winston** → Application logging
- **Daily log rotation**

### Example Logs

```
2026-03-09 11:40:10 [info] GET /api/users 200 12ms
2026-03-09 11:40:12 [warn] Invalid login attempt
2026-03-09 11:40:15 [error] Database connection failed
```

---

## 📚 Swagger API Documentation

Access docs instantly:

```
http://localhost:3802/docs
```

### Example Route

```js
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

## 🧠 Included Utilities

### asyncHandler

Automatically handles async errors:

```js
router.get(
  "/users",
  asyncHandler(async (req, res) => {
    // your code
  }),
);
```

---

### apiResponse

Standardized API responses:

```js
res.status(200).json(new apiResponse(200, data, "Success"));
```

---

### apiError

Consistent error handling:

```js
throw new apiError(400, "Invalid request");
```

---

## 🌍 Works With

### Databases

- MongoDB
- PostgreSQL
- MySQL
- SQLite

### ORMs

- Drizzle
- Mongoose

### Platforms

- AWS
- Vercel
- Docker
- Google Cloud
- Heroku

---

## ⚔️ Exon vs Manual Setup

| Task              | Exon ⚡ | Manual 😵 |
| ----------------- | ------- | --------- |
| Setup Time        | 30 sec  | 30–60 min |
| Swagger Docs      | ✅      | ❌        |
| Logging           | ✅      | ❌        |
| Error Handling    | ✅      | ❌        |
| Project Structure | ✅      | ❌        |

👉 Stop wasting time on setup.

---

## 🎯 Use Cases

- REST API development
- SaaS backends
- Microservices
- Mobile app backends
- Authentication servers
- Rapid prototyping

---

## ⚙️ Environment Variables

Create a `.env` file:

```
PORT=3000
NODE_ENV=development
DB_URI=your_database_uri
```

---

## 🎮 Easter Egg

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

👉 EXON = **3802**

---

## 📊 Performance

- Lightweight dependencies
- Fast startup
- Scalable architecture
- Production optimized

---

## ⭐ Loved by Developers

> 🚀 "Saved me hours of setup"
> 🔥 "Best Express CLI I've used"
> ⚡ "Super clean structure"

---

## 🤝 Contributing

Contributions are welcome!

- Report issues
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📄 License

MIT License

---

## ❤️ Support

👉 GitHub: [https://github.com/arpitbhatia23/exon](https://github.com/arpitbhatia23/exon)

⭐ **If Exon helped you, please star the repo!**

---

## 🔍 SEO Keywords

express cli
express generator
nodejs backend starter
typescript express boilerplate
express api template
nodejs rest api generator
backend scaffold tool
express production setup
express starter template

---

🔥 Built to make backend development fast again.

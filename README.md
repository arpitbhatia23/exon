# ⚡ Exon - Express Backend Boilerplate Generator

> **Generate Production-Ready Express.js Backends in Seconds**  
> A powerful CLI tool for scaffolding TypeScript/JavaScript Express backends with best practices, modern tooling, and zero configuration needed.

[![npm version](https://img.shields.io/npm/v/exon-cli.svg)](https://www.npmjs.com/package/exon-cli)
[![npm downloads](https://img.shields.io/npm/dm/exon-cli.svg)](https://www.npmjs.com/package/exon-cli)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![GitHub stars](https://img.shields.io/github/stars/arpitbhatia23/exon.svg?style=social)](https://github.com/arpitbhatia23/exon)

**Exon** eliminates boilerplate and gets you building Express.js backends immediately. Pre-configured with industry best practices, error handling utilities, middleware templates, and database integration starters.

## ✨ Features

- ⚡ **Instant Setup** - Zero configuration, pre-built project structure
- 🔄 **TypeScript & JavaScript** - Full support for both languages with proper tooling
- 🎯 **Production-Ready** - Best practices, error handling, logging included
- 📦 **Database Ready** - Prepared structures for MongoDB, PostgreSQL, MySQL, etc.
- 🛡️ **Error Handling** - Built-in API error and response utilities
- 🔧 **Middleware Templates** - Pre-configured middleware directories
- 📚 **Database Integrations** - Starter templates for Prisma, Drizzle, and Mongoose
- 🚀 **Swagger/OpenAPI** - Automatic API documentation included
- 🌍 **Modern Stack** - Latest Express.js with async/await support

## Installation

Install Exon globally from npm:

```bash
npm install -g exon
```

Or use with npx without installation:

```bash
npx exon create my-app
```

## Quick Start

### 1. Create a New Project

```bash
exon create my-express-app
```

### 2. Choose Your Language

The CLI will prompt you to select your preferred language:

- **TypeScript** - For type-safe development
- **JavaScript** - For lightweight projects

### 3. Start Developing

```bash
cd my-express-app
npm start
```

Your Express server will be running on the configured port with full logging enabled.

## Project Structure

Exon generates a well-organized project structure:

```
my-express-app/
├── src/
│   ├── controllers/          # Request handlers
│   ├── routes/              # API route definitions
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── utils/               # Utility functions
│   │   ├── apiError.ts      # Error handling
│   │   ├── apiResponse.ts   # Response formatting
│   │   └── asyncHandler.ts  # Async error wrapper
│   ├── helpers/             # Helper functions
│   ├── db/                  # Database configuration
│   ├── app.ts              # Express app setup
│   └── index.ts            # Server entry point
├── package.json
├── tsconfig.json (TypeScript only)
└── README.md
```

## Included Utilities

### API Error Handling

Consistent error response handling across your application with proper HTTP status codes.

### API Response Format

Standardized JSON response format for all endpoints ensuring consistency.

### Async Handler

Wrapper function for handling asynchronous route handlers with automatic error catching.

### Swagger API Documentation

Automatic API documentation with Swagger/OpenAPI 3.0. Access the interactive API docs at `/docs` when your server is running.

### Middleware Support

Pre-configured middleware directory for authentication, validation, and custom middleware.

### Database Ready

Prepared folder structure for integrating your preferred database (MongoDB, PostgreSQL, MySQL, etc.).

## Usage Examples

### Create TypeScript Project

```bash
exon create my-ts-backend
# Choose "TypeScript" when prompted
cd my-ts-backend
npm start
```

### Create JavaScript Project

```bash
exon create my-js-backend
# Choose "JavaScript" when prompted
cd my-js-backend
npm start
```

## 💡 Why Choose Exon?

| Feature              | Exon                | Manual Setup         |
| -------------------- | ------------------- | -------------------- |
| Setup Time           | **30 seconds**      | 30+ minutes          |
| Best Practices       | ✅ Built-in         | Manual research      |
| Error Handling       | ✅ Included         | Need to build        |
| TypeScript Config    | ✅ Pre-optimized    | Manual tsconfig      |
| Middleware Templates | ✅ Ready to use     | Start from scratch   |
| Database Support     | ✅ Multiple options | Choose and configure |
| API Documentation    | ✅ Swagger included | Manual setup         |

## 🌍 Works With

- **Databases**: MongoDB, PostgreSQL, MySQL, SQLite
- **ORMs**: Prisma, Drizzle, Mongoose, TypeORM
- **Cloud**: AWS, Azure, Google Cloud, Vercel, Heroku
- **Authentication**: JWT, OAuth, Firebase
- **APIs**: REST, GraphQL, WebSockets
- **Container**: Docker, Docker Compose
- **CI/CD**: GitHub Actions, GitLab CI, Jenkins

## 📊 Performance

- **Lightweight**: Minimal dependencies for fast startup
- **Scalable**: Built for production deployments
- **Efficient**: Optimized middleware chains
- **Memory Conscious**: Lean footprint suitable for serverless deployments

## Available Scripts

Once your project is created, you can run:

```bash
npm start      # Start the development server
npm run build  # Build the project (TypeScript only)
```

## API Documentation

### Swagger/OpenAPI Docs

Your Exon project includes automatic API documentation powered by Swagger UI.

**Access the docs:** Navigate to `http://localhost:3802/docs` (or your configured port) in your browser.

**Documenting your routes:**

Add JSDoc comments to your route handlers with OpenAPI-compatible annotations:

```typescript
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get("/users", (req, res) => {
  // Your route logic
});
```

The Swagger configuration automatically scans all route files in `src/routes/*` and generates interactive documentation.

### Dependencies

- **express** - Web framework
- **cors** - Cross-origin resource sharing
- **cookie-parser** - Parse cookies
- **jsonwebtoken** - JWT authentication
- **express-rate-shield** - Rate limiting

### Dev Dependencies

- **typescript** - Type checking (TypeScript projects)
- **tsx** - TypeScript execution (TypeScript projects)
- **@types/express** - TypeScript definitions

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
PORT=3000
NODE_ENV=development
DB_URI=your_database_uri
```

#### 🎮 Easter Egg: Leet Number

**Default Port: 3802** - This is Exon in leet speak!

- E → 3
- X → 8
- O → 0
- N → 2

So **EXON = 3802** ✨

### TypeScript Configuration

The TypeScript template includes a pre-configured `tsconfig.json` with modern settings optimized for Node.js development.

## API Utilities Reference

### asyncHandler

Wraps async route handlers to automatically catch errors:

```typescript
import { asyncHandler } from "./utils/asyncHandler";

router.get(
  "/users",
  asyncHandler(async (req, res) => {
    // Your async code here
  })
);
```

### apiResponse

Send consistent JSON responses:

```typescript
import { apiResponse } from "./utils/apiResponse";

res.status(200).json(new apiResponse(200, data, "Success"));
```

### apiError

Handle errors consistently:

```typescript
import { apiError } from "./utils/apiError";

throw new apiError(400, "Invalid request");
```

## Best Practices

- **Controllers** - Place business logic in controller functions
- **Routes** - Define API endpoints in route files
- **Middleware** - Create reusable middleware for common tasks
- **Error Handling** - Use the provided error utilities
- **Environment Variables** - Store sensitive data in `.env`
- **Database** - Organize database models in the models folder
- **Rate Limiting** - Default rate limiter is configured (15 min window, 5 requests)
- **Security** - CORS and cookie parsing enabled for secure communication

## Troubleshooting

### Dependencies Installation Failed

If npm install fails during project creation, run it manually:

```bash
cd your-project
npm install
```

### Port Already in Use

Change the PORT in your `.env` file or modify the port number in `src/index.ts`

### TypeScript Compilation Errors

Ensure you have TypeScript installed: `npm install -D typescript`

### Rate Limiter Not Working

Make sure `express-rate-shield` is installed: `npm install express-rate-shield`

## Compatibility

- **Node.js**: 18.0.0 or higher
- **npm**: 9.0.0 or higher
- **Operating Systems**: Windows, macOS, Linux

## Contributing

Contributions are welcome! Here are the ways you can contribute:

- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Share feedback and ideas

## Changelog

### v1.1.0

- Initial release
- Support for TypeScript and JavaScript projects
- Auto-installation of dependencies
- Full project structure generation
- Built-in rate limiting
- JWT authentication support
- Cookie parser middleware

## License

MIT License - feel free to use this in your projects.

## Support

For issues, feature requests, or questions:

- Create an issue on [GitHub](https://github.com/arpitbhatia23/exon/issues)
- Check existing documentation
- Review project examples

## 🎯 Popular Use Cases

- 🏢 **Enterprise APIs** - Build scalable REST APIs quickly
- 🤖 **Microservices** - Create microservices with consistent structure
- 📱 **Mobile Backends** - Perfect for mobile app backend support
- 🌐 **Web Applications** - Backend for web applications and SPAs
- 🔌 **Integrations** - Third-party API integrations
- 🔒 **Authentication Servers** - JWT-based authentication systems
- 📊 **Data APIs** - Build data aggregation and analytics APIs

## ⭐ Why Developers Love Exon

- ⚡ **Time-Saving** - 30 seconds vs 30+ minutes of manual setup
- 🎯 **Best Practices Built-In** - No need to research patterns
- 📦 **Complete Stack** - Everything you need, nothing you don't
- 🔄 **Flexibility** - Choose TypeScript or JavaScript
- 🚀 **Production-Ready** - Deploy with confidence
- 🛡️ **Type-Safe** - Optional TypeScript for error prevention
- 📚 **Well-Documented** - Every feature explained clearly

## 🤝 Contributing

Contributions are welcome! Here are the ways you can contribute:

- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation
- Share feedback and ideas

## 📄 License

MIT License - feel free to use this in your projects.

## Keywords

`express` `cli` `boilerplate` `backend` `typescript` `javascript` `nodejs` `rest-api` `generator` `scaffold` `template` `starter` `3802` `leet-speak` `api` `server` `framework`

## Testimonials

> _"Exon saved me hours of boilerplate setup. Now I can focus on building features!" - Happy Developer_

> _"The best Express scaffolder I've used. Highly recommended!" - DevOps Engineer_

> _"Finally, a CLI that gets it right. Production-ready from day one." - CTO_

## Roadmap

- 🔄 GraphQL template support
- 🗄️ Database migration utilities
- 🔐 Enhanced security templates
- 🧪 Built-in testing setup
- 📊 Monitoring & analytics integration
- 🌐 WebSocket support templates

## Changelog

### v1.1.0

- Initial release
- Support for TypeScript and JavaScript projects
- Auto-installation of dependencies
- Full project structure generation
- Built-in rate limiting
- JWT authentication support
- Cookie parser middleware
- Swagger/OpenAPI documentation

## About

Exon makes it simple and fast to scaffold professional Express.js applications without repetitive setup. Get to building your features faster with sensible defaults and best practices baked in.

---

**⭐ If Exon helped you, please star the repository on GitHub!**

**Created with ❤️ to simplify Express development** | [GitHub](https://github.com/arpitbhatia23/exon) | [Issues](https://github.com/arpitbhatia23/exon/issues) | [Discussions](https://github.com/arpitbhatia23/exon/discussions)

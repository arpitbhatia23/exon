# Exon - Express Backend Boilerplate CLI

[![npm version](https://img.shields.io/npm/v/exon-cli.svg)](https://www.npmjs.com/package/exon-cli)
[![npm downloads](https://img.shields.io/npm/dm/exon-cli.svg)](https://www.npmjs.com/package/exon-cli)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

**Exon** is a powerful CLI tool that eliminates the stress of creating Express.js backend boilerplate projects. Generate production-ready Express backends in seconds with support for both TypeScript and JavaScript.

## Features

✨ **Zero Configuration** - Get started instantly with pre-configured Express backends  
🚀 **TypeScript & JavaScript** - Choose your preferred language  
📦 **Production Ready** - Includes best practices and common utilities  
🎯 **Project Structure** - Well-organized folder hierarchy  
⚡ **Fast Setup** - Automatic dependency installation  
🛡️ **Error Handling** - Built-in API error utilities  
🔧 **Middleware Ready** - Pre-configured middleware structure  
📚 **Database Ready** - Prepared folder structure for database integration

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

### v1.0.0

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

## Keywords

`express` `cli` `boilerplate` `backend` `typescript` `javascript` `nodejs` `rest-api` `generator` `scaffold` `template` `starter` `3802` `leet-speak`

## About

Exon makes it simple and fast to scaffold professional Express.js applications without repetitive setup. Get to building your features faster with sensible defaults and best practices baked in.

---

**Created with ❤️ to simplify Express development**

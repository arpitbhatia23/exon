"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Import core dependencies
const express_1 = __importDefault(require("express")); // Express framework for building backend APIs
const cors_1 = __importDefault(require("cors")); // Middleware to handle Cross-Origin Resource Sharing
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Middleware to parse cookies
const express_rate_shield_1 = require("express-rate-shield");
// Initialize Express app
const app = (0, express_1.default)();
exports.app = app;
// -------------------- rate-limiting --------------------
// Create a rate limiter instance
// windowMs: time window in milliseconds (here 15 minute)
// max: maximum number of requests allowed per IP in the time window
// message: response sent when user exceeds the limit
const limiter = new express_rate_shield_1.rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Too many requests, please try again later." },
});
// Apply rate limiter middleware to all routes
app.use(limiter.handler());
// -------------------- Middleware --------------------
// Enable CORS (Cross-Origin Resource Sharing)
// - origin: [] => define allowed domains (empty array = no domains allowed yet)
// - credentials: true => allow cookies to be sent with requests
app.use((0, cors_1.default)({ origin: [], credentials: true }));
// Parse incoming JSON requests with a body limit of 16kb
app.use(express_1.default.json({ limit: "16kb" }));
// Parse URL-encoded form data with a body limit of 16kb
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
// Serve static files from the "public" folder (e.g., images, CSS, JS)
app.use(express_1.default.static("public"));
// Parse cookies attached to incoming requests
app.use((0, cookie_parser_1.default)());
// -------------------- Routes --------------------
// Import your route definitions
const route_1 = __importDefault(require("./routes/route"));
// Use the imported routes
app.use(route_1.default);
//# sourceMappingURL=app.js.map
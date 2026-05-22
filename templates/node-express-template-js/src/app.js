// Import core dependencies
import express from 'express'; // Express framework for building backend APIs
import cors from 'cors'; // Middleware to handle Cross-Origin Resource Sharing
import cookieParser from 'cookie-parser'; // Middleware to parse cookies
import { rateLimiter } from 'express-rate-shield';
import indexRouter from './routes/index.route.js';
import healthCheckRouter from './routes/healthCheck.route.js';
const app = express();

// -------------------- rate-limiting --------------------

const limiter = new rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { error: 'Too many requests, please try again later.' },
});

// Apply rate limiter middleware to all routes
app.use(limiter.handler());

// -------------------- Middleware --------------------

// Enable CORS (Cross-Origin Resource Sharing)
// - origin: [] => define allowed domains (empty array = no domains allowed yet)
// - credentials: true => allow cookies to be sent with requests
app.use(cors({ origin: [], credentials: true }));

// Parse incoming JSON requests with a body limit of 16kb
app.use(express.json({ limit: '16kb' }));

// Parse URL-encoded form data with a body limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serve static files from the "public" folder (e.g., images, CSS, JS)
app.use(express.static('public'));

// Parse cookies attached to incoming requests
app.use(cookieParser());

app.use(indexRouter);
app.use('/api/v1/', healthCheckRouter);

// -------------------- Export app --------------------

// Export the app instance for server startup or testing
export { app };

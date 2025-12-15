// Import Router class from Express
import { Router } from "express";

// Import the controller function that handles this route
import { index } from "../controllers/index.controller";
// Create a new router instance
const router = Router();

// Define routes
// Here we define a GET request on the root path "/"
// When someone visits "/", the `index` controller function will be called
/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: Default route created by exon-cli
 *     responses:
 *       200:
 *         description: Server started
 *         content:
 *           text/html:
 *             example: "<h1>Exon server started</h1>"
 */
router.route("/").get(index);

// Export the router so it can be used in app.js
export default router;

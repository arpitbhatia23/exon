// Import Router class from Express
import { Router } from "express";

// Import the controller function that handles this route
import { index } from "../controllers/index.controller.js";

// Create a new router instance
const router = Router();

// Define routes
// Here we define a GET request on the root path "/"
// When someone visits "/", the `index` controller function will be called
router.route("/").get(index);

// Export the router so it can be used in app.js
export default router;

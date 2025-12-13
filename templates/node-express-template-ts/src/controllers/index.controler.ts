// Import a utility that handles errors in async functions
// This prevents the need to write try/catch in every controller
import { asyncHandler } from "../utils/asyncHandler";

// Define the controller function for the root route
// `asyncHandler` wraps the async function and automatically forwards errors to Express error middleware
const index = asyncHandler(async (req, res) => {
  // Send a simple HTML response when the root route is accessed
  res.send("<h1>EXON SERVER STARTED</h1>");
});

// Export the controller so it can be used in routes
export { index };

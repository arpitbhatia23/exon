"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
// Import a utility that handles errors in async functions
// This prevents the need to write try/catch in every controller
const asyncHandler_1 = require("../utils/asyncHandler");
// Define the controller function for the root route
// `asyncHandler` wraps the async function and automatically forwards errors to Express error middleware
const index = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    // Send a simple HTML response when the root route is accessed
    res.send("<h1>EXON SERVER STARTED</h1>");
});
exports.index = index;
//# sourceMappingURL=index.controler.js.map
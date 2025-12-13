"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Router class from Express
const express_1 = require("express");
// Import the controller function that handles this route
const index_controler_1 = require("../controllers/index.controler");
// Create a new router instance
const router = (0, express_1.Router)();
// Define routes
// Here we define a GET request on the root path "/"
// When someone visits "/", the `index` controller function will be called
router.route("/").get(index_controler_1.index);
// Export the router so it can be used in app.js
exports.default = router;
//# sourceMappingURL=route.js.map
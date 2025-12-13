"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    }
    catch (error) {
        // If error is an ApiError, use its statusCode, otherwise default 500
        const statusCode = error.statuscode || 500;
        const message = error.message || "Something went wrong";
        res.status(statusCode).json({
            success: false,
            message,
            errors: error.errors || [],
        });
    }
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map
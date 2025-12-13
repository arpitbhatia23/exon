"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiError = void 0;
class apiError extends Error {
    statuscode;
    data;
    success;
    errors;
    constructor(statuscode, message = "something went wrong", errors = [], stack = "") {
        super(message);
        this.statuscode = statuscode;
        this.data = null;
        this.message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.apiError = apiError;
//# sourceMappingURL=apiError.js.map
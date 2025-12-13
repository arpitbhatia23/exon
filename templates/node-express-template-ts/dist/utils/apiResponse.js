"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
class apiResponse {
    statusCode;
    data;
    message;
    success;
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}
exports.apiResponse = apiResponse;
//# sourceMappingURL=apiResponse.js.map
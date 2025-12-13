declare class apiError extends Error {
    statuscode: number;
    data: any;
    success: boolean;
    errors: any[];
    constructor(statuscode: number, message?: string, errors?: any[], stack?: string);
}
export { apiError };
//# sourceMappingURL=apiError.d.ts.map
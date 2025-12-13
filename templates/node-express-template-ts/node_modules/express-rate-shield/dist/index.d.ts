import type { Request, Response, NextFunction } from "express";
type message = {
    error: string | undefined;
};
interface rateLimiterOptions {
    windowMs: number;
    max: number;
    message?: message;
    headers?: boolean | undefined;
}
export declare class rateLimiter {
    private windowMs;
    private max;
    private message?;
    private headers?;
    private ipMap;
    constructor(options: rateLimiterOptions);
    private cleanUp;
    handler(): (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
}
export {};
//# sourceMappingURL=index.d.ts.map
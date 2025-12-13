import type { Request, Response, NextFunction } from "express";
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;
declare const asyncHandler: (fn: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { asyncHandler };
//# sourceMappingURL=asyncHandler.d.ts.map
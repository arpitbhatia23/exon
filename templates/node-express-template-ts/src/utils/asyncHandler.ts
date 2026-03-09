import type { Request, Response, NextFunction } from "express";
import logger from "./logger.js";

type AsyncFunction = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const asyncHandler =
  (fn: AsyncFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      // If error is an ApiError, use its statusCode, otherwise default 500
      const statusCode = error.statuscode || 500;
      const message = error.message || "Something went wrong";
      logger.error(error);
      res.status(statusCode).json({
        success: false,
        message,
        errors: error.errors || [],
      });
    }
  };

export { asyncHandler };

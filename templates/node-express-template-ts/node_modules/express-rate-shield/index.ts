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

interface ipData {
  timeStamp: number[];
}
export class rateLimiter {
  private windowMs: number;
  private max: number;
  private message?: message;
  private headers?: boolean;
  private ipMap: Map<string, ipData>;
  constructor(options: rateLimiterOptions) {
    this.windowMs = options.windowMs;
    this.max = options.max;
    this.message = options.message || {
      error: "too many request please try again",
    };
    this.headers = options.headers ?? true;
    this.ipMap = new Map();

    setInterval(() => {
      this.cleanUp();
    }, this.windowMs);
  }
  private cleanUp() {
    const now = Date.now();
    for (const [ip, data] of this.ipMap.entries()) {
      data.timeStamp = data.timeStamp.filter((ts) => now - ts < this.windowMs);
      if (data.timeStamp.length === 0) this.ipMap.delete(ip);
    }
  }

  public handler() {
    return (req: Request, res: Response, next: NextFunction) => {
      const ip: string =
        (req.headers["x-forwarded-for"] as string | undefined)
          ?.toString()
          .split(",")[0] ??
        req?.ip ??
        "unknow ";
      const now = Date.now();

      if (!this.ipMap.has(ip)) this.ipMap.set(ip, { timeStamp: [] });

      const data = this.ipMap.get(ip)!;
      data.timeStamp = data.timeStamp.filter((ts) => now - ts < this.windowMs);
      if (data.timeStamp.length >= this.max) {
        if (this.headers && data.timeStamp[0] !== undefined) {
          res.setHeader(
            "Retry-After",
            Math.ceil((this.windowMs - (now - data.timeStamp[0])) / 1000)
          );
          res.setHeader("X-RateLimit-Limit", this.max);
          res.setHeader("X-RateLimit-Remaining", 0);
        }
        return res
          .status(429)
          .json({ status: 429, message: this.message?.error });
      }
      data.timeStamp.push(now);
      if (this.headers) {
        res.setHeader("X-RateLimit-Limit", this.max);
        res.setHeader(
          "X-RateLimit-Remaining",
          this.max - data.timeStamp.length
        );
      }

      next();
    };
  }
}

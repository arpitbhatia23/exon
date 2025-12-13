import express from "express";
import mocha from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import { rateLimiter } from "../index.ts";
describe("RateLimiter Middleware", function () {
    this.timeout(5000); // in case we use setTimeout
    let app;
    beforeEach(() => {
        app = express();
        const limiter = new rateLimiter({
            windowMs: 1000, // 1 second
            max: 2, // allow 2 requests per IP
            message: { error: "Too many requests" },
            headers: true,
        });
        app.use(limiter.handler());
        app.get("/", (req, res) => {
            res.status(200).send("OK");
        });
    });
    it("should allow requests under the limit", async () => {
        const res1 = await supertest(app).get("/");
        expect(res1.status).to.equal(200);
        const res2 = await supertest(app).get("/");
        expect(res2.status).to.equal(200);
    });
    it("should block requests over the limit", async () => {
        await supertest(app).get("/");
        await supertest(app).get("/");
        const res3 = await supertest(app).get("/");
        expect(res3.status).to.equal(429);
        expect(res3.body.message).to.equal("Too many requests");
    });
    it("should reset the counter after windowMs", async () => {
        await supertest(app).get("/");
        await supertest(app).get("/");
        // wait for windowMs + 100ms
        await new Promise((r) => setTimeout(r, 1100));
        const res = await supertest(app).get("/");
        expect(res.status).to.equal(200);
    });
    it("should return rate limit headers", async () => {
        await supertest(app).get("/");
        const res = await supertest(app).get("/");
        expect(res.headers).to.have.property("x-ratelimit-limit");
        expect(res.headers).to.have.property("x-ratelimit-remaining");
        expect(res.headers["x-ratelimit-limit"]).to.equal("2");
        expect(res.headers["x-ratelimit-remaining"]).to.equal("0");
    });
});
//# sourceMappingURL=ratelimit.test.js.map
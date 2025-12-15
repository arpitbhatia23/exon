import { Router } from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";
const router = Router();

/**
 * @swagger
 * /api/v1/healthCheck:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server status
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             example:
 *               status: "ok"
 *
 */
router.get("/healthCheck", healthCheck);

export default router;

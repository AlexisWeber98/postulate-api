import express from "express";
import { whiteListController } from "./emailController.js";

export const emailRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     WhiteList:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *         registeredAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         status:
 *           type: integer
 *         code:
 *           type: string
 *
 * /email/whiteList:
 *   post:
 *     summary: Add an email to the whitelist
 *     tags: [WhiteList]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email successfully whitelisted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/WhiteList'
 *       400:
 *         description: Invalid email provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Internal server error
 */
emailRouter.post("/whiteList", whiteListController);

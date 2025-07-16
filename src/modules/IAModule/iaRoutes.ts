import { iaController } from "./iaController.js";
import express from "express";

export const iaRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     IARequest:
 *       type: object
 *       required:
 *         - prompt
 *       properties:
 *         prompt:
 *           type: string
 *           example: "¿Cuál es la capital de Francia?"
 *     IAResponse:
 *       type: object
 *       properties:
 *         iaText:
 *           type: string
 *           description: Respuesta generada por la IA
 *           example: "Después de analizar la vacante de empleo para Desarrollador Backend SSR en Parque Patricios, te proporciono las siguientes recomendaciones específicas para adaptar y mejorar tu CV: ..."
 *         tokensRemaining:
 *           type: integer
 *           description: Tokens restantes disponibles para la sesión o consulta
 *           example: 3254
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Invalid prompt provided or no prompt request"
 *         status:
 *           type: integer
 *           example: 400
 *         code:
 *           type: string
 *           example: "VALIDATION_ERROR"
 *
 * /ia/:
 *   post:
 *     summary: Get a response from the AI model
 *     tags: [IA]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IARequest'
 *           example:
 *             prompt: "https://www.computrabajo.com.co/trabajo-de-programador-full-stack-junior-en-bogota-dc-100000"
 *     responses:
 *       200:
 *         description: AI response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                   example: "Ok"
 *                 result:
 *                   $ref: '#/components/schemas/IAResponse'
 *             example:
 *               statusResponse: "Ok"
 *               result:
 *                 iaResponse: { 
 *                        "iaText": "Después de analizar la vacante de empleo para Desarrollador Backend SSR en Parque Patricios, te proporciono las siguientes recomendaciones específicas para adaptar y mejorar tu CV:",
 *                        "tokensRemaining": 3254
 *                        }
 *       400:
 *         description: Invalid prompt provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *             example:
 *               message: "Invalid prompt provided or no prompt request"
 *               status: 400
 *               code: "VALIDATION_ERROR"
 *       500:
 *         description: Internal server error
 */
iaRouter.post("/", iaController);

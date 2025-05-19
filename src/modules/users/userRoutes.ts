import express from "express";
import {
  userUpdateController,
  deleteUserController,
} from "./usersControllers.js";

export const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         lastname:
 *           type: string
 *         email:
 *           type: string
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *       description: API Key for authentication
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token for user authentication
 */

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar información de usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: No autorizado - API Key inválida
 *       404:
 *         description: Usuario no encontrado
 */
userRouter.patch("/:id", userUpdateController);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     security:
 *       - ApiKeyAuth: []
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado - Token inválido o expirado
 *       403:
 *         description: No autorizado - API Key inválida
 *       404:
 *         description: Usuario no encontrado
 */
userRouter.delete("/:id", deleteUserController);

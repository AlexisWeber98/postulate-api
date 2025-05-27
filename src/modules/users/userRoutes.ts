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
 *       required:
 *         - name
 *         - lastName
 *         - userName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único del usuario
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *         userName:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico único del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña del usuario
 *         imageUrl:
 *           type: string
 *           description: URL de la imagen de perfil del usuario
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-api-key
 *       description: API Key para autenticación
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Token JWT para autenticación de usuario
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastName
 *               - userName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error en los datos enviados
 *       409:
 *         description: El email o nombre de usuario ya está en uso
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   type: string
 *                   description: Token JWT
 *       401:
 *         description: Credenciales inválidas
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

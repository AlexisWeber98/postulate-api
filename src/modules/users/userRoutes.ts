import express from 'express';
import {
  createUserController,
  loginController,
  userUpdateController,
  deleteUserController,
} from "./usersControllers.js";

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Operaciones relacionadas con usuarios
 */

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
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 */
userRouter.post("/", createUserController);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 */
userRouter.post("/login", loginController);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Actualizar información de usuario
 *     tags: [Users]
 */
userRouter.patch("/:id", userUpdateController);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 */
userRouter.delete("/:id", deleteUserController);

export { userRouter };

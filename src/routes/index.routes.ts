import {
  createUserController,
  loginController,
  userUpdateController,
  deleteUserController,
} from "../modules/users/usersControllers.js";
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from "../modules/postulations/postulationController.js";

import express from "express";
const route = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Postulations
 *     description: Operaciones relacionadas con postulaciones
 *   - name: Users
 *     description: Operaciones relacionadas con usuarios
 */

// { ------------- Postulations --------------- } \\

/**
 * @swagger
 * /postulation:
 *   post:
 *     summary: Crear una nueva postulación
 *     tags: [Postulations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Postulation'
 *     responses:
 *       201:
 *         description: Postulación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postulation'
 *       400:
 *         description: Datos de entrada inválidos
 */
route.post("/postulation", postPostulationController);

/**
 * @swagger
 * /postulations/{id}:
 *   get:
 *     summary: Obtener todas las postulaciones de un usuario
 *     tags: [Postulations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de postulaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Postulation'
 *       404:
 *         description: Usuario no encontrado
 */
route.get("/postulations/:id", getAllPostulationsController);

/**
 * @swagger
 * /postulation/{id}:
 *   get:
 *     summary: Obtener una postulación por ID
 *     tags: [Postulations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la postulación
 *     responses:
 *       200:
 *         description: Detalles de la postulación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postulation'
 *       404:
 *         description: Postulación no encontrada
 */
route.get("/postulation/:id", getPostulationByIdController);

/**
 * @swagger
 * /postulation:
 *   patch:
 *     summary: Actualizar una postulación
 *     tags: [Postulations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostulationUpdate'
 *     responses:
 *       200:
 *         description: Postulación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postulation'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Postulación no encontrada
 */
route.patch("/postulation", updatePostulationController);

/**
 * @swagger
 * /postulation/{id}:
 *   delete:
 *     summary: Eliminar una postulación
 *     tags: [Postulations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la postulación
 *     responses:
 *       204:
 *         description: Postulación eliminada
 *       404:
 *         description: Postulación no encontrada
 */
route.delete("/postulation/:id", deletePostulationController);

// { ------------- Users --------------- } \\

/**
 * @swagger
 * /user:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de usuario inválidos
 *       409:
 *         description: Usuario ya existe
 */
route.post("/user", createUserController);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *       - in: query
 *         name: password
 *         schema:
 *           type: string
 *         required: true
 *         description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *       401:
 *         description: Credenciales inválidas
 */
route.get("/login", loginController);

/**
 * @swagger
 * /user/{id}:
 *   patch:
 *     summary: Actualizar información de usuario
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: Usuario no encontrado
 */
route.patch("/user/:id", userUpdateController);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
route.delete("/user/:id", deleteUserController);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-generado
 *         name:
 *           type: string
 *           description: Nombre completo del usuario
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         password:
 *           type: string
 *           format: password
 *           description: Contraseña (mínimo 6 caracteres)
 *       example:
 *         name: Juan Pérez
 *         email: juan@example.com
 *         password: "123456"
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nuevo nombre
 *         email:
 *           type: string
 *           format: email
 *           description: Nuevo email
 *       example:
 *         name: Juan Pérez Actualizado
 *         email: juan.nuevo@example.com
 *
 *     Postulation:
 *       type: object
 *       required:
 *         - userId
 *         - position
 *         - company
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-generado
 *         userId:
 *           type: string
 *           description: ID del usuario que postula
 *         position:
 *           type: string
 *           description: Puesto al que postula
 *         company:
 *           type: string
 *           description: Empresa a la que postula
 *         status:
 *           type: string
 *           enum: [pending, reviewed, rejected, accepted]
 *           default: pending
 *           description: Estado de la postulación
 *       example:
 *         userId: "507f1f77bcf86cd799439011"
 *         position: "Desarrollador Full Stack"
 *         company: "Tech Corp"
 *         status: "pending"
 *
 *     PostulationUpdate:
 *       type: object
 *       properties:
 *         position:
 *           type: string
 *           description: Nuevo puesto
 *         company:
 *           type: string
 *           description: Nueva empresa
 *         status:
 *           type: string
 *           enum: [pending, reviewed, rejected, accepted]
 *           description: Nuevo estado
 *       example:
 *         position: "Desarrollador Senior"
 *         company: "Tech Corp Updated"
 *         status: "reviewed"
 */

export default route;

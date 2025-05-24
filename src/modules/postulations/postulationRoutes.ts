import express from "express";
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from "./postulationController.js";

export const postulationRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Postulation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         applicationDate:
 *           type: string
 *           format: date
 *         position:
 *           type: string
 *         company:
 *           type: string
 *         link:
 *           type: string
 *         userId:
 *           type: string
 *         status:
 *           type: string
 *         description:
 *           type: string
 *         sendCv:
 *           type: boolean
 *         sendEmail:
 *           type: boolean
 *         recruiterContact:
 *           type: string
 */

/**
 * @swagger
 * /postulations:
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
 */
postulationRouter.post("/", postPostulationController);

/**
 * @swagger
 * /postulations/user/{id}:
 *   get:
 *     summary: Obtener todas las postulaciones de un usuario (paginado)
 *     tags: [Postulations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de resultados por página
 *       - in: query
 *         name: applicationDate
 *         schema:
 *           type: string
 *         description: Filtrar por fecha de aplicación
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Filtrar por posición
 *       - in: query
 *         name: company
 *         schema:
 *           type: string
 *         description: Filtrar por empresa
 *       - in: query
 *         name: link
 *         schema:
 *           type: string
 *         description: Filtrar por link
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtrar por estado
 *       - in: query
 *         name: sendCv
 *         schema:
 *           type: boolean
 *         description: Filtrar por envío de CV
 *       - in: query
 *         name: sendEmail
 *         schema:
 *           type: boolean
 *         description: Filtrar por envío de email
 *     responses:
 *       200:
 *         description: Lista paginada de postulaciones del usuario
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
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Postulation'
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       404:
 *         description: Usuario no encontrado
 */
postulationRouter.get("/user/:id", getAllPostulationsController);

/**
 * @swagger
 * /postulations/{id}:
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
postulationRouter.get("/:id", getPostulationByIdController);

/**
 * @swagger
 * /postulations/{id}:
 *   patch:
 *     summary: Actualizar una postulación
 *     tags: [Postulations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la postulación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Postulation'
 *           example:
 *             status: "approved"
 *             description: "Actualización de estado"
 *     responses:
 *       200:
 *         description: Postulación actualizada exitosamente
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: Postulación no encontrada
 */
postulationRouter.patch("/:id", updatePostulationController);

/**
 * @swagger
 * /postulations/{id}:
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
 *       200:
 *         description: Postulación eliminada exitosamente
 *       404:
 *         description: Postulación no encontrada
 */
postulationRouter.delete("/:id", deletePostulationController);

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
 *       required:
 *         - applicationDate
 *         - company
 *         - position
 *         - status
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identificador único de la postulación
 *         applicationDate:
 *           type: string
 *           format: date
 *           description: Fecha de aplicación
 *         company:
 *           type: string
 *           description: Nombre de la empresa
 *         position:
 *           type: string
 *           description: Posición o cargo al que se postula
 *         link:
 *           type: string
 *           description: Enlace a la oferta de trabajo
 *         status:
 *           type: string
 *           description: Estado de la postulación
 *         description:
 *           type: string
 *           description: Descripción adicional de la postulación
 *         sendEmail:
 *           type: boolean
 *           description: Indica si se envió email
 *         sendCv:
 *           type: boolean
 *           description: Indica si se envió CV
 *         recruiterContact:
 *           type: string
 *           description: Información de contacto del reclutador
 *         userId:
 *           type: string
 *           format: uuid
 *           description: ID del usuario que realizó la postulación
 */

/**
 * @swagger
 * /postulations:
 *   post:
 *     summary: Crear una nueva postulación
 *     tags: [Postulations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - applicationDate
 *               - company
 *               - position
 *               - status
 *               - userId
 *             properties:
 *               applicationDate:
 *                 type: string
 *                 format: date
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *               link:
 *                 type: string
 *               status:
 *                 type: string
 *               description:
 *                 type: string
 *               sendEmail:
 *                 type: boolean
 *               sendCv:
 *                 type: boolean
 *               recruiterContact:
 *                 type: string
 *               userId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Postulación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   $ref: '#/components/schemas/Postulation'
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
postulationRouter.post("/", postPostulationController);

/**
 * @swagger
 * /postulations/user/{id}:
 *   get:
 *     summary: Obtener todas las postulaciones de un usuario (paginado)
 *     tags: [Postulations]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
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
 *           format: date
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
 *       401:
 *         description: No autorizado
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la postulación
 *     responses:
 *       200:
 *         description: Detalles de la postulación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   $ref: '#/components/schemas/Postulation'
 *       401:
 *         description: No autorizado
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la postulación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   applicationDate:
 *                     type: string
 *                     format: date
 *                   company:
 *                     type: string
 *                   position:
 *                     type: string
 *                   link:
 *                     type: string
 *                   status:
 *                     type: string
 *                   description:
 *                     type: string
 *                   sendEmail:
 *                     type: boolean
 *                   sendCv:
 *                     type: boolean
 *                   recruiterContact:
 *                     type: string
 *     responses:
 *       200:
 *         description: Postulación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusResponse:
 *                   type: string
 *                 result:
 *                   $ref: '#/components/schemas/Postulation'
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: No autorizado
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
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID de la postulación
 *     responses:
 *       200:
 *         description: Postulación eliminada exitosamente
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
 *                     message:
 *                       type: string
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Postulación no encontrada
 */
postulationRouter.delete("/", deletePostulationController);

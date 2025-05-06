import express from "express";
import {
  postPostulationController,
  getAllPostulationsController,
  getPostulationByIdController,
  updatePostulationController,
  deletePostulationController,
} from "./postulationController.js";

const postulationRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Postulations
 *     description: Operaciones relacionadas con postulaciones
 */

/**
 * @swagger
 * /postulation:
 *   post:
 *     summary: Crear una nueva postulación
 *     tags: [Postulations]
 */
postulationRouter.post("/", postPostulationController);

/**
 * @swagger
 * /postulations/{id}:
 *   get:
 *     summary: Obtener todas las postulaciones de un usuario
 *     tags: [Postulations]
 */
postulationRouter.get("/user/:id", getAllPostulationsController);

/**
 * @swagger
 * /postulation/{id}:
 *   get:
 *     summary: Obtener una postulación por ID
 *     tags: [Postulations]
 */
postulationRouter.get("/:id", getPostulationByIdController);

/**
 * @swagger
 * /postulation:
 *   patch:
 *     summary: Actualizar una postulación
 *     tags: [Postulations]
 */
postulationRouter.patch("/:id", updatePostulationController);

/**
 * @swagger
 * /postulation/{id}:
 *   delete:
 *     summary: Eliminar una postulación
 *     tags: [Postulations]
 */
postulationRouter.delete("/:id", deletePostulationController);

export { postulationRouter };

import { Request, Response } from "express";
import { ReqPostBody } from "./interface";
import { validationPostPostulation } from "./validaton";
import {
  getAllPostulations,
  postPostulation,
  getPostulationById,
  updatePostulationService,
  deletePostulationService,
} from "./postulationService";
import serverResponse from "../../utils/response";

export const postPostulationController = async (
  req: Request,
  res: Response,
) => {
  const { date, position, company, trough, userId }: ReqPostBody = req.body;

  const errors = validationPostPostulation(
    date,
    position,
    company,
    trough,
    userId,
  );

  try {
    if (errors)
      return res.status(400).json(serverResponse("ValidationError", errors));

    const postulation = await postPostulation(req.body);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const getAllPostulationsController = async (
  req: Request,
  res: Response,
) => {
  const { userId } = req.body;
  const { date, position, company, trough, status, sendCv, sendEmail } =
    req.query;

  try {
    const filters = Object.fromEntries(
      Object.entries({
        date,
        position,
        company,
        trough,
        status,
        sendCv,
        sendEmail,
      }).filter(([_, value]) => value !== undefined),
    );

    const postulation = await getAllPostulations(userId, filters);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const getPostulationByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id: postulationId } = req.params;

  try {
    const postulation = await getPostulationById(postulationId);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const updatePostulationController = async (
  req: Request,
  res: Response,
) => {
  const { data, postulationId } = req.body;

  try {
    const postulation = await updatePostulationService(postulationId, data);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const deletePostulationController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.body;
  try {
    const postulation = await deletePostulationService(id);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

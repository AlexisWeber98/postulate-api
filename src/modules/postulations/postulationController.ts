import { Request, Response } from "express";
import { ReqPostBody } from "./interface.js";
import { validationPostPostulation } from "./validaton.js";
import {
  getAllPostulationsService,
  postPostulationService,
  getPostulationByIdService,
  updatePostulationService,
  deletePostulationService,
} from "./postulationService.js";
import serverResponse from "../../utils/response.js";

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

    const postulation = await postPostulationService(req.body);

    return res.status(200).json(serverResponse("Ok", { postulation }));
  } catch (error: any) {
    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const getAllPostulationsController = async (
  req: Request,
  res: Response,
) => {
  const { id: userId } = req.params;
  const { date, position, company, trough, status, sendCv, sendEmail } =
    req.query;

  try {
    if (!userId)
      return res
        .status(400)
        .json(serverResponse("Error", { message: "userId not found" }));

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

    const postulations = await getAllPostulationsService(userId, filters);

    return res.status(200).json(serverResponse("Ok", { postulations }));
  } catch (error: any) {
    console.error("Error in getAllPostulationsController:", error);

    return res.status(500).json(serverResponse("Error", error.message));
  }
};

export const getPostulationByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id: postulationId } = req.params;

  try {
    const postulation = await getPostulationByIdService(postulationId);

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

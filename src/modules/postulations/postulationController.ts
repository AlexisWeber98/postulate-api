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
import { catchAsync } from "../../utils/catchAsync.js";
import { Logger } from "../../utils/logger.js";
import { ValidationError } from "../../utils/errors.js";

export const postPostulationController = catchAsync(
  async (req: Request, res: Response) => {
    const { applicationDate, position, company, userId }: ReqPostBody =
      req.body;

    console.log("req.body", req.body);
    const errors = validationPostPostulation(
      applicationDate,
      position,
      company,
      userId,
    );

    if (errors) throw new ValidationError(errors.message || "validation error");

    const postulation = await postPostulationService(req.body);
    return res.status(200).json(serverResponse("Ok", { postulation }));
  },
);

export const getAllPostulationsController = catchAsync(
  async (req: Request, res: Response) => {
    const { id: userId } = req.params;
    const {
      applicationDate,
      position,
      company,
      link,
      status,
      sendCv,
      sendEmail,
    } = req.query;

    if (!userId) throw new ValidationError("userId not found");

    const filters = Object.fromEntries(
      Object.entries({
        applicationDate,
        position,
        company,
        link,
        status,
        sendCv,
        sendEmail,
      }).filter(([_, value]) => value !== undefined),
    );

    const postulations = await getAllPostulationsService(userId, filters);
    return res.status(200).json(serverResponse("Ok", { postulations }));
  },
);

export const getPostulationByIdController = catchAsync(
  async (req: Request, res: Response) => {
    const { id: postulationId } = req.params;

    if (!postulationId) throw new ValidationError("postulationId not found");

    const postulation = await getPostulationByIdService(postulationId);
    return res.status(200).json(serverResponse("Ok", { postulation }));
  },
);

export const updatePostulationController = catchAsync(
  async (req: Request, res: Response) => {
    const { data, postulationId } = req.body;

    if (!data || !postulationId)
      throw new ValidationError("data or postulationId not found");

    const postulation = await updatePostulationService(postulationId, data);
    return res.status(200).json(serverResponse("Ok", { postulation }));
  },
);

export const deletePostulationController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) throw new ValidationError("id not found");

    const postulation = await deletePostulationService(id);
    return res.status(200).json(serverResponse("Ok", { postulation }));
  },
);

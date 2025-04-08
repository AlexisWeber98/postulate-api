import db from "../../db.js";
import { ReqPostBody } from "./interface.js";
const { Postulations, User } = db.models;
import { Logger } from "../../utils/logger.js";
import {
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../../utils/errors.js";

export const postPostulationService = async (body: ReqPostBody) => {
  const {
    applicationDate,
    position,
    company,
    link,
    userId,
    status,
    description,
    sendCv,
    sendEmail,
    recruiterContact,
  } = body;

  try {
    const findUserId = await User.findByPk(userId);
    if (!findUserId) throw new NotFoundError("User not found");

    const data = await Postulations.create({
      applicationDate,
      position,
      company,
      link,
      userId,
      status,
      description,
      sendCv,
      sendEmail,
      recruiterContact,
    });

    Logger.info("Postulation created", {
      postulationId: data,
      userId,
    });

    return data;
  } catch (error) {
    Logger.error("Error creating postulation", error as Error, { userId });
    if (error instanceof ValidationError) {
      throw error;
    }
    throw new DatabaseError("Error creating postulation");
  }
};

export const getAllPostulationsService = async (
  userId: string,
  filters: any,
) => {
  try {
    const whereClause: any = { userId };
    const validFilters = [
      "applicationDate",
      "position",
      "company",
      "link",
      "status",
      "description",
    ];

    validFilters.forEach((filter) => {
      if (filters[filter]) {
        whereClause[filter] = filters[filter];
      }
    });

    if (filters.sendCv) {
      whereClause.sendCv = filters.sendCv === "true";
    }

    if (filters.sendEmail) {
      whereClause.sendEmail = filters.sendEmail === "true";
    }

    const data = await Postulations.findAll({ where: whereClause });

    if (!data || data.length === 0) {
      Logger.info("No Postulatios found", { userId });
      return [];
    }

    return data;
  } catch (error) {
    Logger.error("Error getting postulations", error as Error, { userId });
    throw new DatabaseError("Error getting postulations");
  }
};

export const getPostulationByIdService = async (postulationId: string) => {
  try {
    const data = await Postulations.findByPk(postulationId);

    if (!data) throw new NotFoundError("Postulation not found");

    return data;
  } catch (error) {
    Logger.error("Error getting postulation", error as Error, {
      postulationId,
    });
    if (error instanceof NotFoundError) {
      throw error;
    }

    throw new DatabaseError("Error getting postulation");
  }
};

export const updatePostulationService = async (
  postulationId: string,
  data: object,
) => {
  try {
    const postulation = await Postulations.findByPk(postulationId);
    if (!postulation) {
      throw new NotFoundError("Postulation not found");
    }

    await postulation.update(data);

    Logger.info("Postulation updated", { postulationId });
    return postulation;
  } catch (error) {
    Logger.error("Error updating postulation", error as Error, {
      postulationId,
    });
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError("Error updating postulation");
  }
};

export const deletePostulationService = async (id: string) => {
  try {
    const result = await Postulations.destroy({ where: { id } });

    if (result === 0) {
      throw new NotFoundError("Postulation not found");
    }

    Logger.info("Postulation deleted", { postulationId: id });
    return { message: "Postulation deleted succesfuly" };
  } catch (error) {
    Logger.error("Error deleting postulation", error as Error, {
      postulationId: id,
    });
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError("Error deleting postulation");
  }
};

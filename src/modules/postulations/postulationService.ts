import db from "../../db.js";
import { Model } from "sequelize";
import { PostulationsModelInterface } from "../../models/modelTypes.js";
import { ReqPostBody } from "./interface.js";
const { Postulations, User } = db.models;

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
    console.log("findUserId", findUserId);
    if (!findUserId) throw new Error("user not found");

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

    return data ? data : "withouth data";
  } catch (error) {
    throw error;
  }
};

export const getAllPostulationsService = async (
  userId: string,
  filters: any,
) => {
  try {
    const whereClause: any = {};
    whereClause.userId = userId;
    if (filters.applicationDate)
      whereClause.applicationDate = filters.applicationDate;
    if (filters.position) whereClause.position = filters.position;
    if (filters.company) whereClause.company = filters.company;
    if (filters.link) whereClause.link = filters.link;
    if (filters.status) whereClause.status = filters.status;
    if (filters.description) whereClause.description = filters.description;
    if (filters.sendCv !== undefined)
      whereClause.sendCv = filters.sendCv === "true";
    if (filters.sendEmail !== undefined)
      whereClause.sendEmail = filters.sendEmail === "true";
    console.log("Where Clause:", whereClause);
    const data = await Postulations.findAll({ where: whereClause });

    if (!data || data.length === 0) throw new Error("No postulations yet");
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPostulationByIdService = async (postulationId: string) => {
  try {
    const data = await Postulations.findByPk(postulationId);

    if (!data) throw new Error("Postulation not Found");

    return data;
  } catch (error) {
    throw error;
  }
};

export const updatePostulationService = async (
  postulationId: string,
  data: object,
) => {
  try {
    const postulation = await Postulations.findByPk(postulationId);
    if (!postulation) throw new Error("Postulation not found");

    await postulation.update(data);

    return postulation;
  } catch (error) {
    throw error;
  }
};

export const deletePostulationService = async (id: string) => {
  try {
    await Postulations.destroy({ where: { id } });
    return "Postulation delete";
  } catch (error) {
    throw error;
  }
};

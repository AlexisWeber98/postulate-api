import { Request, Response } from "express";
const { Postulations, User } = require("../../db");


export const postPostulation = async (body: any) => {
  const { date, position, company, trough, userId , status, description, sendCv, sendEmail, recruiterContact} = body

    try {
      const findUserId = await User.findByPk(userId);
      if (!findUserId) throw new Error("user not found");

      const data = await Postulations.create({
        date,
        position,
        company,
        trough,
        userId,
        status,
        description,
        sendCv,
        sendEmail,
        recruiterContact
      });
      
    await findUserId.addPostulation(data);

        return data;
        
    } catch (error) {

        throw error;
        
    }
};


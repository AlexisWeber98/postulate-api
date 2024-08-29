import db from "../../db";
import { Model } from "sequelize";
import { PostulationsModelInterface } from "../../models/modelTypes";
const { Postulations, User } = db.models;

export const postPostulation = async (body: any) => {
  const { date, position, company, trough, userId , status, description, sendCv, sendEmail, recruiterContact    } = body
  
  console.log(body)

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

        return data;
        
    } catch (error) {

        throw error;
        
    }
};

export const getAllPostulations = async(userId: string) => {
   try {
       const data = await Postulations.findAll({ where: { userId }});
       return data;
       
   }catch (error){
       throw error;
   } 
}


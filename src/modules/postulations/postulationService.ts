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

       return data? data: "withouth data"
        
    } catch (error) {

        throw error;
        
    }
};

export const getAllPostulations = async(userId: string, filters: any ) => {
   try {
       const whereClause: any = {} 
       
       // Agregar filtros opcionales si están presentes
    
            whereClause.userId = userId;
            if (filters.date) whereClause.date = filters.date;
            if (filters.position) whereClause.position = filters.position;
            if (filters.company) whereClause.company = filters.company;
            if (filters.trough) whereClause.trough = filters.trough;
            if (filters.status) whereClause.status = filters.status;
            if (filters.description) whereClause.description = filters.description;
            if (filters.sendCv !== undefined) whereClause.sendCv = filters.sendCv === 'true';
            if (filters.sendEmail !== undefined) whereClause.sendEmail = filters.sendEmail === 'true';
            console.log("Where Clause:", whereClause);
       const data = await Postulations.findAll({ where: whereClause  });
       
       return data? data: "withouth data"
       
   }catch (error){
       throw error;
   } 
}

export const getPostulationById = async( postulationId:string) => {
    try {
        const data = await Postulations.findOne({ where: {id: postulationId } });
        return data? data: "withouth data"
    } catch (error){
        throw error;
    }
}


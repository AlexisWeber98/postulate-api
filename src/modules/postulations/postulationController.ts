import { Request, Response } from "express";
import { ReqPostBody } from "./interface";
import { validationPostPostulation } from "./validaton";
import {getAllPostulations, postPostulation,getPostulationById} from "./postulationService";

export const postPostulationController = async (req: Request, res: Response) => {
  const { date, position, company, trough, userId }: ReqPostBody = req.body;
  
  const errors = validationPostPostulation(date, position, company, trough, userId);
  
  try {
  
  if (errors) return res.status(404).json(errors);
      
      const data = await postPostulation(req.body)
      
      const response = {
          result: "Ok",
          data
      };
      
      res.status(200).json(response);
  } catch (error: any) {
      const response = {
          result: "Error",
          error: error.message
      };
      
      
      res.status(500).json(response)
  }
  
  
}

export const getAllPostulationsController = async (req: Request, res: Response) => {
    const { userId } = req.body
    const { date, position, company, trough, status, sendCv, sendEmail } = req.query;
    
    try {
        const filters = {date, position, company, trough, status, sendCv, sendEmail };
        const data = await getAllPostulations(userId, filters);
        
        const response = {
            result: "Ok",
            data
        };
        
        res.status(200).json(response);
        
    }  catch (error: any) {
        const response = {
            result: "Error",
            error: error.message
        };
        
        
        res.status(500).json(response);
    }
};

export const getAllPostulationByIdController = async(req: Request, res:Response)=>{
    const {  id:postulationId } = req.params
    
    try { 
        const data = await getPostulationById(postulationId);
        
        const response = {
            result: "Ok",
            data
        };
        
        res.status(200).json(response);
        
    } catch (error: any) {
        const response = {
            result: "Error",
            error: error.message
        };
        
        res.status(500).json(response);
    } 
}

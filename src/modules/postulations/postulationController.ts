import { Request, Response } from "express";
import { ReqPostBody } from "./interface";
import { validationPostPostulation } from "./validaton";
import {postPostulation} from "./postulationService";

export const postPostulationController = async (req: Request, res: Response) => {
  const { date, position, company, trough, userId }: ReqPostBody = req.body;
  
  const errors = validationPostPostulation(date, position, company, trough, userId);
  
  if (errors) return res.status(404).json(errors);
  
  try {
      
      const data = await postPostulation(req.body)
      
      const response = {
          result: "Ok",
          data
      };
      
      return res.status(200).json(response);
  } catch(error) {
    
      const response = {
          result: "error",
          error
      }
      
      res.status(500).json(response)
  }
  
  
}

export const getAllPostulationsController = async(req: Request, res:Response)=>{
    
}

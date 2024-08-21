import { Request, Response } from "express";
const { Postulations } = require("../../db");

const getPostlations = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    const post = await Postulations.findAll({ where: { userId } });

    return res.status(200).json(post);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    } else {
      return res.status(500).send("Unexpected error");
    }
  }
};

export default getPostlations;

import { Response, Request } from "express";
const { User } = require("../../db");
import { validationPostUser } from "../validaton";

interface ReqUserBody {
  name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
}

const postUser = async (req: Request, res: Response) => {
  const { name, last_name, user_name, email, password }: ReqUserBody = req.body;

  const errors = validationPostUser(
    name,
    last_name,
    user_name,
    email,
    password
  );

  if (errors) return res.status(404).json(errors);
  else {
    try {
      const post = await User.create({
        name,
        last_name,
        user_name,
        email,
        password,
      });

      return res.status(200).json(post);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      } else {
        return res.status(500).send("Unexpeted error");
      }
    }
  }
};

export default postUser;

import { Response, Request } from "express";
import { validationLogin } from "../validaton";
const { User } = require("../../db");

const login = async (req: Request, res: Response) => {

  const { email, password } = req.query as { email: string, password: string };

const errors = validationLogin(email, password)
  if (errors) return res.status(400).json(errors);
  else {
    try {
      const findUserMail = await User.findOne({ where: { email } });

      if (!findUserMail) throw new Error("user not found");

      if (findUserMail.password !== password)
        throw new Error("Password not macth");

      return res.status(200).json({ acces: true, user: findUserMail });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      } else {
        return res.status(500).send("unexpected error");
      }
    }
  }
};

export default login;

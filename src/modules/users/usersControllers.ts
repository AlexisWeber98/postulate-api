import { Request, Response } from "express";
import { validationLogin, validationPostUser } from "./validation.js";
import { ReqUserBody } from "./interface.js";
import { createUser, login, userUpadeService } from "./usersServecie.js";
import serverResponse from "../../utils/response.js";

export const createUserController = async (req: Request, res: Response) => {
  const { name, lastName, userName, email, password }: ReqUserBody = req.body;

  const errors = validationPostUser(name, lastName, userName, email, password);

  try {
    if (errors) return res.status(400).json(errors);

    const data = await createUser(
      name.trim(),
      lastName.trim(),
      userName.trim(),
      email.trim().toLowerCase(),
      password.trim(),
    );

    const response = {
      result: "Ok",
      data,
    };

    res.status(200).json(response);
  } catch (error) {
    const response = {
      result: "Error",
      error,
    };
    res.status(500).json(response);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errors = validationLogin(email, password);

  if (errors) res.status(400).json(errors);

  try {
    const data = await login(email, password);

    const response = {
      result: "Ok",
      data,
    };

    res.status(200).json(response);
  } catch (error) {
    const response = {
      result: "Error",
      error,
    };
    res.status(500).json(response);
  }
};

export const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { data, userId } = req.body;
    const user = await userUpadeService(userId, data);
    return res.status(200).json(serverResponse("Ok", { user }));
  } catch (error) {}
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

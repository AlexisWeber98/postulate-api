import { Request, Response } from "express";
import { ReqUserBody } from "./interface.js";
import { validationPostUser } from "./validation.js";
import { createUser, login, userUpadeService } from "./usersServecie.js";
import serverResponse from "../../utils/response.js";

export const createUserController = async (req: Request, res: Response) => {
  const { name, lastName, userName, email, password }: ReqUserBody = req.body;

  const errors = validationPostUser(name, lastName, userName, email, password);

  try {
    if (errors?.message) return res.status(400).json(errors);

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
  const { email, password } = req.query;

  if (!email || !password) {
    return res.status(400).json({
      result: "Error",
      message: "email y password son requeridos",
    });
  }

  try {
    const data = await login(email.toString(), password.toString());

    if (!data) {
      return res
        .status(404)
        .json({ result: "Error", message: "Usuario no encontrado" });
    }

    res.status(200).json({ result: "Ok", data });
  } catch (error: any) {
    console.error("Error en el login:", error);
    res.status(500).json({ result: "Error", message: error.message });
  }
};

export const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { data, userId } = req.body;
    const user = await userUpadeService(userId, data);
    return res.status(200).json(serverResponse("Ok", { user }));
  } catch (error) {
    return res.status(500).json({ result: "Error", error });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    // Código pendiente
  } catch (error) {
    return res.status(500).json({ result: "Error", error });
  }
};

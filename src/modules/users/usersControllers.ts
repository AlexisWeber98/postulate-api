import { Request, Response } from "express";
import { ReqUserBody } from "./interface.js";
import { validationPostUser } from "./validation.js";
import { createUser, login, userUpadeService } from "./usersService.js";
import serverResponse from "../../utils/response.js";
import {
  ValidationError,
  DatabaseError,
  AuthenticationError,
} from "../../utils/errors.js";
import { Logger } from "../../utils/logger.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const createUserController = catchAsync(
  async (req: Request, res: Response) => {
    const { name, lastName, userName, email, password }: ReqUserBody = req.body;

    const errors = validationPostUser(
      name,
      lastName,
      userName,
      email,
      password,
    );

    if (errors?.message) throw new ValidationError(errors.message);

    const data = await createUser(
      name.trim(),
      lastName.trim(),
      userName.trim(),
      email.trim().toLowerCase(),
      password.trim(),
    );

    res.status(201).json(serverResponse("Ok", data));
  },
);

export const loginController = catchAsync(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password)
      throw new ValidationError("Email or password not found");

    const data = await login(email.toString(), password.toString());

    if (!data) throw new ValidationError("User not found");

    res.status(200).json(serverResponse("Ok", data));
  },
);

export const userUpdateController = catchAsync(
  async (req: Request, res: Response) => {
    const { data, userId } = req.body;
    if (!data || !userId) throw new ValidationError("data or userId not found");

    const user = await userUpadeService(userId, data);

    if (!user) {
      Logger.error("Error updating user");
    }
    return res.status(200).json(serverResponse("Ok", { user }));
  },
);

export const deleteUserController = catchAsync(
  async (req: Request, res: Response) => {
    // Código pendiente
    return;
  },
);

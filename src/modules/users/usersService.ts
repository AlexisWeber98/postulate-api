import db from "../../db.js";
import { Model, Op } from "sequelize";
import { UserModelInterface } from "../../models/modelTypes.js";
import {
  DatabaseError,
  AuthenticationError,
  ConflictError,
} from "../../utils/errors.js";
import { hashPassword, verifyPassword } from "../../utils/hashPassword.js";
import { generateToken } from "../../utils/jwt.js";
import { Logger } from "../../utils/logger.js";

const { User: SequelizeUser } = db.models;

export const createUser = async (
  name: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  imageUrl?: string,
) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await SequelizeUser.findOne({
      where: {
        [Op.or]: [
          { email: email.trim().toLowerCase() },
          { userName: userName.trim() },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.get("email") === email.trim().toLowerCase()) {
        throw new ConflictError("El correo electrónico ya está registrado");
      }
      if (existingUser.get("userName") === userName.trim()) {
        throw new ConflictError("El nombre de usuario ya está en uso");
      }
    }

    const passwordHashed = await hashPassword(password.trim());

    const data = await SequelizeUser.create({
      name: name.trim(),
      lastName: lastName.trim(),
      userName: userName.trim(),
      email: email.trim().toLowerCase(),
      password: passwordHashed.trim(),
      imageUrl: imageUrl?.trim(),
    });

    Logger.info("User created");

    return data;
  } catch (error) {
    if (error instanceof ConflictError) {
      throw error;
    }

    Logger.error("Error creating user", error as Error, {
      email,
      userName,
    });

    throw new DatabaseError("Error creating user");
  }
};

export const login = async (email: string, password: string) => {
  const user = (await SequelizeUser.findOne({
    where: { email: email.trim().toLowerCase() },
  })) as Model<UserModelInterface>;
  if (!user) {
    throw new AuthenticationError("user not found");
  }

  const storedPassword = user.get("password") as string;
  const isPasswordValid = await verifyPassword(storedPassword, password);
  if (!isPasswordValid) {
    throw new AuthenticationError("Invalid credentials");
  }

  const token = generateToken(user.get());
  return token;
};

export const userUpadeService = async (userId: string, data: object) => {
  try {
    const user = await SequelizeUser.findByPk(userId);

    if (!user) throw new AuthenticationError("User not found");

    Logger.info("User updated", { userId });

    await user.update(data);

    return user;
  } catch (error) {
    if (error instanceof AuthenticationError) throw error;
  }
};

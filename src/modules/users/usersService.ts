import db from "../../db.js";
import { Model } from "sequelize";
import { UserModelInterface } from "./interface.js";
import { DatabaseError, AuthenticationError } from "../../utils/errors.js";
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
) => {
  try {
    const passwordHashed = await hashPassword(password.trim());

    const data = await SequelizeUser.create({
      name,
      lastName: lastName.trim(),
      userName: userName.trim(),
      email: email.trim().toLowerCase(),
      password: passwordHashed,
    });

    Logger.info("User created");

    return data;
  } catch (error) {
    Logger.error("Error creating user", error as Error, {
      email,
      userName,
    });

    throw new DatabaseError("Error creating user");
  }
};

export const login = async (email: string, password: string) => {
  const user = (await SequelizeUser.findOne({
    where: { email },
  })) as Model<UserModelInterface>;
  if (!user) {
    throw new AuthenticationError("Invalid credentials");
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

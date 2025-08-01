import db from "../../../db.js";
import { AuthenticationError, ConflictError } from "../../../utils/errors.js";
import { hashPassword, verifyPassword } from "../../../utils/hashPassword.js";
import { generateToken } from "../../../utils/jwt.js";
import { createUser, login, userUpadeService } from "../usersService.js";

// Mocking dependencies
jest.mock("../../../db", () => ({
  models: {
    User: {
      findOne: jest.fn(),
      create: jest.fn(),
      findByPk: jest.fn(),
    },
  },
}));

jest.mock("../../../utils/hashPassword", () => ({
  hashPassword: jest.fn(),
  verifyPassword: jest.fn(),
}));

jest.mock("../../../utils/jwt", () => ({
  generateToken: jest.fn(),
}));

const { User: SequelizeUser } = db.models;

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      (SequelizeUser.findOne as jest.Mock).mockResolvedValue(null);
      (hashPassword as jest.Mock).mockResolvedValue("hashedPassword");
      (SequelizeUser.create as jest.Mock).mockResolvedValue({
        id: "1",
        name: "Test",
      });

      const user = await createUser(
        "Test",
        "User",
        "testuser",
        "test@example.com",
        "password"
      );

      expect(SequelizeUser.findOne).toHaveBeenCalledWith({
        where: {
          [Symbol.for("or")]: [
            { email: "test@example.com" },
            { userName: "testuser" },
          ],
        },
      });
      expect(hashPassword).toHaveBeenCalledWith("password");
      expect(SequelizeUser.create).toHaveBeenCalledWith({
        name: "Test",
        lastName: "User",
        userName: "testuser",
        email: "test@example.com",
        password: "hashedPassword",
        imageUrl: undefined,
      });
      expect(user).toEqual({ id: "1", name: "Test" });
    });

    it("should throw ConflictError if user already exists", async () => {
      (SequelizeUser.findOne as jest.Mock).mockResolvedValue({
        get: () => "test@example.com",
      });

      await expect(
        createUser("Test", "User", "testuser", "test@example.com", "password")
      ).rejects.toThrow(
        new ConflictError("El correo electrónico ya está registrado")
      );
    });
  });

  describe("login", () => {
    it("should return a token for valid credentials", async () => {
      const mockUser = {
        get: (key: string) => {
          if (key === "password") return "hashedPassword";
          return {};
        },
      };
      (SequelizeUser.findOne as jest.Mock).mockResolvedValue(mockUser);
      (verifyPassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue("fake-token");

      const token = await login("test@example.com", "password");

      expect(SequelizeUser.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(verifyPassword).toHaveBeenCalledWith("hashedPassword", "password");
      expect(generateToken).toHaveBeenCalled();
      expect(token).toBe("fake-token");
    });

    it("should throw AuthenticationError for invalid credentials", async () => {
      (SequelizeUser.findOne as jest.Mock).mockResolvedValue(null);

      await expect(login("test@example.com", "password")).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  describe("userUpadeService", () => {
    it("should update a user successfully", async () => {
      const mockUser = {
        update: jest.fn(),
      };
      (SequelizeUser.findByPk as jest.Mock).mockResolvedValue(mockUser);

      await userUpadeService("1", { name: "Updated" });

      expect(SequelizeUser.findByPk).toHaveBeenCalledWith("1");
      expect(mockUser.update).toHaveBeenCalledWith({ name: "Updated" });
    });

    it("should throw AuthenticationError if user not found", async () => {
      (SequelizeUser.findByPk as jest.Mock).mockResolvedValue(null);

      await expect(userUpadeService("1", { name: "Updated" })).rejects.toThrow(
        AuthenticationError
      );
    });
  });
});

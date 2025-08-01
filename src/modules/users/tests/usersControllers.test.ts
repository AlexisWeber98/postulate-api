import { Request, Response } from "express";
import {
  createUserController,
  loginController,
  userUpdateController,
} from "../usersControllers.js";
import * as userService from "../usersService.js";
import serverResponse from "../../../utils/response.js";

// Mocking dependencies
jest.mock("../usersService");
jest.mock("../../../utils/response");

const mockRequest = (body: any) => ({ body }) as Request;
const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("User Controllers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUserController", () => {
    it("should create a user and return 201", async () => {
      const req = mockRequest({
        name: "Test",
        lastName: "User",
        userName: "testuser",
        email: "test@example.com",
        password: "password",
      });
      const res = mockResponse();
      (userService.createUser as jest.Mock).mockResolvedValue({ id: "1" });

      await createUserController(req, res, jest.fn());

      expect(userService.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(serverResponse).toHaveBeenCalledWith("Ok", { id: "1" });
    });

    it("should return 400 for invalid data", async () => {
      const req = mockRequest({
        name: "Test",
        lastName: "User",
        userName: "testuser",
        email: "",
        password: "",
      });
      const res = mockResponse();

      await createUserController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: "error" })
      );
    });
  });

  describe("loginController", () => {
    it("should login a user and return 200", async () => {
      const req = mockRequest({
        email: "test@example.com",
        password: "password",
      });
      const res = mockResponse();
      (userService.login as jest.Mock).mockResolvedValue("token");

      await loginController(req, res, jest.fn());

      expect(userService.login).toHaveBeenCalledWith(
        "test@example.com",
        "password"
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith("Ok", "token");
    });

    it("should return 400 if email or password are not provided", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await loginController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: "error" })
      );
    });
  });

  describe("userUpdateController", () => {
    it("should update a user and return 200", async () => {
      const req = mockRequest({ userId: "1", data: { name: "Updated" } });
      const res = mockResponse();
      (userService.userUpadeService as jest.Mock).mockResolvedValue({
        id: "1",
        name: "Updated",
      });

      await userUpdateController(req, res, jest.fn());

      expect(userService.userUpadeService).toHaveBeenCalledWith("1", {
        name: "Updated",
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(serverResponse).toHaveBeenCalledWith("Ok", {
        user: { id: "1", name: "Updated" },
      });
    });

    it("should return 400 if data or userId are not provided", async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await userUpdateController(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ status: "error" })
      );
    });
  });
});
